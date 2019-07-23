from django.test import TestCase

# Create your tests here.
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


def generate_auth_token(key, data, expiration=60 * 60 * 2):
    """获取token"""
    # data = {'user_id': user_id}
    s = Serializer(key, expires_in=expiration)
    return s.dumps(data).decode('utf-8')


if __name__ == "__main__":
    SECRET_KEY = "adsfkoemejn13443#@^*(%$-=4=+*&%fe"  # key

    ACCESS_EXPIRES = 60 * 60 * 4  # access_token有效时间,4hour

    user_id = 169061
    user_name = 'admin'
    ip = '192.168.110.555'
    access_tonken = generate_auth_token(
        key=SECRET_KEY,
        data={'user_id': user_id, 'user_name': user_name, 'ip': ip},  # 封装进payload的数据
        expiration=ACCESS_EXPIRES  # 过期时间设置
    )

    print(access_tonken)

    quit(0)

