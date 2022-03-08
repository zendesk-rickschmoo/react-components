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
  totalHeightFractions: number;
  totalWidthFractions: number;
  defaultLayoutValues?: Record<string, number>;
  layoutValues?: Record<string, number>;
  onChange?: (layoutValues: Record<string, number>) => void;
  children?: any;
}

export interface IPaneProviderReturnProps {
  getLayoutValue: (key: string, dimension: 'height' | 'width', units?: "px" | "fr") => number;
}

export const getFr = (pixels: number, totalFractions: number, totalDimension: number) => {
  const pixelsPerFraction = totalDimension / totalFractions;

  return pixels / pixelsPerFraction;
}

export const getPx = (frs: number, totalFractions: number, totalDimension: number) => {
  const pixelsPerFraction = totalDimension / totalFractions;

  return frs * pixelsPerFraction;
}

export const PaneProvider = ({ totalPanesWidth, totalHeightFractions, totalPanesHeight, totalWidthFractions, defaultLayoutValues, children }: IPaneProvider) => {
  const [layoutState, setLayoutValues] = useState<Record<string, number>>(
    defaultLayoutValues || {}
  );

  const dimensionToTotalPanes = useMemo(() => ({
    height: totalPanesHeight,
    width: totalPanesWidth,
  }), [totalPanesHeight, totalPanesWidth])

  const dimensionToTotalFractions = useMemo(() => ({
    height: totalHeightFractions,
    width: totalWidthFractions,
  }), [totalHeightFractions, totalWidthFractions])

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
    (key: string, dimension: 'height' | 'width', units?: "px" | "fr") => {
      switch (units) {
        case "px":
          return getPx(layoutState[key], dimensionToTotalFractions[dimension], dimensionToTotalPanes[dimension]);
        case "fr":
        default:
          return layoutState[key];
      }
    },
    [layoutState, dimensionToTotalPanes, dimensionToTotalFractions]
  );

  const splitterContext = useMemo(
    () => ({
      layoutState,
      setLayoutValue,
      getLayoutValue,
      totalPanesHeight,
      totalPanesWidth,
      totalWidthFractions,
      totalHeightFractions,
    }),
    [layoutState, setLayoutValue, getLayoutValue, totalPanesHeight, totalPanesWidth, totalWidthFractions, totalHeightFractions]
  );

  return (
    <SplitterContext.Provider value={splitterContext}>
      {children({
        getLayoutValue,
      })}
    </SplitterContext.Provider>
  );
};

PaneProvider.displayName = 'PaneProvider';

PaneProvider.propTypes = {
  children: PropTypes.any
};
