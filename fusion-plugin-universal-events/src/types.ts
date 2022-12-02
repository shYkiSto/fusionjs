/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {Context} from 'fusion-core';
import {FetchToken} from 'fusion-tokens';

type MapFnType<TInput, TOutput> = (payload: TInput, ctx?: Context) => TOutput;
type HandlerFnType<TInput> = (
  payload: TInput,
  ctx?: Context,
  type?: string
) => void | Promise<void>;

export interface IEmitter {
  from(ctx: Context): IEmitter;
  emit(type: string, payload: unknown, ctx?: Context): void;
  setFrequency(frequency: number): void;
  teardown(): void;
  map<TIn = any, TOut = any>(
    type: string,
    callback: MapFnType<TIn, TOut>
  ): void;
  map<TIn = any, TOut = any>(callback: MapFnType<TIn, TOut>): void;
  on<TIn = any>(type: string, callback: HandlerFnType<TIn>): void;
  on<TIn = any>(callback: HandlerFnType<TIn>): void;
  off<TIn = any>(type: string, callback: HandlerFnType<TIn>): void;
  off<TIn = any>(callback: HandlerFnType<TIn>): void;
  mapEvent(type: string, payload: unknown, ctx?: Context): any;
  handleEvent(type: string, payload: unknown, ctx?: Context): void;
  flush(): void;
}

export type BatchType = {
  type: unknown;
  payload: unknown;
};

export interface BatchStorage {
  add(toBeAdded: BatchType): void;
  addToStart(...toBeAdded: BatchType[]): void;
  getAndClear(limit: number): BatchType[];
}

export type UniversalEventsPluginDepsType = {
  fetch: typeof FetchToken;
};
