from celery import task
from time import sleep
from anchor.models import *

@task
def process1(num):
    game = GameRecord.objects.filter(id=346).last().id
    print(game)
    for i  in range(num):
        print(i)
        sleep(2)



