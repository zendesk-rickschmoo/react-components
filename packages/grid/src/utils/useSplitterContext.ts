/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { createContext, useContext } from 'react';
import { LAYOUT_STATE, DIMENSIONS, UNITS } from './types'

interface ISplitterContext {
  layoutState: LAYOUT_STATE;
  setLayoutValue: (dimension: DIMENSIONS, id: number, value: number) => void;
  getLayoutValue: (dimension: DIMENSIONS, id: number, units?: UNITS) => number;
  totalPanesHeight: number,
  totalPanesWidth: number,
  pixelsPerFr: { rows: number, columns: number }
}

export const SplitterContext = createContext<ISplitterContext>({
  setLayoutValue: () => undefined,
  getLayoutValue: () => 0,
  layoutState: { rows: [] , columns: [] },
  totalPanesHeight: 1,
  totalPanesWidth: 1,
  pixelsPerFr: { rows: 0, columns: 0 },
});

/**
 * Retrieve Splitter component context
 */
const useSplitterContext = () => {
  return useContext(SplitterContext);
};

export default useSplitterContext;
