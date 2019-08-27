import json

import jwt
import requests
from celery import task
import time
from time import sleep
from anchor.models import *

# @task
# def process1():
#     game = GameRecord.objects.filter(id=346).last().id
#     a= int(time.time())
#     if a == 1566651716:
#         print("ok")
#     else:
#         print("ooo")
@task
def a1invit(gameid,waittime):
    token = GameRecord.objects.get(id=gameid).token
    token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
    url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
          token_data["extId"]
    headers = {
        "authorization": token,
        "Content-Type": "application/json"
    }
    data = {
        "gameid": gameid,
        "time":waittime
    }
    payload = json.dumps(data)
    message = {
        "profileId": token_data['profileId'],
        "event": "invite",
        "message": payload
    }
    print(data)
    response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
    print(response.text)

@task
def a2personnum(gametime,gameid,time):

    beginnum = GameRecord.objects.get(id= gameid).personnum
    for time in range(85):
        record = GameRecord.objects.get(id=gameid)
        record.personnum = UserRecord.objects.filter(gameid=gameid).values("useid").distinct().count()
        record.save()
        num = GameRecord.objects.get(id= gameid).personnum
        if num >beginnum:
            beginnum = num
            print(num)
            now=int(time)
            print(beginnum)
            token = GameRecord.objects.get(id= gameid).token
            token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
            url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId="+token_data["appId"]+"&extId="+token_data["extId"]
            headers = {
                "authorization":token,
                "Content-Type": "application/json"
            }

            if gametime == 0:
                timebool =1
            else:
                timebool =0

            data = {
                "personnum":beginnum,
                "time":now+gametime,
                "timebool":timebool #1 为立即开始
            }
            payload= json.dumps(data)
            message ={
                "profileId": token_data['profileId'],
                "event": "waitNum",
                "message": payload
            }
            print(data)
            response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
            print(response.text)
        sleep(6)

@task
def a3status(gameid):
    a3time = GameRecord.objects.get(id = gameid).a3time
    for i in range(120):
        now = int(time.time())
        sleep(1)
        print(now)
        if int(now)>=int(a3time):
            print(a3time,"1")
            status = GameStatus.objects.get(gameid=gameid)
            status.gamestatus = 1
            status.save()
    #
    # token = GameRecord.objects.get(id=gameid).token
    # token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
    # url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
    #       token_data["extId"]
    # headers = {
    #     "authorization": token,
    #     "Content-Type": "application/json"
    # }
    #
    # data = {
    #     "begin": 1,
    #     "gameid":gameid
    # }
    # payload = json.dumps(data)
    # message = {
    #     "profileId": token_data['profileId'],
    #     "event": "waitBegin",
    #     "message": payload
    # }


    # for i in range(120):
    #     now = int(time.time())
    #     sleep(1)
    #     print(now)
    #     status = GameStatus.objects.get(gameid=gameid)
    #     if status.gamestatus == 1:
    #         print(data)
    #         response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
    #         print(response.text)

@task
def a3begin(gameid):
    token = GameRecord.objects.get(id=gameid).token
    token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
    url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
          token_data["extId"]
    headers = {
        "authorization": token,
        "Content-Type": "application/json"
    }

    data = {
        "begin": 1,
        "gameid": gameid
    }
    payload = json.dumps(data)
    message = {
        "profileId": token_data['profileId'],
        "event": "waitBegin",
        "message": payload
    }
    for i in range(120):
        now = int(time.time())

        print(now)
        status = GameStatus.objects.get(gameid=gameid)
        if status.gamestatus == 1:
            print(data)
            response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
            print(response.text)
        sleep(6)


