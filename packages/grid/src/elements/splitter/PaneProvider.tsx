/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import { SplitterContext } from '../../utils/useSplitterContext';

export interface IPaneProvider {
  children?: any;
}

export const PaneProvider = ({ children }: IPaneProvider) => {
  const [layoutValues, setLayoutValues] = useState({});

  const setLayoutValue = useCallback((id: string, value: number) => {
    setLayoutValues((state) => ({
      ...state,
      [id]: value
    }));
  }, [setLayoutValues]);

  const splitterContext = useMemo(() => ({
    layoutValues,
    setLayoutValue,
  }), [layoutValues, setLayoutValue])

  return (
    <SplitterContext.Provider
      value={splitterContext}
    >
      {children({
        layoutValues,
      })}
    </SplitterContext.Provider>
  );
}

PaneProvider.displayName = 'PaneProvider';

PaneProvider.propTypes = {
  children: PropTypes.any,
};
