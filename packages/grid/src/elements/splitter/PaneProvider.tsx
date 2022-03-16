/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { SplitterContext } from '../../utils/useSplitterContext';
import { DIMENSIONS, UNITS } from '../../utils/types';
export interface IPaneProvider {
  totalPanesWidth: number;
  totalPanesHeight: number;
  defaultRowValues?: Record<string, number>;
  defaultColumnValues?: Record<string, number>;
  rowValues?: Record<string, number>;
  columnValues?: Record<string, number>;
  onChange?: (rowValues: Record<string, number>, columnValues: Record<string, number>) => void;
  children?: any;
}

export interface IPaneProviderReturnProps {
  getLayoutValue: (dimension: DIMENSIONS, key: string, units?: UNITS) => number;
  getGridTemplateRows: (units?: UNITS) => string;
  getGridTemplateColumns: (units?: UNITS) => string;
}

export const getFr = (pixels: number, totalFractions: number, totalDimension: number) => {
  const pixelsPerFraction = totalDimension / totalFractions;

  return pixels / pixelsPerFraction;
};

export const getPx = (frs: number, totalFractions: number, totalDimension: number) => {
  const pixelsPerFraction = totalDimension / totalFractions;

  return frs * pixelsPerFraction;
};

const getPixelsPerFr = (totalFrs: number, totalDimension: number) => {
  return totalDimension / totalFrs;
};

const convertToPixels = (values: Record<string, number>, pixelsPerFr: number) => {
  return Object.entries(values).reduce((prev, [key, value]) => {
    if (value) {
      prev[key] = value * pixelsPerFr;
    }

    return prev;
  }, {} as Record<string, number>);
};

export const PaneProvider = ({
  totalPanesWidth,
  totalPanesHeight,
  defaultRowValues,
  defaultColumnValues,
  children
}: IPaneProvider) => {
  const [rowState, setRowState] = useState<Record<string, number>>(defaultRowValues || {});
  const [columnState, setColumnState] = useState<Record<string, number>>(defaultColumnValues || {});

  const totalFractions = useMemo(
    () => ({
      rows: Object.values(rowState).reduce((prev, value) => (value ? value : 0) + prev, 0),
      columns: Object.values(columnState).reduce((prev, value) => (value ? value : 0) + prev, 0)
    }),
    [rowState, columnState]
  );

  const pixelsPerFr = useMemo(
    () => ({
      rows: getPixelsPerFr(totalFractions.rows, totalPanesHeight),
      columns: getPixelsPerFr(totalFractions.columns, totalPanesWidth)
    }),
    [totalFractions, totalPanesHeight, totalPanesWidth]
  );

  const layoutStateInPixels = useMemo(
    () => ({
      rows: convertToPixels(rowState, pixelsPerFr.rows),
      columns: convertToPixels(columnState, pixelsPerFr.columns)
    }),
    [rowState, columnState, pixelsPerFr]
  );

  const layoutIndices = useMemo(() => {
    const rowArray = Object.keys(rowState);
    const columnArray = Object.keys(columnState);

    const rows = rowArray.reduce((prev, key, index) => {
      prev[key] = index;

      return prev;
    }, {} as Record<string, number>);

    const columns = columnArray.reduce((prev, key, index) => {
      prev[key] = index;

      return prev;
    }, {} as Record<string, number>);

    return {
      rows,
      columns,
      rowArray,
      columnArray
    };
  }, [rowState, columnState]);

  const setRowValue = useCallback(
    (isTop: boolean, id: string, value: number) => {
      const { rows, rowArray } = layoutIndices;
      const indexTraversal = isTop ? -1 : 1;

      setRowState(state => {
        const oldValue = rowState[id];
        const stealFromIndex = rows[id] + indexTraversal;

        if (stealFromIndex < 0 || stealFromIndex > rowArray.length - 1) {
          return state;
        }

        const stealFromKey = rowArray[stealFromIndex];

        const difference = oldValue - value;

        const nextState = {
          ...state
        } as Record<string, number>;

        nextState[id] = value;
        nextState[stealFromKey] = rowState[stealFromKey] + difference;

        return nextState;
      });
    },
    [layoutIndices, rowState]
  );

  const setColumnValue = useCallback(
    (isStart: boolean, id: string, value: number) => {
      const { columns, columnArray } = layoutIndices;
      const indexTraversal = isStart ? -1 : 1;

      setColumnState(state => {
        const oldValue = columnState[id];
        const stealFromIndex = columns[id] + indexTraversal;

        if (stealFromIndex < 0 || stealFromIndex > columnArray.length - 1) {
          return state;
        }

        const stealFromKey = columnArray[stealFromIndex];

        const difference = oldValue - value;

        const nextState = {
          ...state
        } as Record<string, number>;

        nextState[id] = value;
        nextState[stealFromKey] = columnState[stealFromKey] + difference;

        return nextState;
      });
    },
    [layoutIndices, columnState]
  );

  const getLayoutValue = useCallback(
    (dimension: DIMENSIONS, key: string, units?: UNITS) => {
      switch (units) {
        case 'px':
          return layoutStateInPixels[dimension][key] || 0;
        case 'fr':
        default:
          return dimension === 'rows' ? rowState[key] : columnState[key];
      }
    },
    [rowState, columnState, layoutStateInPixels]
  );

  const getGridTemplateColumns = useCallback(
    (units?: UNITS) => {
      const { columnArray } = layoutIndices;

      switch (units) {
        case 'px':
          return columnArray.map(col => `${layoutStateInPixels.columns[col]}fr`).join(' ');
        case 'fr':
        default:
          return columnArray.map(col => `${columnState[col]}fr`).join(' ');
      }
    },
    [layoutIndices, columnState, layoutStateInPixels]
  );

  const getGridTemplateRows = useCallback(
    (units?: UNITS) => {
      const { rowArray } = layoutIndices;

      switch (units) {
        case 'px':
          return rowArray.map(row => `${layoutStateInPixels.rows[row]}px`).join(' ');
        case 'fr':
        default:
          return rowArray.map(row => `${rowState[row]}fr`).join(' ');
      }
    },
    [layoutIndices, rowState, layoutStateInPixels]
  );

  const splitterContext = useMemo(
    () => ({
      columnState,
      rowState,
      setRowValue,
      setColumnValue,
      getLayoutValue,
      totalPanesHeight,
      totalPanesWidth,
      pixelsPerFr,
    }),
    [
      rowState,
      columnState,
      setRowValue,
      setColumnValue,
      getLayoutValue,
      totalPanesHeight,
      totalPanesWidth,
      pixelsPerFr,
    ]
  );

  return (
    <SplitterContext.Provider value={splitterContext}>
      {children({
        getLayoutValue,
        getGridTemplateColumns,
        getGridTemplateRows
      })}
    </SplitterContext.Provider>
  );
};

PaneProvider.displayName = 'PaneProvider';
