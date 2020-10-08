/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * @flow strict-local
 * @format
 */
'use strict';

import * as React from 'React';
import {useEffect, useRef} from 'React';
import * as ReactDOM from 'ReactDOM';
import ReactTestUtils from 'ReactTestUtils';

const {act} = ReactTestUtils;

import {RecoilRoot} from '../../core/Recoil_RecoilRoot.react';
import atom from '../../recoil_values/Recoil_atom';
import {componentThatReadsAndWritesAtom} from '../../testing/Recoil_TestingUtils';
import useRecoilBridgeAcrossReactRoots from '../Recoil_useRecoilBridgeAcrossReactRoots';

test('useRecoilBridgeAcrossReactRoots - create a context bridge', () => {
  const myAtom = atom({
    key: 'useRecoilBridgeAcrossReactRoots - context bridge',
    default: 'DEFAULT',
  });

  function initializeState({set, getLoadable}) {
    expect(getLoadable(myAtom).contents).toEqual('DEFAULT');
    set(myAtom, 'INITIALIZE');
    expect(getLoadable(myAtom).contents).toEqual('INITIALIZE');
  }

  const [ReadWriteAtom, setAtom] = componentThatReadsAndWritesAtom(myAtom);

  function NestedReactRoot({children}) {
    const ref = useRef();
    const RecoilBridge = useRecoilBridgeAcrossReactRoots();

    useEffect(
      () =>
        act(() => {
          ReactDOM.render(
            <RecoilBridge>{children}</RecoilBridge>,
            ref.current ?? document.createElement('div'),
          );
        }),
      [children],
    );

    return <div ref={ref} />;
  }

  const container = document.createElement('div');
  act(() => {
    ReactDOM.render(
      <RecoilRoot initializeState={initializeState}>
        <ReadWriteAtom />

        <NestedReactRoot>
          <ReadWriteAtom />
        </NestedReactRoot>
      </RecoilRoot>,
      container,
    );
  });

  expect(container.textContent).toEqual('"INITIALIZE""INITIALIZE"');

  act(() => setAtom('SET'));
  expect(container.textContent).toEqual('"SET""SET"');
});
