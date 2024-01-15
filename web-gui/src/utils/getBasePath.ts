export function getBasePath() {
    let str = window.location.pathname;
    str = 'http://192.168.1.188/';
    return str.endsWith("/") ? str.slice(0, -1) : str;
  }