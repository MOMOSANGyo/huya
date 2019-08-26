from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
import requests, json
import time,datetime

import jwt

from anchor.models import *
# Create your views here.
# def invited(request):
#     if request.method == 'POST':
#         a = request.META.get("HTTP_AUTHORIZATION")
#         token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
#         print(token_data)  # 打印解析后的token
#
#         pass_data = json.loads(request.body)  # 解析前端传过来的参数
#         print(pass_data)
#         status = GameStatus.objects.get(gameid=pass_data["gameid"]).gamestatus
#         if status == 0:
#             data = {
#                 "invited":1
#             }
#             print(data)
#             return JsonResponse(data)
#         else:
#             data = {
#                 "invited": 0
#             }
#             print(data)
#             return JsonResponse(data)
#     return HttpResponse('okb1')


def join(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        if not Info.objects.filter(userid=token_data['userId']).exists():
            record = Info(userid=token_data['userId'], username=pass_data["name"], pricture=pass_data["picture"],token=a)
            record.save()
        else:
            info = Info.objects.get(userid=token_data['userId'])
            if not info.token:
                info.token=a
                info.save()
            else:
                pass

        data = {}
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb1')


def wait(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        record = GameRecord.objects.get(id=pass_data["gameid"])
        word = WordCategory.objects.get(id=record.wordsmallcategoryid)
        # status = GameStatus.objects.get(gameid=pass_data["gameid"])

        data = {
            "wordcategory": word.categoryname,
            # "status": status.gamestatus
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb3')


def question(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        if GameWord.objects.filter(gameid=pass_data["gameid"], used=1).exists():
            gameword = GameWord.objects.filter(gameid=pass_data["gameid"], used=1).last()
            # gameword = GameWord.objects.get(id =gameword1.id-1)
            word = SmallCategory.objects.get(id=gameword.wordid)
            categoryid = GameRecord.objects.get(id=pass_data["gameid"])
            category = WordCategory.objects.get(id=categoryid.wordsmallcategoryid)
            length = len(word.word)

            data = {
                "questionNum": gameword.round,
                "category": category.categoryname,
                "len": length,
                "gamewordid": gameword.id,
                "time":categoryid.a1time
            }
            print(data)
            return JsonResponse(data)
        else:
            data = {}
            return JsonResponse(data)

    return HttpResponse('okb4')


def answer(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        m = GameWord.objects.get(id=pass_data["gamewordid"])
        word = SmallCategory.objects.get(id=m.wordid)
        b = 0
        print(word.word, pass_data["answer"])
        if word.word == pass_data["answer"]:
            b = 1
            gameword = GameWord.objects.get(id=pass_data["gamewordid"])
            gameword.personnum += 1
            gameword.save()

        if not GameUser.objects.filter(gameid=pass_data["gameid"], userid=token_data['userId'],
                                       gamewordid=pass_data["gamewordid"]).exists():

            gameuser = GameUser(gameid=pass_data["gameid"], usertime=pass_data["time"], userid=token_data['userId'],
                                useranswer=pass_data["answer"], answerbool=b, gamewordid=pass_data["gamewordid"])
            gameuser.save()
        else:
            gameuser = GameUser.objects.get(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"],
                                            userid=token_data['userId'])
            gameuser.useranswer = pass_data["answer"]
            gameuser.answerbool = b
            gameuser.save()

        data = {}

        #优化成个人
        gameuser = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).values(
            "userid").distinct()
        for u in gameuser:
            score = GameUser.objects.filter(userid=u["userid"], gameid=pass_data["gameid"], answerbool=1).count()
            time = GameUser.objects.filter(userid=u["userid"], gameid=pass_data["gameid"])
            total_time = 0
            for t in time:
                total_time = total_time + int(t.usertime)
            userrecord = UserRecord.objects.get(gameid=pass_data["gameid"], useid=u['userid'])
            userrecord.total_time = total_time
            userrecord.total_score = score

            userrecord.save()


        print(data)
        return JsonResponse(data)

    return HttpResponse('okb4')


def waitnext(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        questionnum = GameWord.objects.get(id=pass_data["gamewordid"])
        answer = GameUser.objects.get(userid=token_data['userId'], gameid=pass_data["gameid"],
                                      gamewordid=pass_data["gamewordid"]).useranswer
        answerbool = 0
        wordid = GameWord.objects.get(id=pass_data["gamewordid"]).wordid
        realanswer = SmallCategory.objects.get(id=wordid).word
        if answer == realanswer:
            answerbool = 1
        num = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).count()
        info = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).order_by(
            "usertime")
        infomation = []
        self = Info.objects.get(userid=token_data['userId']).username
        for inf in info:
            us = Info.objects.get(userid=inf.userid)
            name = us.username
            if name == self:
                name = "我"
            infomation.append({
                "userid": inf.userid,
                "time": inf.usertime,
                "url": us.pricture,
                "name": name,
                "useranswer": inf.useranswer
            })

            # infomation.append([inf.userid,inf.usertime,inf.useranswer])
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum

        data = {
            "answerbool": answerbool,
            "wordnumber": questionnum.round,
            "answer": answer,
            # "infomation": infomation,
            # "num": num,
            "totalperson": total

        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb5')


def display(request):
    if request.method == 'POST':

        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        questionnum = GameWord.objects.get(id=pass_data["gamewordid"])
        answer = GameUser.objects.filter(userid=token_data['userId'], gameid=pass_data["gameid"],
                                         gamewordid=pass_data["gamewordid"]).last().useranswer
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum

        gamestatus = GameStatus.objects.get(gameid=pass_data["gameid"]).gamestatus

        # b=0
        rrate = 1
        srate = 1
        wordid = GameWord.objects.get(id=pass_data["gamewordid"]).wordid
        realanswer = SmallCategory.objects.get(id=wordid).word
        if answer == realanswer:
            # b=1
            rightrate = []
            r_rate = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"],
                                             answerbool=1)
            for r in r_rate:
                rightrate.append(r.userid)

            rrate = (rightrate.index(token_data['userId']) + 1) / total
        else:
            speedrate = []
            s_rate = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"])

            for s in s_rate:
                speedrate.append(s.userid)

            srate = (speedrate.index(token_data['userId']) + 1) / total

        answerbool = GameUser.objects.get(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"],
                                          userid=token_data['userId']).answerbool

        num = GameUser.objects.filter(gameid=pass_data["gameid"], useranswer=realanswer).count()

        score = GameUser.objects.filter(userid=token_data['userId'], gameid=pass_data["gameid"], answerbool=1).count()

        infomation = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"],
                                             answerbool=1)
        info = []
        self = Info.objects.get(userid=token_data['userId']).username
        for fo in infomation:
            # info.append([fo.userid,fo.usertime])
            us = Info.objects.get(userid=fo.userid)
            name = us.username
            if name == self:
                name = "我"

            info.append({
                "userid": fo.userid,
                "url": us.pricture,
                "name": name,
                "time": fo.usertime
            })

        wrong = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"], answerbool=0)
        wronganswer = []
        for w in wrong:
            wronganswer.append(w.useranswer)

        # status = GameWord.objects.get(id = pass_data["gamewordid"]+1).used
        # if GameWord.objects.get(id = pass_data["gamewordid"]+1).round==9:
        #     status=1

        if GameWord.objects.get(id=pass_data["gamewordid"]).round <= 8:
            status = GameWord.objects.get(id=pass_data["gamewordid"] + 1).used
        else:
            status = 0
        rrate = str(int((1 - rrate) * 100)) + "%"
        srate = str(int((1 - srate) * 100)) + "%"

        data = {
            "questionNum": questionnum.round,
            "answerbool": answerbool,
            "realanswer": realanswer,
            "info": info,
            "score": score,
            "rightNum": num,
            "totalnum": total,
            "wrongAnswer": wronganswer,
            "right_rate": rrate,
            "speed_rate": srate,
            # "status": status,
            # "gamestatus": gamestatus
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb6')


def last(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        # gameuser = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).values("userid").distinct()
        # for u in gameuser:
        #     score = GameUser.objects.filter(userid=u["userid"], gameid=pass_data["gameid"], answerbool=1).count()
        #     time = GameUser.objects.filter(userid=u["userid"], gameid=pass_data["gameid"])
        #     total_time = 0
        #     for t in time:
        #         total_time = total_time + int(t.usertime)
        #     userrecord = UserRecord.objects.get(gameid=pass_data["gameid"],useid=u['userid'])
        #     userrecord.total_time = total_time
        #     userrecord.total_score = score
        #
        #     userrecord.save()
        self = Info.objects.get(userid=token_data['userId']).username
        gameuserinfo = []
        record = UserRecord.objects.filter(gameid=pass_data["gameid"]).order_by("-total_score", "total_time")
        for r in record:
            us = Info.objects.get(userid=r.useid)
            name = us.username
            if name == self:
                name = "我"

            gameuserinfo.append({
                "usrid": r.useid,
                "url": us.pricture,
                "name": name,
                "time": r.total_time,
                "score": r.total_score
            })

        record1 = UserRecord.objects.filter(gameid=pass_data["gameid"]).order_by("-total_score")
        srate = 0
        m = 0
        for r in record1:
            m += 1
            if r.useid == token_data['userId']:
                srate = 1 - m / total

        record2 = UserRecord.objects.filter(gameid=pass_data["gameid"]).order_by("total_time")
        vrate = 0
        i = 0
        for r in record2:
            i += 1
            if r.useid == token_data['userId']:
                vrate = 1 - i / total
        score = GameUser.objects.filter(userid=token_data['userId'], gameid=pass_data["gameid"], answerbool=1).count()
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 2
        status.save()
        srate = str(srate * 100) + "%"
        vrate = str(vrate * 100) + "%"
        print(gameuserinfo)

        data = {
            "total": total,
            "info": gameuserinfo,
            "score": score,
            "srate": srate,  # 分数
            "vrate": vrate  # 手速
        }

        return JsonResponse(data)

    return HttpResponse('okb7')