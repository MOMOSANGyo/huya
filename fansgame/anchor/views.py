import hashlib
import json
import os
import re
from datetime import datetime
from random import randint

from django.core.paginator import Paginator
from django.db import connection
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect

from anchor.models import WordCategory, SmallCategory, AnchorWord

# 主播首页
def index(request):
    if request.method == 'POST':
        code = request.POST.get('code')
        print(code)
    # 获取词语表词语内容

    dict={}
    words = WordCategory.objects.exclude(parentid=0)
    for wordd in words:
        list = []
        for i in wordd.smallcategory_set.all():
            # print(wordd.categoryname,i.word)
            a = i.word
            list.append(a)
        dict[wordd.categoryname]=list

    # 获取主播自定义词语内容
    anchor_words = AnchorWord.objects.filter(anchorid=100)[0]
    dict[anchor_words.categoryname]=anchor_words.anchorsmallword_set.all()[0].word
    # print(anchor_words.categoryname,anchor_words.anchorsmallword_set.all()[0].word)
    # 获取游戏开始时间 从前端获取
    print(dict)
    return HttpResponse(json.dumps({'data':dict},ensure_ascii=False),content_type="application/json,charset=utf-8")

# 等待开始
def waiting_start(request):
    # 获取游戏开始时间
    # 获取游戏加入人数
    return HttpResponse('等待开始')

# 词条展示
class Entry_show(object):
    # 显示游戏词语类别
    # 从选择的词语类别中随机出去10个词语展示到前端
    pass

# 游戏回合描述页
def game_round(request,page):
    # 展示当前游戏的词语
    # 展示回答情况
    return None

# 游戏回合答案
def game_answer(request,page):
    # 展示答案
    # 展示回答情况
    # 判断游戏是否获胜
    return None

# 游戏排行
def ranking_list(request,page):
    # 展示主播得分
    # 展示粉丝得分
    return None