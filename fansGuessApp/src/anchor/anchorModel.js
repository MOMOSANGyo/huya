import api from '../service/api'
import { message } from 'antd';

export async function initialPre(){
  console.log('=======initialPre======');
  let result = {};
  await api.request('newanchor/pre/', 'POST').then(res => {
    console.log('=======initialPre======', res);
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  console.log('=======initialPre=========', result);
  return result;
}



export async function getInitData() {
  let result = {};
  await api.request('newanchor/index/', 'POST').then(res => {
    console.log('=======getInitData=====res===', res);
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  console.log('=======getInitData=========', result);
  return result;
}

export async function setInviteData(params) {
  console.log('=====setInviteData======', params);
  let result = {};
  await api.request('newanchor/invite/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function getAwaitTime(params) {
  console.log('=====getAwaitTime======', params);
  let result = {};
  await api.request('newanchor/wait/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}


// export async function getAwaitNum(params) {
//   console.log('=====getAwaitNum======', params);
//   let result = {};
//   await api.request('newanchor/wait/', 'POST', params).then(res => {
//     result = res;
//   }).catch(err => {
//     console.log(err);
//   })
//   return result;
// }

export async function quitGame(params) {
  console.log('=====quitGame======', params);
  let result = {};
  await api.request('newanchor/test/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function joinGame(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('newanchor/join/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function a2toa3(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('newanchor/a2status/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function a3toa4(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('newanchor/a3status/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function a4toa5(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('newanchor/a4status/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function getGameDetail(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('newanchor/prepare/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function prepareOk(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('newanchor/isok/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function getGameWord(params) {
  console.log('=====getGameWord======', params);
  let result = {};
  await api.request('newanchor/staticword/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

// export async function getGameWordInfo(params) {
//   console.log('=====getGameWordInfo======', params);
//   let result = {};
//   await api.request('newanchor/staticwordinfo/', 'POST', params).then(res => {
//     result = res;
//   }).catch(err => {
//     console.log(err);
//   })
//   return result;
// }

export async function getGameWordGrade(params) {
  console.log('=====getGameWordGrade======', params);
  let result = {};
  await api.request('newanchor/staticwordinfo/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function getGameLastInfo(params) {
  console.log('=====getGameLastInfo======', params);
  let result = {};
  await api.request('newanchor/last/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}

export async function nextWord(params) {
  console.log('=====nextWord======', params);
  let result = {};
  await api.request('newanchor/next/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    message.error(err);
    console.log(err);
  })
  return result;
}


