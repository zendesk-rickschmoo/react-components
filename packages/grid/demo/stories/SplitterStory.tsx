/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { PaneProvider, Pane, IPaneProviderReturnProps } from '@zendeskgarden/react-grid';

interface IArgs {
  rows: number;
  cols: number;
}

const makeArray = (length: number) => {
  return Array.from({ length }, () => 0).map((_, index) => index + 1);
};

export const SplitterStory: Story<IArgs> = ({ rows, cols }) => (
  <PaneProvider
    totalPanesHeight={1000}
    totalPanesWidth={2000}
    defaultLayoutValues={{
      ...makeArray(cols).reduce((prev: any, value) => {
        prev[`column-${value % cols}`] = 20;

        return prev;
      }, {}),
      ...makeArray(rows).reduce((prev: any, value) => {
        prev[`row-${value % rows}`] = 20;

        return prev;
      }, {})
    }}
  >
    {({ getLayoutValue }: IPaneProviderReturnProps) => (
      <div
        style={{
          display: 'grid',
          width: '100%',
          height: '800px',
          gridTemplateRows: `${makeArray(rows - 1)
            .map(value => `${getLayoutValue(`row-${value % rows}`)}px`)
            .join(' ')} 1fr`,
          gridTemplateColumns: `${makeArray(cols - 1)
            .map(value => `${getLayoutValue(`column-${value % cols}`)}px`)
            .join(' ')} 1fr`
        }}
      >
        {makeArray(rows * cols).map(value => (
          <div key={`pane-${value}`}>
            <Pane>
              <Pane.Content>{`pane-${value}`}</Pane.Content>
              {value % cols !== 0 && (
                <Pane.Splitter
                  layoutKey={`column-${value % cols}`}
                  orientation="end"
                  min={0}
                  max={500}
                />
              )}
              {value < rows * cols - cols + 1 && (value % cols) + 1 > 0 && (
                <Pane.Splitter
                  layoutKey={`row-${Math.ceil(value / cols)}`}
                  orientation="bottom"
                  min={0}
                  max={500}
                />
              )}
            </Pane>
          </div>
        ))}
      </div>
    )}
  </PaneProvider>
);
