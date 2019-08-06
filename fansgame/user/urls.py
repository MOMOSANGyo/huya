from django.conf.urls import url, include

from user import views

urlpatterns = [

    url(r'^index/', views.index, name='index'),#http://zaccc.lzok.top/user/index/ b0
    url(r'^invite/', views.invite, name='invite'),#http://zaccc.lzok.top/user/invite/
    url(r'^wait/', views.wait, name='wait'),#http://zaccc.lzok.top/user/wait/
    url(r'^waitword/', views.waitword, name='waitword'),#http://zaccc.lzok.top/user/waitword/
    url(r'^answer/', views.answer, name='answer'),#http://zaccc.lzok.top/user/answer/
    url(r'^push/', views.push, name='push'),  # http://zaccc.lzok.top/user/push/
    url(r'^displayanswer/', views.displayanswer, name='displayanswer'),  # http://zaccc.lzok.top/user/displayanswer/
    url(r'^public/', views.public, name='public'),  # http://zaccc.lzok.top/user/public/
    url(r'^last/', views.last, name='last'),  # http://zaccc.lzok.top/user/last/
]