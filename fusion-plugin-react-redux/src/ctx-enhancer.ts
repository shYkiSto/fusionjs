/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-env browser */

import {createStore} from 'redux';
import type {Store} from 'redux';

import type {Context} from 'fusion-core';

type CreateStoreType = typeof createStore;

type StoreWithContextType = Store<any, any> & {
  ctx: Context;
};

export default (ctx: Context) =>
  (createStore: CreateStoreType) =>
  (...args: [any, any, any?]) => {
    const store: StoreWithContextType = {
      ...createStore(...args),
      ctx,
    };
    return store;
  };
