import CONFIG from './config';

const { baseUrl, port } = CONFIG;

var api = {
    request(service, method = 'POST', param = {}, header = {}) {
        var requestParam = {
            header: {
                ...header
            },
            url: `http://zaccc.lzok.top/${service}`,
            method: 'POST',
            dataType: 'json',
            data: { ...param }
        }

        console.log('-----请求------', requestParam);
        return new Promise((resolve, reject) => {
            hyExt.requestEbs(requestParam)
            .then(({ data, statusCode, header }) => {                
                if(statusCode != 200 || !entity) {
                    console.log('接口异常', data);
                }
                console.log('响应', data, statusCode, header);
                const resp = typeof data == 'string' ? JSON.parse(data) : data;
                resolve(resp);
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
