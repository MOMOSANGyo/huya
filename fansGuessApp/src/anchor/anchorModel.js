import api from '../service/api'

export async function getInitData() {
  let result = {};
  await api.request('anchor/index/', 'POST').then(res => {
    console.log('=======getInitData=====res===', res);
    result = res;
  }).catch(err => {
    console.log(err);
  })
  console.log('=======getInitData=========', result);
  return result;
}

export async function setInviteData(params) {
  console.log('=====setInviteData======', params);
  let result = {};
  await api.request('anchor/ainvite/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function getAwaitTime(params) {
  console.log('=====getAwaitTime======', params);
  let result = {};
  await api.request('anchor/await/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}


export async function getAwaitNum(params) {
  console.log('=====getAwaitNum======', params);
  let result = {};
  await api.request('anchor/wait/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function quitGame(params) {
  console.log('=====quitGame======', params);
  let result = {};
  await api.request('anchor/quit/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function getGameDetail(params) {
  console.log('=====getGameDetail======', params);
  let result = {};
  await api.request('anchor/join/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function getGameWord(params) {
  console.log('=====getGameWord======', params);
  let result = {};
  await api.request('anchor/word/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function getGameWordInfo(params) {
  console.log('=====getGameWordInfo======', params);
  let result = {};
  await api.request('anchor/wordinfo/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function getGameWordGrade(params) {
  console.log('=====getGameWordGrade======', params);
  let result = {};
  await api.request('anchor/wordgrade/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}

export async function getGameLastInfo(params) {
  console.log('=====getGameLastInfo======', params);
  let result = {};
  await api.request('anchor/last/', 'POST', params).then(res => {
    result = res;
  }).catch(err => {
    console.log(err);
  })
  return result;
}


