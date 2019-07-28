from django.conf.urls import url, include

from anchor import views

urlpatterns = [
    # 主播首页
    url(r'^index/', views.index, name='index'),#zaccc.lzok.top/index/
    # 等待游戏开始页面
    url(r'^waiting_start/$',views.waiting_start,name='waiting_start'),
    # 词条展示页面
    url(r'^entry_show/$',views.Entry_show,name='entry_show'),
    # 游戏回合描述页
    url(r'game_round/(\d+)/$',views.game_round,name='game_round'),
    # 游戏上一回合答案
    url(r'game_answer/(\d+)/$',views.game_answer,name='game_answer'),
    # 游戏排行榜
    url(r'ranking_list/(\d+)/$',views.ranking_list,name='ranking_list'),
]
