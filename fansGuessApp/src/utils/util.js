export function setGameID(gameid) {
  // const proTinyid = typeof tinyid === 'string' ? [tinyid] : tinyid;
  return localStorage.setItem('gameid', JSON.stringify(gameid));
}

export function getGameID() {
  const gameid = localStorage.getItem('gameid');
  let resGameId;
  try {
    resGameId = JSON.parse(gameid);
  } catch (e) {
    resGameId = gameid;
  }
  return resGameId;
}

export function setGameWordID(gamewordid) {
  // const proTinyid = typeof tinyid === 'string' ? [tinyid] : tinyid;
  return localStorage.setItem('gamewordid', JSON.stringify(gamewordid));
}

export function getGameWordID() {
  const gamewordid = localStorage.getItem('gamewordid');
  let resGameWordId;
  try {
    resGameWordId = JSON.parse(gamewordid);
  } catch (e) {
    resGameWordId = gamewordid;
  }
  return resGameWordId;
}