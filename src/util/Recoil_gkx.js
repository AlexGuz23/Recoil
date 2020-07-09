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

const gks = new Map();

function Recoil_gkx(gk: string): boolean {
  return gks.get(gk) ?? false;
}

Recoil_gkx.setPass = (gk: string): void => {
  gks.set(gk, true);
};

Recoil_gkx.setFail = (gk: string): void => {
  gks.set(gk, false);
};

module.exports = Recoil_gkx;
