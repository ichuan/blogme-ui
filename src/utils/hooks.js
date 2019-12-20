import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  config: {},
  user: null,
};

const actions = {
  setConfig: (store, config) => {
    store.setState({ config });
  },
  setUser: (store, user) => {
    store.setState({ user });
  },
};

export default globalHook(React, initialState, actions);