@task
def a4status(gameid,gametime,role):
    # gamewordid = GameWord.objects.filter(gameid="gameid", used=1).last().id
    # beginnum = GameUser.objects.filter(gameid=gameid, gamewordid=gamewordid).count()
    for i in range(120):
        now = int(time.time())
        sleep(1)
        print(now)
        if int(now) >= int(gametime):
            # print(gametime, "2")
            status = GameStatus.objects.get(gameid=gameid)
            status.gamestatus = 4
            status.save()
        # else:
        #     gamewordid = GameWord.objects.filter(gameid="gameid", used=1).last().id
        #     token = GameRecord.objects.get(id=gameid).token
        #     token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        #     url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
        #           token_data["extId"]
        #     headers = {
        #         "authorization": token
        #     }
        #
        #     num = GameUser.objects.filter(gameid=gameid, gamewordid=gamewordid).count()
        #     if num>beginnum:
        #         beginnum =num
        #         infolist = []
        #         user = GameUser.objects.filter(gameid=gameid, gamewordid=gamewordid)
        #         for u in user:
        #             us = Info.objects.get(userid=u.userid)
        #
        #             if role == 'P':
        #                 infolist.append({
        #                     "usrid": u.userid,
        #                     "url": us.pricture,
        #                     "name": us.username,
        #                     "time": u.usertime,
        #                     "answer": u.useranswer
        #                 })
        #             else:
        #                 name = us.username
        #                 if token_data["userId"] == u.userid:
        #                     name="我"
        #                 infolist.append({
        #                     "usrid": u.userid,
        #                     "url": us.pricture,
        #                     "name": name,
        #                     "time": u.usertime,
        #                     "answer":u.useranswer
        #                 })
        #
        #
        #
        #                 data = {
        #                     "num": num,
        #                     "userlist": infolist
        #                 }
        #                 print(data)
        #
        #                 payload = json.dumps(data)
        #                 message = {
        #                     "profileId": token_data['profileId'],
        #                     "event": "userList",
        #                     "message": payload
        #                 }
        #                 print(data)
        #                 response = requests.request("POST", url=url, headers=headers, data=message)
        #                 print(response.text)
@task
def a4userlist(gameid,gametime,role):
    gamewordid = GameWord.objects.filter(gameid="gameid", used=1).last().id
    beginnum = GameUser.objects.filter(gameid=gameid, gamewordid=gamewordid).count()
    for i in range(20):
        now = int(time.time())

        print(now)
        if int(now)<int(gametime):
            gamewordid = GameWord.objects.filter(gameid="gameid", used=1).last().id
            token = GameRecord.objects.get(id=gameid).token
            token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
            url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
                  token_data["extId"]
            headers = {
                "authorization": token,
                "Content-Type": "application/json"
            }

            num = GameUser.objects.filter(gameid=gameid, gamewordid=gamewordid).count()
            if num > beginnum:
                beginnum = num
                infolist = []
                user = GameUser.objects.filter(gameid=gameid, gamewordid=gamewordid)
                for u in user:
                    us = Info.objects.get(userid=u.userid)

                    if role == 'P':
                        infolist.append({
                            "usrid": u.userid,
                            "url": us.pricture,
                            "name": us.username,
                            "time": u.usertime,
                            "answer": u.useranswer
                        })
                    else:
                        name = us.username
                        if token_data["userId"] == u.userid:
                            name = "我"
                        infolist.append({
                            "usrid": u.userid,
                            "url": us.pricture,
                            "name": name,
                            "time": u.usertime,
                            "answer": u.useranswer
                        })

                        data = {
                            "num": num,
                            "userlist": infolist
                        }
                        print(data)

                        payload = json.dumps(data)
                        message = {
                            "profileId": token_data['profileId'],
                            "event": "userList",
                            "message": payload
                        }
                        print(data)
                        response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
                        print(response.text)
            sleep(6)

@task
def begin(gameid):
    token = GameRecord.objects.get(id=gameid).token
    token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
    url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
          token_data["extId"]
    headers = {
        "authorization": token,
        "Content-Type": "application/json"
    }
    data = {
        "begin": 1,
        "gameid":gameid
    }
    payload = json.dumps(data)
    message = {
        "profileId": token_data['profileId'],
        "event": "begin",
        "message": payload
    }
    print(data)
    response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
    print(response.text)
#第九题点下一题wordnum转到-1 status变为1

@task
def next(gameid,wordnum,status=0):
    token = GameRecord.objects.get(id=gameid).token
    token_data = jwt.decode(token, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
    url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
          token_data["extId"]
    headers = {
        "authorization": token,
        "Content-Type": "application/json"
    }
    data = {
        "wordnum":wordnum,
        "status":status
    }
    payload = json.dumps(data)
    message = {
        "profileId": token_data['profileId'],
        "event": "nextQuestion",
        "message": payload
    }
    print(data)
    response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
    print(response.text)
