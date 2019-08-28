import requests
from django.shortcuts import render

# Create your views here.

import random
from django.http import HttpResponse, JsonResponse
import json
from anchor.models import *
import jwt
import time
from time import sleep
from .tasks import a1invit,a2personnum,a3begin,a4userlist,begin,next


#主播获取词语类别和等待时间

def index(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)
        print(a)
        category = WordCategory.objects.filter(parentid=0)
        data = {}
        data["category"] = {}
        for i in category:
            data["category"][i.categoryname] = []
        smallcategory = WordCategory.objects.exclude(parentid=0)
        for small in smallcategory:
            for big in category:
                if small.parentid == big.id:
                    data["category"][big.categoryname].append(small.categoryname)

        data['time'] = []
        gametime = GameTime.objects.all()
        for game in gametime:
            data['time'].append(game.time)

        print(data)
        return JsonResponse(data)

    return HttpResponse('oka1')


def invite(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        t = int(time.time())
        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        yanzhengrecord = GameRecord.objects.filter(anchorid=token_data["profileId"],roomdid=token_data["roomId"]).last()
        yanzhengstatus = GameStatus.objects.get(gameid=yanzhengrecord.id)
        if yanzhengstatus.gamestatus!=0:
            gamerecord = GameRecord(anchorid=token_data["profileId"], personnum=0, roomdid=token_data["roomId"], time=t,token=a,a1time=pass_data["questiontime"])
            gamerecord.save()

            gameid = GameRecord.objects.filter(anchorid=token_data["profileId"]).last()
            gamestatus = GameStatus(gameid=gameid.id, gamestatus=0)
            gamestatus.save()


            gamewordid = WordCategory.objects.get(categoryname=pass_data["categoryname"]).id
            gameid = gameid.id

            gametimeid = GameTime.objects.get(time=pass_data["time"]).id

            gamerecord = GameRecord.objects.get(id=gameid)
            gamerecord.wordsmallcategoryid = gamewordid
            gamerecord.gametimeid = gametimeid
            gamerecord.save()

            data = {
                "gameid": gameid
            }
            print(data)
            # a1invit.delay(gameid=gameid,waittime = pass_data["time"])

            url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
                  token_data["extId"]
            headers = {
                "authorization": a,
                "Content-Type": "application/json"
            }
            data = {
                "gameid": gameid,
                "time": pass_data["time"]
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


            return JsonResponse(data)
        else:
            data = {
                "gameid": yanzhengrecord.id
            }
            print(data)


            # a1invit.delay(gameid=yanzhengrecord.id,waittime = pass_data["time"])
            url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data["appId"] + "&extId=" + \
                  token_data["extId"]
            headers = {
                "authorization": a,
                "Content-Type": "application/json"
            }
            data = {
                "gameid": yanzhengrecord.id,
                "time": pass_data["time"]
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


            return JsonResponse(data)
    return HttpResponse('oka1')


def wait(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)
        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        now = int(time.time())
        gamerecord = GameRecord.objects.get(id=pass_data["gameid"])
        gametime = GameTime.objects.get(id=gamerecord.gametimeid)
        data = {
            "time": gametime.time,
        }
        over = now+int(gametime.time)*60
        # status = GameStatus.objects.get(gameid=pass_data["gameid"])
        # status.gamestatus = 4
        # status.save()

        gamerecord.a2atime=over
        gamerecord.save()
        print(data)
        param = int(gametime.time) * 60
        a2personnum.delay(gametime=param, gameid=pass_data["gameid"],waittime=gametime.time)
        # waittime = gametime.time
        # if int(waittime)<1:
        #     waittime =1
        # beginnum = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        # for t in range(int(waittime)*60):
        #     record = GameRecord.objects.get(id=pass_data["gameid"])
        #     record.personnum = UserRecord.objects.filter(gameid=pass_data["gameid"]).values("useid").distinct().count()
        #     record.save()
        #     num = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        #     if num > beginnum:
        #         beginnum = num
        #         print(num)
        #         print(beginnum)
        #
        #         url = "https://apiext.huya.com/message/deliverRoomByProfileId?appId=" + token_data[
        #             "appId"] + "&extId=" + token_data["extId"]
        #         headers = {
        #             "authorization": a,
        #             "Content-Type": "application/json"
        #         }
        #
        #         if param == 0:
        #             timebool = 1
        #         else:
        #             timebool = 0
        #
        #         data = {
        #             "personnum": beginnum,
        #             "time": over,
        #             "timebool": timebool  # 1 为立即开始
        #         }
        #         payload = json.dumps(data)
        #         message = {
        #             "profileId": token_data['profileId'],
        #             "event": "waitNum",
        #             "message": payload
        #         }
        #         print(data)
        #         response = requests.request("POST", url=url, headers=headers, data=json.dumps(message))
        #         print(response.text)
        #     sleep(6)


        return JsonResponse(data)

    return HttpResponse('oka2')


def join(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 3
        status.save()
        data = {
            "response": "ok"
        }
        print(data)
        begin.delay(gameid = pass_data["gameid"])
        return JsonResponse(data)

    return HttpResponse('oka2')

def a2status(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 3
        status.save()
        data = {
            "response": "ok"
        }
        print(data)
        begin.delay(gameid=pass_data["gameid"])
        return JsonResponse(data)

def prepare(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data,token_data)
        record = GameRecord.objects.get(id=pass_data["gameid"])
        wordlist = []
        select_word = SmallCategory.objects.filter(categoryid=record.wordsmallcategoryid)
        wordid = []
        for word in select_word:
            wordid.append(word.id)
        category = WordCategory.objects.get(id=record.wordsmallcategoryid)
        wordidlist = random.sample(wordid, 10)

        # (优化 只处理同一room同一主播id下的gameid的wordid)
        # deleword = GameWord.objects.filter(used=0)
        # for d in deleword:
        #     word = GameWord.objects.get(id = d.id)
        #     word.used=1
        #     word.save()

        delewords = GameRecord.objects.filter(anchorid=token_data["profileId"], roomdid=token_data["roomId"])
        for dd in delewords:
            deleword = GameWord.objects.filter(gameid=dd.id, used=0)
            if deleword:
                for d in deleword:
                    word = GameWord.objects.get(id=d.id)
                    word.used = 1
                    word.save()
            else:
                pass

        n = 0
        for i in wordidlist:
            word = SmallCategory.objects.get(id=i)
            wordlist.append(word.word)
            gameword = GameWord(wordid=i, round=n, gameid=pass_data["gameid"], personnum=0)
            gameword.save()
            n = n+1

        gamenum = GameWord.objects.filter(gameid=pass_data["gameid"], used=0).first()
        gamenum.used = 1
        gamenum.save()

        now = int(time.time())

        gamerecord = GameRecord.objects.get(id=pass_data["gameid"])
        gamerecord.a3time = now+60
        gamerecord.save()
        # a3status.delay(gameid=pass_data["gameid"])
        # a3begin.delay(gameid=pass_data["gameid"])

        # a3time = GameRecord.objects.get(id=pass_data["gameid"]).a3time
        # chatime = a3time-now+5
        # for i in range(chatime):
        #     sleep(1)
        #     print(now)
        #     if int(now) >= int(a3time):
        #         print(a3time, "1")
        #         status = GameStatus.objects.get(gameid=pass_data["gameid"])
        #         status.gamestatus = 1
        #         status.save()
        data = {
            "word": wordlist,
            "category": category.categoryname
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka3')


def isok(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 1
        status.save()
        data = {
            "response": "ok"
        }
        print(data)
        a3begin.delay(gameid=pass_data["gameid"])
        return JsonResponse(data)

    return HttpResponse('oka3')

def a3fanye(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 1
        status.save()
        data = {
            "response": "ok"
        }
        print(data)
        a3begin.delay(gameid=pass_data["gameid"])
        return JsonResponse(data)

    return HttpResponse('oka3')

def staticword(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        #自我状态检查
        if GameStatus.objects.get(gameid=pass_data["gameid"]).gamestatus != 1:
            status = GameStatus.objects.get(gameid=pass_data["gameid"])
            status.gamestatus = 1
            status.save()

        categoryid = GameRecord.objects.get(id=pass_data["gameid"])
        category = WordCategory.objects.get(id=categoryid.wordsmallcategoryid).categoryname
        gamenum = GameWord.objects.filter(gameid=pass_data["gameid"], used=1).last()
        gamewordid = gamenum.id
        wordnumber = gamenum.round

        word = SmallCategory.objects.get(id=gamenum.wordid)
        wordtext = word.word
        length = len(word.word)
        now = int(time.time())
        gameword = GameWord.objects.get(id = gamenum.id)
        gameword.a4time = now+int(categoryid.a1time)
        gameword.save()
        # print(now+int(categoryid.a1time),type(now+int(categoryid.a1time)))
        # a4status.delay(gameid=pass_data["gameid"],gametime=now+int(categoryid.a1time),role=token_data["role"])
        a4userlist.delay(gameid=pass_data["gameid"],gametime=now+int(categoryid.a1time),role=token_data["role"])
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        data = {
            "category": category,
            "length": length,
            "wordnumber": wordnumber,
            "wordtext": wordtext,
            "gamewordid": gamewordid,
            "totalperson":total,
            "time":categoryid.a1time
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka4')

def a4fanye(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 4
        status.save()
        data = {
            "response": "ok"
        }
        print(data)
        a3begin.delay(gameid=pass_data["gameid"])
        return JsonResponse(data)

    return HttpResponse('oka4')


def staticwordinfo(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        num = GameWord.objects.get(id=pass_data["gamewordid"])
        word = SmallCategory.objects.get(id=num.wordid).word
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        realnum = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"],
                                          answerbool=1).count()
        userinfo = []
        user = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"], answerbool=1)
        for u in user:
            us = Info.objects.get(userid=u.userid)
            userinfo.append({
                "usrid": u.userid,
                "url": us.pricture,
                "name": us.username,
                "time": u.usertime
            })

            # userinfo.append([u.userid,u.usertime])
        wronglist = []
        wrong = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"], answerbool=0)
        for w in wrong:
            wronglist.append(w.useranswer)
        status = 0
        if num.round == 9:
            status = 1

        score = 0
        if realnum >= total / 4 and realnum <= total * 3 / 4:
            score = 1

        gamerecord = GameRecord.objects.get(id=pass_data["gameid"])
        gamerecord.anchorscore = gamerecord.anchorscore + score
        gamerecord.save()

        data = {
            "wordnumber": num.round,
            "realanswer": word,
            "totalperson": total,
            "rightperson": realnum,
            "winInfo": userinfo,
            "wronganswer": wronglist,
            "status": status,
            "score": score
        }
        # print(gameuserinfo)
        return JsonResponse(data)
    return HttpResponse('oka5')



def nexts(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        gamenum = GameWord.objects.filter(gameid=pass_data["gameid"], used=1).last()
        if gamenum.round == 9:
            status = GameStatus.objects.get(gameid=pass_data["gameid"])
            status.gamestatus = 2
            status.save()
            next.delay(gameid=pass_data["gameid"],wordnum=-1,status=1)
        elif gamenum.round < 9:
            tgamenum = GameWord.objects.get(id=gamenum.id + 1)
            tgamenum.used = 1
            tgamenum.save()
            num = gamenum.round+1
            next.delay(gameid=pass_data["gameid"],wordnum = num)
        data = {}
        print(gamenum.id)
        return JsonResponse(data)

    return HttpResponse('oka5')


def last(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        gameuserinfo = []
        record = UserRecord.objects.filter(gameid=pass_data["gameid"]).order_by("-total_score", "total_time")
        for r in record:
            us = Info.objects.get(userid=r.useid)
            gameuserinfo.append({
                "usrid": r.useid,
                "url": us.pricture,
                "name": us.username,
                "time": r.total_time,
                "score": r.total_score
            })
        score = GameRecord.objects.get(id=pass_data["gameid"]).anchorscore
        print(gameuserinfo)
        data = {
            "totalperson": total,
            "info": gameuserinfo,
            "score": score
        }

        return JsonResponse(data)

    return HttpResponse('oka6')


def pre(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')

        data ={}


        if GameRecord.objects.filter(anchorid=token_data["profileId"], roomdid=token_data["roomId"]).exists():
            gameid = GameRecord.objects.filter(anchorid=token_data["profileId"], roomdid=token_data["roomId"]).last()
            gamestatus = GameStatus.objects.get(gameid=gameid.id).gamestatus
            print(token_data)

            now = int(time.time())
            if gamestatus == 0: #a2页
                gametime = GameTime.objects.get(id=gameid.gametimeid).time
                if gametime == 0:
                    data = {
                        "status":gamestatus,
                        "gameid":gameid.id,
                        "time":0,
                        "timebool":1 #A1开始时间为现在
                    }
                else:
                    if int(now) <=int(gameid.a2atime):
                        gametime = int(gameid.a2atime)-int(now)
                        data = {
                            "status": gamestatus,
                            "gameid": gameid.id,
                            "gametime": gametime, #秒 此时为等待时间结束前
                            "timebool": 0  # A1开始时间为不是现在的其他选项
                        }
                    else:
                        data = {
                            "status": gamestatus,
                            "gameid": gameid.id,
                            "gametime": 0,  # 秒 此时为等待时间结束后
                            "timebool": 0  # A1开始时间为不是现在的其他选项
                        }
            elif gamestatus ==  3:
                gametime = int(gameid.a3time) -int(now)
                if gametime<0:
                    gametime=0
                data = {
                    "status": gamestatus,
                    "gameid":gameid.id,
                    "gametime":gametime #秒 倒计时剩余时长
                }

            elif gamestatus == 1:
                gameword = GameWord.objects.filter(gameid=gameid.id,used=1).last()
                gamewordtime = int(gameword.a4time) - int(now)
                if gamewordtime<0:
                    gamewordtime=0
                data = {
                    "status": gamestatus,
                    "gameid": gameid.id,
                    # "wordnumber":gameword.round, #友情提供
                    "gamewordtime":gamewordtime  # 秒 该题倒计时剩余时间
                }
            elif gamestatus == 4:
                gameword = GameWord.objects.filter(gameid=gameid.id,used=1).last()
                data = {
                    "status": gamestatus,
                    "gameid": gameid.id,
                    "gamewordid":gameword.id
                }
            elif gamestatus == 2:
                data = {
                    "status":gamestatus
                }
            else:
                pass
        else:
            data = {
                "status": 2
            }

        return JsonResponse(data)

    return HttpResponse('ok')


def test(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)

        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 2
        status.save()
        data = {
            "response": "ok"
        }
        print(data)
        return JsonResponse(data)


