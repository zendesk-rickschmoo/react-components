/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SplitterContext } from '../../utils/useSplitterContext';

export interface IPaneProvider {
  totalPanesWidth: number;
  totalPanesHeight: number;
  defaultLayoutValues?: Record<string, number>;
  layoutValues?: Record<string, number>;
  onChange?: (layoutValues: Record<string, number>) => void;
  children?: any;
}

export interface IPaneProviderReturnProps {
  getLayoutValue: (key: string) => number;
}

export const PaneProvider = ({ defaultLayoutValues, children }: IPaneProvider) => {
  const [layoutState, setLayoutValues] = useState<Record<string, number>>(
    defaultLayoutValues || {}
  );

  const setLayoutValue = useCallback(
    (id: string, value: number) => {
      setLayoutValues(state => ({
        ...state,
        [id]: value
      }));
    },
    [setLayoutValues]
  );

  const getLayoutValue = useCallback(
    (key: string) => {
      return layoutState[key];
    },
    [layoutState]
  );

  const splitterContext = useMemo(
    () => ({
      layoutState,
      setLayoutValue
    }),
    [layoutState, setLayoutValue]
  );

  return (
    <SplitterContext.Provider value={splitterContext}>
      {children({
        getLayoutValue
      })}
    </SplitterContext.Provider>
  );
};

PaneProvider.displayName = 'PaneProvider';

PaneProvider.propTypes = {
  children: PropTypes.any
};
