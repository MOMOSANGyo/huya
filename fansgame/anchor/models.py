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
    gameid = models.ForeignKey('GameRecord', on_delete=models.SET_NULL,null=True) #游戏id
    userid = models.CharField(max_length=48,null=True) #用户id
    usertime = models.DateTimeField(auto_now_add=True) #用户提交答案的时间
    useranswer = models.CharField(max_length=64,null=True) #用户提交的答案
    answerbool = models.IntegerField() #判断答案是否正确 1为正确
    gamewordid = models.ForeignKey('GameWord', on_delete=models.SET_NULL,null=True) #游戏词语表id/外键/八表
    class Meta:
        db_table = 'gameuser'

class GameTime(models.Model):  #表6
    time = models.CharField(max_length=20) #游戏时长
    unit = models.CharField(max_length=20,default="分钟")

    class Meta:
        db_table = 'gametime'

class GameRecord(models.Model):  #表7
    anchorid = models.CharField(max_length=48,null=True) #主播id
    personnum = models.IntegerField(default=0)  #玩游戏的人数
    gametimeid = models.IntegerField(null=True)  #表6主键，游戏时长
    truepersonnum = models.IntegerField(default=0)  #总的答对人数（十个词语都对的总人数）
    wordsmallcategoryid = models.IntegerField(null=True) #表1主键
    roomdid = models.CharField(max_length=48)
    class Meta:
        db_table = 'gamerecord'

class GameWord(models.Model): #表8
    wordid = models.IntegerField() #词语表id
    anchordefined = models.IntegerField(default=0) #主播是否自定义 1代表自定义
    round = models.IntegerField(null=True) #回合数
    gameid = models.IntegerField() #游戏id
    personnum = models.IntegerField(null=True) #每回合答对的人数
    class Meta:
        db_table = 'gameword'

class GameStatus(models.Model):
    gameid = models.IntegerField() #游戏id
    gamestatus = models.IntegerField() #游戏状态，0,1,2

class Test(models.Model):
    test = models.CharField(max_length=20)