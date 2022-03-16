/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Story } from '@storybook/react';
import { PaneProvider, Pane, IPaneProviderReturnProps } from '@zendeskgarden/react-grid';

interface IArgs {
  rows: number;
  cols: number;
}

const makeArray = (length: number) => {
  return Array.from({ length }, () => 0).map((_, index) => index + 1);
};

export const SplitterStory: Story<IArgs> = ({ rows, cols }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  const [rowState, setRowState] = useState<Record<string, number>>(
    makeArray(rows).reduce((prev: any, value) => {
      prev[`pane-${value % rows}`] = 1;

      return prev;
    }, {})
  );
  const [colState, setColState] = useState<Record<string, number>>(
    makeArray(cols).reduce((prev: any, value) => {
      prev[`pane-${value % cols}`] = 1;

      return prev;
    }, {})
  );

  const onChange = useCallback(
    (rowValues: Record<string, number>, colValues: Record<string, number>) => {
      setColState(colValues);
      setRowState(rowValues);
    },
    [setColState, setRowState]
  );

  return (
    <PaneProvider
      totalPanesWidth={width}
      totalPanesHeight={height}
      columnValues={colState}
      rowValues={rowState}
      onChange={onChange}
    >
      {({ getGridTemplateColumns, getGridTemplateRows }: IPaneProviderReturnProps) => {
        const isNotLastRow = (value: number) => value < rows * cols - cols + 1;

        return (
          <div
            ref={ref}
            style={{
              display: 'grid',
              width: '100%',
              height: '800px',
              gridTemplateRows: getGridTemplateRows(),
              gridTemplateColumns: getGridTemplateColumns()
            }}
          >
            {makeArray(rows * cols).map(value => (
              <div key={`pane-${value}`}>
                <Pane>
                  <Pane.Content>{`pane-${value}`}</Pane.Content>
                  {value % cols !== 0 && (
                    <Pane.Splitter
                      layoutKey={`pane-${value % cols}`}
                      orientation="end"
                      min={0.5}
                      max={2}
                    />
                  )}
                  {isNotLastRow(value) && (
                    <Pane.Splitter
                      layoutKey={`pane-${Math.ceil(value / cols)}`}
                      orientation="bottom"
                      min={0.5}
                      max={2}
                    />
                  )}
                </Pane>
              </div>
            ))}
          </div>
        );
      }}
    </PaneProvider>
  );
};
