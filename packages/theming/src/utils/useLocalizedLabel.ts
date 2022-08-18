/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { FC, useMemo } from 'react';

import { useText } from './useText';

/**
 * Provides default text for a11y (i.e. aria-label) or other critical attribute
 * strings. If necessary, a development mode console warning prompts the
 * consumer to provide customized, translated text.
 *
 * @param component The React component to which the `props` belong
 * @param props The component props to check for `name`
 * @param name The name of the component prop to set default text on
 * @param text The default text to apply if the value of `props[name]` is undefined
 */
export const useLocalizedLabel = (
  component: Pick<FC, 'displayName'>,
  props: Record<string, any>,
  name: string,
  text: string
): { 'aria-label': string; lang: 'string' } => {
  const label = useText(component, props, name, text);
  const lang = label === text ? 'en' : props.lang;

  return useMemo(
    () => ({
      'aria-label': label,
      lang
    }),
    [label, lang]
  );
};
