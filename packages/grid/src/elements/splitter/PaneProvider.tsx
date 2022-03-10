/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SplitterContext } from '../../utils/useSplitterContext';
import { LAYOUT_STATE, DIMENSIONS, UNITS } from '../../utils/types';
export interface IPaneProvider {
  totalPanesWidth: number;
  totalPanesHeight: number;
  defaultLayoutValues?: LAYOUT_STATE;
  layoutValues?: LAYOUT_STATE;
  onChange?: (layoutValues: LAYOUT_STATE) => void;
  children?: any;
}

export interface IPaneProviderReturnProps {
  getLayoutValue: (dimension: DIMENSIONS, key: number, units?: UNITS) => number;
}

export const getFr = (pixels: number, totalFractions: number, totalDimension: number) => {
  const pixelsPerFraction = totalDimension / totalFractions;

  return pixels / pixelsPerFraction;
}

export const getPx = (frs: number, totalFractions: number, totalDimension: number) => {
  const pixelsPerFraction = totalDimension / totalFractions;

  return frs * pixelsPerFraction;
}

const getPixelsPerFr = (totalFrs: number, totalDimension: number) => {
  return totalDimension / totalFrs;
}

const convertToPixels = (values: [ [string, number]? ], pixelsPerFr: number) => {
  return values.reduce((prev, box) => {
    if (box) {
      prev.push([box[0], box[1] * pixelsPerFr]);
    }

    return prev;
  }, [] as LAYOUT_STATE['rows' | 'columns']);
}

export const PaneProvider = ({ totalPanesWidth, totalPanesHeight, defaultLayoutValues, children }: IPaneProvider) => {
  const [layoutState, setLayoutValues] = useState<LAYOUT_STATE>(
    defaultLayoutValues || { columns: [], rows: [] }
  );

  const totalFractions = useMemo(() => ({
    rows: Object.values(layoutState.rows).reduce((prev, value) => (value ? value[1] : 0) + prev, 0),
    columns: Object.values(layoutState.columns).reduce((prev, value) => (value ? value[1] : 0) + prev, 0),
  }), [layoutState]);

  const pixelsPerFr = useMemo(() => ({
    rows: getPixelsPerFr(totalFractions.rows, totalPanesHeight),
    columns: getPixelsPerFr(totalFractions.columns, totalPanesWidth)
  }), [totalFractions, totalPanesHeight, totalPanesWidth]);

  const layoutStateInPixels = useMemo(() => ({ 
    rows: convertToPixels(layoutState.rows, pixelsPerFr.rows),
    columns: convertToPixels(layoutState.columns, pixelsPerFr.columns)
  }), [layoutState, pixelsPerFr]);

  const layoutIndices = useMemo(() => {
    const rows = layoutState.rows.reduce((prev, value, index) => {
      if (!value) {
        return prev;
      }
      const [name] = value;

      prev[name] = index;

      return prev;
    }, {} as Record<string, number>)

    const columns = layoutState.columns.reduce((prev, value, index) => {
      if (!value) {
        return prev;
      }
      const [name] = value;

      prev[name] = index;

      return prev;
    }, {} as Record<string, number>)

    return {
      rows,
      columns,
      lastRow: layoutState.rows.length - 1,
      lastColumn: layoutState.columns.length - 1,
    };
  }, [layoutState]);

  const setLayoutValue = useCallback(
    (dimension: DIMENSIONS, id: number, value: number) => {
      const { lastRow, lastColumn, rows, columns } = layoutIndices;

      if (dimension === 'rows') {
        setLayoutValues(state => {
          const [name, oldValue] = state.rows[rows[id]]!;
          const [lastName, lastValue] = state.rows[lastRow]!;
          const difference = oldValue - value;

          const nextState = {
            ...state,
            rows: [
              ...state.rows,
            ]
          } as LAYOUT_STATE;

          nextState.rows[rows[id]] = [name, value];
          nextState.rows[lastRow] = [lastName, lastValue + difference];

          return nextState;
        });
      }

      if (dimension === 'columns') {
        setLayoutValues(state => {
          const [name, oldValue] = state.columns[columns[id]]!;
          const [lastName, lastValue] = state.columns[lastColumn]!;
          const difference = oldValue - value;

          const nextState = {
            ...state,
            columns: [
              ...state.columns,
            ]
          } as LAYOUT_STATE;

          nextState.columns[columns[id]] = [name, value];
          nextState.columns[lastColumn] = [lastName, lastValue + difference];

          return nextState;
        });
      }
    },
    [setLayoutValues, layoutIndices]
  );

  const getLayoutValue = useCallback(
    (dimension: DIMENSIONS, key: number, units?: UNITS) => {
      const dimensionIndex = layoutIndices[dimension];

      switch (units) {
        case "px":
          return layoutStateInPixels[dimension][dimensionIndex[key]]?.[1] || 0;
        case "fr":
        default:
          return layoutState[dimension][dimensionIndex[key]]?.[1] || 0;
      }
    },
    [layoutState, layoutStateInPixels, layoutIndices]
  );

  const splitterContext = useMemo(
    () => ({
      layoutState,
      setLayoutValue,
      getLayoutValue,
      totalPanesHeight,
      totalPanesWidth,
      pixelsPerFr,
    }),
    [layoutState, setLayoutValue, getLayoutValue, totalPanesHeight, totalPanesWidth, pixelsPerFr]
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
