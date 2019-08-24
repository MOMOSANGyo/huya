from celery import task
import time
from anchor.models import *

@task
def process1():
    game = GameRecord.objects.filter(id=346).last().id
    a= int(time.time())
    if a == 1566651716:
        print("ok")
    else:
        print("ooo")



