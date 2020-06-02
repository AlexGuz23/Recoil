/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * @flow strict
 * @format
 */

'use strict';

/**
 * Creates a new iterable whose output is generated by passing the input
 * iterable's values through the mapper function.
 */
function mapIterable<T, K>(
  iterable: Iterable<T>,
  callback: (v: T, index: number) => K,
): Iterable<K> {
  // Use generator to create iterable/iterator
  return (function*() {
    let index = 0;
    for (const value of iterable) {
      yield callback(value, index++);
    }
  })();
}

module.exports = mapIterable;
