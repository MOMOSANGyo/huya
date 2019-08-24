import datetime

from django.db import models

# Create your models here.
class WordCategory(models.Model): #表1
    categoryname = models.CharField(max_length=20,null=True)  #板块名称
    parentid = models.IntegerField(null=True) #父id
    class Meta:
        db_table = 'wordcategory'

class SmallCategory(models.Model): #表2
    categoryid = models.ForeignKey('WordCategory', on_delete=models.SET_NULL,null=True)  #小类别id/外键
    word = models.CharField(max_length=64,null=True) #猜测的词语内容
    level = models.IntegerField(null=True) #难度等级 0为容易1-7字，1为难8-15字
    class Meta:
        db_table = 'smallcategory'

class AnchorWord(models.Model): #表3
    categoryname = models.CharField(max_length=20, null=True)  # 板块名称
    anchorid = models.CharField(max_length=48,null=True) #主播id
    class Meta:
        db_table = 'anchorword'

class AnchorSmallWord(models.Model): #表4
    categoryid = models.ForeignKey('AnchorWord', on_delete=models.SET_NULL,null=True)  # 小类别id
    word = models.CharField(max_length=64, null=True)  # 猜测的词语内容
    level = models.IntegerField(null=True)  # 难度等级 0为容易1-7字，1为难8-15字

    class Meta:
        db_table = 'anchorsmallword'

class GameUser(models.Model):  #表五
    gameid = models.IntegerField() #游戏id
    userid = models.CharField(max_length=48,null=True) #用户id
    usertime = models.IntegerField(default=61) #用户提交答案的时间
    useranswer = models.CharField(max_length=64,null=True) #用户提交的答案
    answerbool = models.IntegerField() #判断答案是否正确 1为正确
    gamewordid = models.IntegerField() #游戏词语表id/外键/八表
    class Meta:
        db_table = 'gameuser'
        ordering = ['usertime']

class GameTime(models.Model):  #表6
    time = models.CharField(max_length=20) #游戏时长
    unit = models.CharField(max_length=20,default="分钟")

    class Meta:
        db_table = 'gametime'

class GameRecord(models.Model):  #表7
    anchorid = models.CharField(max_length=48,null=True) #主播id
    personnum = models.IntegerField(default=0)  #玩游戏的人数
    gametimeid = models.IntegerField(null=True)  #表6主键，游戏时长
    anchorscore = models.IntegerField(default=0)  #主播得分
    wordsmallcategoryid = models.IntegerField(null=True) #表1主键
    roomdid = models.CharField(max_length=48)
    time = models.IntegerField() #时间戳
    token = models.CharField(max_length=512,default=0)#获取token
    a1time = models.CharField(max_length=128,default=0)#a1页答题用时
    a2atime = models.CharField(max_length=128,default=0)#a2页的等待加入的时间戳=now+间隔 用来重定位使用
    a2btime = models.CharField(max_length=128,default=0)#a2页
    a3time = models.CharField(max_length=128,default=0)#a3跳转到a4的时间戳 = now+60s（当前主播熟悉词语最长的时间）
    class Meta:
        db_table = 'gamerecord'

class GameWord(models.Model): #表8
    wordid = models.IntegerField() #词语表id
    anchordefined = models.IntegerField(default=0) #主播是否自定义 1代表自定义
    round = models.IntegerField(null=True) #回合数
    gameid = models.IntegerField() #游戏id
    personnum = models.IntegerField(null=True,default=0) #每回合答对的人数
    used = models.IntegerField(default=0)
    a4time = models.CharField(max_length=128,default=0)#答题页每道题结束时跳转页面那一刻的时间戳
    class Meta:
        db_table = 'gameword'

class GameStatus(models.Model):
    gameid = models.IntegerField() #游戏id
    gamestatus = models.IntegerField() #游戏状态，0,1,2

class Test(models.Model):
    test = models.CharField(max_length=20)

class UserRecord(models.Model):#不用了
    gameid = models.IntegerField()
    useid = models.CharField(max_length=256)
    total_score = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)

    class Meta:
        db_table = "userrecord"

class Info(models.Model):
    userid = models.CharField(max_length=128)
    username = models.CharField(max_length= 128)
    pricture = models.CharField(max_length=128)
    token = models.CharField(max_length=512)
    class Mete:
        db_table = "info"
