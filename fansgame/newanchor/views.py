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
    print("1111111")
    if request.method == 'POST':
        print("2222222")
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
