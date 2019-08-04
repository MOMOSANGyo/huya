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


