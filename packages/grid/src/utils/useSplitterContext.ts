/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { createContext, useContext } from "react";

interface ISplitterContext {
  layoutValues?: any;
}

export const SplitterContext = createContext<ISplitterContext>({ layoutValues: {} });

/**
 * Retrieve Splitter component context
 */
const useSplitterContext = () => {
  return useContext(SplitterContext);
};

export default useSplitterContext;
