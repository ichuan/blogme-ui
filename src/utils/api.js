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
      if (!(body instanceof FormData)) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
      }
    }
    return fetch(`${apiBase}${endpoint}`, options).then(r => {
      if (statusCallbacks[r.status]) {
        for (const callback of statusCallbacks[r.status]) {
          callback(r);
        }
      }
      const ret = r.json();
      if (!r.ok) {
        return ret.then(rr => Promise.reject(rr.detail || rr));
      }
      return ret;
    });
  },

  get(endpoint, querys) {
    if (querys) {
      querys = Object.keys(querys)
        .map(key => `${key}=${querys[key]}`)
        .join('&');
      endpoint = `${endpoint}?${querys}`;
    }
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

  upload(endpoint, file, onProgress) {
    return new Promise((resolve, reject) => {
      let data = new FormData(),
        xhr = new XMLHttpRequest(),
        url = apiBase + endpoint;
      data.append('file', file);
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      xhr.upload.addEventListener('progress', e => {
        onProgress((e.loaded / e.total) * 100);
      });
      xhr.addEventListener('load', e => {
        if (xhr.readyState === xhr.DONE) {
          try {
            let ret = JSON.parse(xhr.responseText);
            xhr.status === 200
              ? resolve({ url: `${apiBase}${ret.url}` })
              : reject(ret.detail || ret);
          } catch (e) {
            reject(e);
          }
        }
      });
      xhr.send(data);
    });
  },

  hasToken() {
    return accessToken;
  },
};
