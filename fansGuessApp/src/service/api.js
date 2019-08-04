import CONFIG from './config';

const { baseUrl, port } = CONFIG;

var api = {
    request({service, method = 'POST', param = {}}) {
        var requestParam = {
            host: baseUrl,
            param: {...param},
            port: port,
            method: method,
            path: `/anchor/${service}`
        }

        console.log('-----请求------', requestParam);


        return new Promise((resolve, reject) => {
            hyExt.requestEbs(requestParam)
            .then(({ res, msg, ebsResponse }) => {
                if(res == 0) {
                    const { entity, statusCode, header } = ebsResponse;
                    
                    if(statusCode != 200 || !entity) {
                        console.log('接口异常', res, msg, ebsResponse);
                    }

                    console.log('响应', res, entity, statusCode, header);
                    const resp = typeof entity == 'string' ? JSON.parse(entity) : entity;
                    resolve(resp);
                }else{
                    reject(new Error(msg));
                }
            }).catch(err => {
                reject(err);
            })
        })
    },
    trimHttp(url) {
        if(url) {
            return url.replace(/^http\:/, 'https:');
        }
    },
    xssFilter: function (msg) {
        if (typeof msg !== 'string') return msg;

        msg = msg.replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\'/g, '&#39;')
                .replace(/\"/g, '&quot;');

        return msg;        
    }
    
}

export default api;
