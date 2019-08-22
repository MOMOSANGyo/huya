from django.conf.urls import url, include

from anchor import views

urlpatterns = [
    # 主播首页
    url(r'^index/', views.index, name='index'),#zaccc.lzok.top/anchor/index/
    url(r'^ainvite/', views.invite, name='ainvite'),#zaccc.lzok.top/anchor/ainvite/
    url(r'^await/', views.wait, name='await'),#zaccc.lzok.top/anchor/await/
    url(r'^wait/', views.waitt, name='wait'),#zaccc.lzok.top/anchor/wait/
    url(r'^join/', views.join, name='join'),  # zaccc.lzok.top/anchor/join/
    url(r'^quit/', views.quit, name='quit'),  # zaccc.lzok.top/anchor/quit/
    url(r'^begin/', views.begin, name='begin'),  # zaccc.lzok.top/anchor/begin/
    url(r'^word/', views.word, name='word'),  # zaccc.lzok.top/anchor/word/
    url(r'^wordinfo/', views.wordinfo, name='wordinfo'),  # zaccc.lzok.top/anchor/wordinfo/
    url(r'^wordgrade/', views.wordgrade, name='wordgrade'),  # zaccc.lzok.top/anchor/wordgrade/
    url(r'^last/', views.last, name='last'),  # zaccc.lzok.top/anchor/last/
    url(r'^next/', views.next, name='next'),  # zaccc.lzok.top/anchor/next/
    url(r'^pre/', views.pre, name='pre'),  # zaccc.lzok.top/anchor/pre/
]
