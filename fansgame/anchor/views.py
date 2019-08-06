import hashlib
import json
import os
import re
from datetime import datetime
from random import randint
import random

from django.core.paginator import Paginator
from django.db import connection
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
import requests, json
from anchor.models import *
from django.db.models import Sum
import jwt


def index(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')

        category = WordCategory.objects.filter(parentid=0)
        data = {}

        for i in category:
            data[i.categoryname] = []
        smallcategory = WordCategory.objects.exclude(parentid=0)
        for small in smallcategory:
            for big in category:
                if small.parentid == big.id:
                    data[big.categoryname].append(small.categoryname)


        data['time']=[]
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

        gamerecord = GameRecord(anchorid=token_data["profileId"], personnum=0,roomdid=token_data["roomId"])
        gamerecord.save()

        gameid = GameRecord.objects.filter(anchorid=token_data["profileId"]).last()
        gamestatus = GameStatus(gameid=gameid.id, gamestatus=0)
        gamestatus.save()

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        gamewordid = WordCategory.objects.get(categoryname=pass_data["categoryname"]).id
        gameid = gameid.id

        gametimeid = GameTime.objects.get(time=pass_data["time"]).id

        gamerecord = GameRecord.objects.get(id = gameid)
        gamerecord.wordsmallcategoryid = gamewordid
        gamerecord.gametimeid=gametimeid
        gamerecord.save()

        data = {
            "gameid":gameid
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka1')


def wait(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')


        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        gamerecord = GameRecord.objects.get(id = pass_data["gameid"])
        gametime = GameTime.objects.get(id=gamerecord.gametimeid)
        data = {
            "time":gametime.time,
            "num":gamerecord.personnum
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka2')


def quit(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus = 2
        status.save()

        data = {
            "response":"ok"
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka2')



def join(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        record = GameRecord.objects.get(id=pass_data["gameid"])
        wordlist = []
        select_word = SmallCategory.objects.filter(categoryid=record.wordsmallcategoryid)
        wordid = []
        for word in select_word:
            wordid.append(word.id)
        category = WordCategory.objects.get(id=record.wordsmallcategoryid)
        wordidlist = random.sample(wordid,10)
        n=0
        for i in wordidlist:
            n=n+1
            word = SmallCategory.objects.get(id=i)
            wordlist.append(word.word)
            gameword =GameWord(wordid=i,round=n,gameid=pass_data["gameid"],personnum=0)
            gameword.save()

        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus=3
        status.save()

        data = {
            "word":wordlist,
            "category":category.categoryname
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka3')


def word(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        status = 0
        wordlist = []
        gamenum = GameWord.objects.filter(gameid=pass_data["gameid"],used=0).first()
        gamewordid = gamenum.id
        wordlist.append(gamenum.round)
        if gamenum.round == 10:
            status =1
        word = SmallCategory.objects.get(id = gamenum.wordid)
        wordlist.append(word.word)
        gamenum.used =1
        gamenum.save()
        # sign
        # if gamenum.round == 10:


        data = {
            "wordlist":wordlist,
            "gamewordid":gamewordid,
            "status":status
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka4')
#判断词语进行到那里 从10到1的转换
def wordinfo(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数

        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        num = GameUser.objects.filter(gameid=pass_data["gameid"]).count()
        wordid = GameWord.objects.get(id = pass_data["gamewordid"])
        realanswer = SmallCategory.objects.get(id = wordid.wordid).word
        infolist = []
        user = GameUser.objects.filter(gameid=pass_data["gameid"],gamewordid=pass_data["gamewordid"])
        for u in user:
            infolist.append([u.userid,u.usertime])

        data = {
            "total":total,
            "num":num,
            "realanswer":realanswer,
            "userlist":infolist
        }
        print(data)
        return JsonResponse(data)

    return HttpResponse('oka4')


def wordgrade(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        print(token_data)  # 打印解析后的token

        pass_data = json.loads(request.body)  # 解析前端传过来的参数
        gamerecord = GameRecord.objects.get(id = pass_data["gameid"])
        gamerecord.anchorscore=gamerecord.anchorscore+pass_data["score"]
        gamerecord.save()
        num = GameWord.objects.get(id = pass_data["gamewordid"])
        word = SmallCategory.objects.get(id = num.wordid).word
        total = GameRecord.objects.get(id=pass_data["gameid"]).personnum
        realnum = GameUser.objects.filter(gameid = pass_data["gameid"],gamewordid=pass_data["gamewordid"],answerbool=1).count()
        userinfo =[]
        user = GameUser.objects.filter(gameid = pass_data["gameid"],gamewordid=pass_data["gamewordid"],answerbool=1)
        for u in user:
            userinfo.append([u.userid,u.usertime])
        wronglist =[]
        wrong = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"], answerbool=0)
        for w in wrong:
            wronglist.append(w.useranswer)

        # gameuser = GameUser.objects.filter(gameid=pass_data["gameid"], gamewordid=pass_data["gamewordid"]).values("userid").distinct()
        # gameuserinfo = {}
        # for u in gameuser:
        #     gameuserinfo[u["userid"]]=[]
        #
        # for k in gameuserinfo.keys():
        #     score = GameUser.objects.filter(userid=k,gameid=pass_data["gameid"],gamewordid=pass_data["gamewordid"],answerbool=1).count()
        #     time = GameUser.objects.filter(userid=k,gameid=pass_data["gameid"],gamewordid=pass_data["gamewordid"]).aggregate(sum("usertime"))
        #     gameuserinfo[k].append(score,time)

        data = {
            "questionnum":num.round,
            "realanswer":word,
            "total":total,
            "realnum":realnum,
            "winInfo":userinfo,
            "wronganswer":wronglist
        }
        # print(gameuserinfo)
        return JsonResponse(data)
    return HttpResponse('oka5')

def last(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
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

        score = GameRecord.objects.get(id=pass_data["gameid"]).anchorscore
        status = GameStatus.objects.get(gameid=pass_data["gameid"])
        status.gamestatus =2
        status.save()
        print(gameuserinfo)
        data = {
            "total":total,
            "info":gameuserinfo,
            "score":score
        }

        return JsonResponse(data)

    return HttpResponse('oka6')