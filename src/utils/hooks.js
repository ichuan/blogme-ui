import React from 'react';
import globalHook from 'use-global-hook';

import Api from './api';

const initialState = {
  config: {},
  user: null,
  accessToken: Api.loadTokenFromCache(),
};

const actions = {
  setConfig(store, config) {
    store.setState({ config });
  },
  setUser(store, user) {
    store.setState({ user });
  },
  setAccessToken(store, token) {
    store.setState({ accessToken: token });
  },
};

export default globalHook(React, initialState, actions);
