/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useMemo } from 'react';
import { Splitter } from './Splitter';
import { StyledPane } from '../../styled/splitter/StyledPane';
import { StyledPaneItem } from '../../styled/splitter/StyledPaneItem';
import { PaneContext } from '../../utils/usePaneContext';
export interface IPane {
  children?: any;
}

export const Pane = ({ children }: IPane) => {
  const [paneId, setPaneId] = useState<string>();

  const paneContext = useMemo(
    () => ({
      id: paneId,
      setId: (id: string) => setPaneId(id)
    }),
    [paneId, setPaneId]
  );

  return (
    <PaneContext.Provider value={paneContext}>
      <StyledPane id={paneId}>{children}</StyledPane>
    </PaneContext.Provider>
  );
};

Pane.Content = StyledPaneItem;
Pane.Splitter = Splitter;
