import api from '../service/api'

export async function getInitData() {
  return api.request('anchor/index/', 'POST')
}

export async function setInviteData(params) {
  return api.request('anchor/ainvite/', 'POST', params)
}

export async function awaitGame(params) {
  return api.request('anchor/await/', 'POST', params)
}

export async function quitGame(params) {
  return api.request('anchor/quit/', 'POST', params)
}

export async function getDetailWords(params) {
  return api.request('anchor/join/', 'POST', params)
}

export async function getDetailWords(params) {
  return api.request('anchor/join/', 'POST', params)
}
