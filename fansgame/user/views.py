from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
import requests, json

import jwt

from anchor.models import *


def index(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        # pass_data = json.loads(request.body)  # 解析前端传过来的参数

        record = GameRecord.objects.filter(anchorid=token_data["profileId"],roomdid=token_data["roomId"]).last()
        status = GameStatus.objects.get(gameid=record.id)
        if not status.gamestatus:


            data = {
                "gameid":record.id
            }
            print(data)
            return JsonResponse(data)

    return HttpResponse('okb0')


def invite(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        record = GameRecord.objects.get(id = pass_data["gameid"])
        time = GameTime.objects.get(id=record.gametimeid)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])

        data = {
            "time":time.time,
            "num":record.personnum,
            "status":status.gamestatus
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb1')


def wait(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        userrecord = UserRecord(gameid=pass_data["gameid"],useid=token_data['userId'])
        userrecord.save()
        record = GameRecord.objects.get(id = pass_data["gameid"])
        record.personnum = UserRecord.objects.filter(gameid=pass_data["gameid"]).values("useid").distinct().count()

        record.save()

        time = GameTime.objects.get(id=record.gametimeid)
        status = GameStatus.objects.get(gameid=pass_data["gameid"])




        data = {
            "num":record.personnum,
            "time":time.time,
            "status":status.gamestatus
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb2')


def waitword(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        record = GameRecord.objects.get(id = pass_data["gameid"])
        word = WordCategory.objects.get(id = record.wordsmallcategoryid)
        status = GameStatus.objects.get(gameid = pass_data["gameid"])

        data = {
            "wordcategory":word.categoryname,
            "status":status.gamestatus
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb3')


def answer(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        if GameWord.objects.filter(gameid=pass_data["gameid"],used=1).exists():
            gameword = GameWord.objects.filter(gameid=pass_data["gameid"], used=1).last()
            word = SmallCategory.objects.get(id = gameword.wordid)
            categoryid = GameRecord.objects.get(id = pass_data["gameid"])
            category = WordCategory.objects.get(id = categoryid.wordsmallcategoryid)
            length = len(word.word)

            data = {
                "questionNum":gameword.round,
                "category":category.categoryname,
                "len":length,
                "gamewordid":gameword.id
            }
            print(data)
            return JsonResponse(data)

    return HttpResponse('okb4')


def push(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        m = GameWord.objects.get(id = pass_data["gamewordid"])
        word = SmallCategory.objects.get(id = m.wordid)
        b=0
        print(word.word,pass_data["answer"])
        if word.word==pass_data["answer"]:
            b=1
            gameword = GameWord.objects.get(id = pass_data["gamewordid"])
            gameword.personnum+=1
            gameword.save()

        gameuser = GameUser(gameid=pass_data["gameid"],usertime=pass_data["time"],userid=token_data['userId'],useranswer=pass_data["answer"],answerbool=b,gamewordid=pass_data["gamewordid"])
        gameuser.save()

        data = {}
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb4')


def displayanswer(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        questionnum = GameWord.objects.get(id = pass_data["gamewordid"])
        answer = GameUser.objects.get(userid=token_data['userId'],gameid=pass_data["gameid"]).useranswer

        num = GameUser.objects.filter(gameid=pass_data["gameid"]).count()
        info = GameUser.objects.filter(gameid=pass_data["gameid"]).order_by("usertime")
        infomation = []
        for inf in info:
            infomation.append([inf.userid,inf.usertime,inf.useranswer])
        total = GameRecord.objects.get(id = pass_data["gameid"]).personnum


        data = {
            "questionNum":questionnum.round,
            "answer":answer,
            "infomation":infomation,
            "num":num,
            "totalnum":total

        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb5')


def public(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        questionnum = GameWord.objects.get(id=pass_data["gamewordid"])
        answer = GameUser.objects.filter(userid=token_data['userId'], gameid=pass_data["gameid"]).last().useranswer
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum

        b=0
        rrate=1
        srate=1
        wordid = GameWord.objects.get(id=pass_data["gamewordid"]).wordid
        realanswer = SmallCategory.objects.get(id = wordid).word
        if answer==realanswer:
            b=1
            rightrate = []
            r_rate = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"],
                                             answerbool=1)
            for r in r_rate:
                rightrate.append(r.userid)

            rrate = (rightrate.index(token_data['userId'])+1)/total
        else:
            speedrate = []
            s_rate = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"])

            for s in s_rate:
                speedrate.append(s.userid)

            srate = (speedrate.index(token_data['userId'])+1)/total




        num = GameUser.objects.filter(gameid=pass_data["gameid"],useranswer=realanswer).count()


        score = GameUser.objects.filter(userid=token_data['userId'],gameid=pass_data["gameid"],answerbool=1).count()

        infomation = GameUser.objects.filter(gameid=pass_data["gameid"],gamewordid=pass_data["gamewordid"],answerbool=1)
        info = []
        for fo in infomation:
            info.append([fo.userid,fo.usertime])

        wrong = GameUser.objects.filter(gameid=pass_data["gameid"],gamewordid=pass_data["gamewordid"],answerbool=0)
        wronganswer = []
        for w in wrong:
            wronganswer.append(w.useranswer)

        status = GameWord.objects.get(id = pass_data["gamewordid"]+1).used

        data = {
            "questionNum": questionnum.round,
            "answerbool":b,
            "realanswer":realanswer,
            "info":info,
            "score":score,
            "rightNum": num,
            "totalnum": total,
            "wrongAnswer":wronganswer,
            "right_rate":1-rrate,
            "speed_rate":1-srate,
            "status":status
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('okb6')
#判断状态 若状态改变进入下一轮

def last(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'fdb55b6e1475d1057b581e670913f0c7', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        gameuser = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).values("userid").distinct()
        gameuserinfo = {}
        for u in gameuser:
            gameuserinfo[u["userid"]]=[]
        for k in gameuserinfo.keys():
            score = GameUser.objects.filter(userid=k,gameid=pass_data["gameid"],answerbool=1).count()
            time = GameUser.objects.filter(userid=k,gameid=pass_data["gameid"])
            total_time = 0
            for t in time:
                total_time=total_time+int(t.usertime)
            gameuserinfo[k].append(total_time)
            gameuserinfo[k].append(score)
            userrecord = UserRecord(gameid=pass_data["gameid"],useid=token_data['userId'],total_score=score,total_time=total_time)
            userrecord.save()

        score = GameUser.objects.filter(userid=token_data['userId'],gameid=pass_data["gameid"],answerbool=1).count()
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus =2
        status.save()
        print(gameuserinfo)

        # slist = []
        # userre = UserRecord.objects.filter(gameid=pass_data["gameid"]).order_by("total_score")
        # for u in userre:
        #     slist.append(u.useid)
        # srate = (slist.index(token_data['userId'])+1)/total
        #
        # tlist = []
        # userr = UserRecord.objects.filter(gameid=pass_data["gameid"]).order_by("total_time")
        # for u in userr:
        #     slist.append(u.useid)
        # trate = (tlist.index(token_data['userId']) + 1) / total

        data = {
            "total":total,
            "info":gameuserinfo,
            "score":score
        }

        return JsonResponse(data)

    return HttpResponse('okb7')
