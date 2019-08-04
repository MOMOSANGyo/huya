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

        record = GameRecord.objects.get(id = pass_data["gameid"])
        record.personnum+=1
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
    return None