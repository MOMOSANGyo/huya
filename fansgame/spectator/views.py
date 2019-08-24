from django.shortcuts import render

# Create your views here.
import random
from django.http import HttpResponse, JsonResponse
import json
from anchor.models import *
import jwt
import time
import requests

"""
 
{'creator': 'SYS', 'role': 'U', 'profileId': 'unkCC8z7tzALkIOaEkYHgWtjpuTDDgujnr', 
'appId': 'fc5181d767815db9', 'extId': 'e73zh1y5', 'exp': 1566466735,
 'userId': 'un8SZ1RysuYfYfrM1dPKrH6FeVNciToleJ',
 'iat': 1566459535, 'roomId': '10799200'}
"""


def index(request):
    if request.method == 'POST':
        a = request.META.get("HTTP_AUTHORIZATION")
        token_data = jwt.decode(a, 'e0a5dd2bcf8b1f6b3449a491964b08ef', algorithms='HS256')
        global token
        token = token_data
        url = "https://apiext.huya.com/message/deliverByUserId?appId="+token_data["appId"]+"&extId="+token_data["extId"]
        profileid = token_data['profileId']
        while True:
            gameid = GameRecord.objects.filter(anchorid=token_data["profileId"],roomdid=token_data["roomId"]).last().id
            gamestatus = GameStatus.objects.get(gameid=gameid).gamestatus
            if gamestatus==1:
                data = {
                    "profileId":profileid,
                    "event":"数据库变化",
                    "message":1
                }
                print(data,token_data)
                head = {
                    "authorization":a
                }
                response = requests.request("POST", url, headers=head, data=data)
                print(response)
                break


    return HttpResponse('oka1')
