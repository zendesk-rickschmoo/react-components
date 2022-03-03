/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { createContext, useContext } from 'react';

interface ISplitterContext {
  layoutState: any;
  setLayoutValue: (id: string, value: number) => void;
}

export const SplitterContext = createContext<ISplitterContext>({
  setLayoutValue: () => undefined,
  layoutState: {}
});

/**
 * Retrieve Splitter component context
 */
const useSplitterContext = () => {
  return useContext(SplitterContext);
};

export default useSplitterContext;
