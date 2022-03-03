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
  children?: any;
}

export const PaneProvider = ({ children }: IPaneProvider) => {
  const [layoutState, setLayoutValues] = useState<Record<string, number>>({});

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
    (id: string) => {
      return layoutState[id];
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
