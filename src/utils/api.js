import fetch from 'unfetch';

let accessToken = window.localStorage.getItem('token');
let apiBase = window._API_BASE;

const saveToken = token => {
  accessToken = token;
  window.localStorage.setItem('token', token);
};

const headers = () => {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const statusCallbacks = {
  401: [() => saveToken('')],
};

export default {
  onStatus(status, callback, uniqueId) {
    if (!statusCallbacks[status]) {
      statusCallbacks[status] = [];
    }
    if (uniqueId) {
      callback.__osid = uniqueId;
      for (const i of statusCallbacks[status]) {
        if (i.__osid === uniqueId) {
          return;
        }
      }
    }
    statusCallbacks[status].push(callback);
  },

  fetch(method, endpoint, body) {
    const options = { headers: headers(), method };
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = body;
    }
    return fetch(`${apiBase}${endpoint}`, options).then(r => {
      if (statusCallbacks[r.status]) {
        for (const callback of statusCallbacks[r.status]) {
          callback(r);
        }
      }
      return r.json();
    });
  },

  get(endpoint) {
    return this.fetch('GET', endpoint);
  },

  post(endpoint, body) {
    return this.fetch('POST', endpoint, body);
  },

  put(endpoint, body) {
    return this.fetch('PUT', endpoint, body);
  },

  delete(endpoint) {
    return this.fetch('DELETE', endpoint);
  },

  login(endpoint, username, password) {
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return this.post(endpoint, data).then(r => {
      if (r && r.access_token) {
        saveToken(r.access_token);
      }
      return r;
    });
  },

  logout() {
    saveToken('');
  },

  getToken() {
    return accessToken;
  },
};
