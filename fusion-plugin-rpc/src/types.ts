/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {type FusionPlugin, type Context, RouteTagsToken} from 'fusion-core';
import {
  UniversalEventsToken,
  type UniversalEventsType as IEmitter,
} from 'fusion-plugin-universal-events';
import {type Fetch, FetchToken} from 'fusion-tokens';
import {I18nToken} from 'fusion-plugin-i18n';

import {
  RPCHandlersToken,
  BodyParserOptionsToken,
  RPCHandlersConfigToken,
  RPCQueryParamsToken,
  type HandlerType,
} from './tokens';

export type RPCDepsType = {
  RouteTags?: typeof RouteTagsToken.optional;
  emitter: typeof UniversalEventsToken;
  handlers?: typeof RPCHandlersToken;
  bodyParserOptions?: typeof BodyParserOptionsToken.optional;
  fetch?: typeof FetchToken;
  i18n?: typeof I18nToken.optional;
  rpcConfig?: typeof RPCHandlersConfigToken.optional;
  queryParams?: typeof RPCQueryParamsToken.optional;
};

export type RPCScopedServiceType = {
  ctx: Context | undefined | null;
  emitter?: IEmitter;
  handlers: HandlerType | undefined | null;
  fetch: Fetch | undefined | null;
  request<TArgs, TResult>(method: string, args: TArgs): Promise<TResult>;
};

export type RPCServiceType = {
  from: (ctx: Context) => RPCScopedServiceType;
};

export type RPCPluginType = FusionPlugin<RPCDepsType, RPCServiceType>;

export type {IEmitter};

export type RPCConfigType = {
  apiPath?: string;
};
