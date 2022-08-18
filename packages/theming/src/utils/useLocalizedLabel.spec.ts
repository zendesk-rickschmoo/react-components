/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { renderHook } from '@testing-library/react-hooks';

import { useLocalizedLabel } from './useLocalizedLabel';

type TestLabelType = { 'aria-label': string | undefined; lang: string | undefined };

describe('useLocalizedLabel()', () => {
  const Component = { displayName: 'Component' };

  it('sets default aria label if text prop is not defined', () => {
    let localizedLabel = {} as TestLabelType;

    renderHook(() => {
      localizedLabel = useLocalizedLabel(Component, {}, 'test', 'value');
    });

    const { 'aria-label': label, lang } = localizedLabel;

    expect(label).toBe('value');
    expect(lang).toBe('en');
  });

  it('sets aria label if text prop is defined', () => {
    let localizedLabel = {} as TestLabelType;

    renderHook(() => {
      localizedLabel = useLocalizedLabel(Component, { test: 'test' }, 'test', 'value');
    });

    const { 'aria-label': label, lang } = localizedLabel;

    expect(label).toBe('test');
    expect(lang).toBeUndefined();
  });

  it('sets lang if prop is defined', () => {
    let localizedLabel = {} as TestLabelType;

    renderHook(() => {
      localizedLabel = useLocalizedLabel(
        Component,
        { test: 'prueba', lang: 'es' },
        'test',
        'value'
      );
    });

    const { 'aria-label': label, lang } = localizedLabel;

    expect(label).toBe('prueba');
    expect(lang).toBe('es');
  });
});
