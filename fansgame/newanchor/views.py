from django.shortcuts import render

# Create your views here.

import random
from django.http import HttpResponse, JsonResponse
import json
from anchor.models import *
import jwt
import time


#主播获取词语类别和等待时间

def index(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)
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
        return JsonResponse(data)

    return HttpResponse('oka1')


def wait(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
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
        return JsonResponse(data)

    return HttpResponse('oka2')


def prepare(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        print(pass_data)
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

        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        data = {
            # "category": category,
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
            # "status": status,
            "score": score
        }
        # print(gameuserinfo)
        return JsonResponse(data)
    return HttpResponse('oka5')


def next(request):
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
        elif gamenum.round < 9:
            tgamenum = GameWord.objects.get(id=gamenum.id + 1)
            tgamenum.used = 1
            tgamenum.save()

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
        # gameuser = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).values(
        #     "userid").distinct()
        # gameuserinfo = []
        # for u in gameuser:
        #     score = GameUser.objects.filter(userid=u["userid"], gameid=pass_data["gameid"], answerbool=1).count()
        #     time = GameUser.objects.filter(userid=u["userid"], gameid=pass_data["gameid"])
        #     total_time = 0
        #     us = Info.objects.get(userid=u["userid"])
        #     for t in time:
        #         total_time = total_time + int(t.usertime)
        #     gameuserinfo.append({
        #         "usrid": u["userid"],
        #         "url": us.pricture,
        #         "name": us.username,
        #         "time": total_time,
        #         "score": score
        #     })
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