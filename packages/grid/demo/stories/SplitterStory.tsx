/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Story } from '@storybook/react';
import { ThemeContext } from 'styled-components';
import {
  PaneProvider,
  IPaneProvider,
  Pane,
  IPaneProviderReturnProps
} from '@zendeskgarden/react-grid';

interface IArgs extends IPaneProvider {
  handleValueChange: IPaneProvider['onChange'];
  hasOverflow: boolean;
  textContent: string;
}

export const SplitterStory: Story<IArgs> = ({
  totalPanesWidth,
  totalPanesHeight,
  columnValues,
  rowValues,
  handleValueChange,
  hasOverflow,
  textContent
}) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  const themeContext = useContext(ThemeContext);

  return (
    <PaneProvider
      totalPanesWidth={totalPanesWidth ? totalPanesWidth : width}
      totalPanesHeight={totalPanesWidth ? totalPanesHeight : height}
      columnValues={columnValues}
      rowValues={rowValues}
      onChange={handleValueChange}
    >
      {({ getGridTemplateColumns, getGridTemplateRows }: IPaneProviderReturnProps) => {
        return (
          <div
            ref={ref}
            style={{
              direction: themeContext.rtl ? 'rtl' : 'ltr',
              display: 'grid',
              width: '100%',
              height: '90vh',
              gridTemplateRows: getGridTemplateRows(),
              gridTemplateColumns: getGridTemplateColumns()
            }}
          >
            <Pane>
              <Pane.Content
                style={{
                  overflowY: hasOverflow ? 'scroll' : undefined
                }}
              >
                <div style={{ height: hasOverflow ? '0px' : undefined }}>
                  <p>Pane 1</p>
                  {hasOverflow && textContent && <p>{textContent}</p>}
                </div>
              </Pane.Content>
              <Pane.Splitter layoutKey="row-1" orientation="bottom" min={0} max={2} />
              <Pane.Splitter layoutKey="column-1" orientation="end" min={0} max={2} />
            </Pane>
            <Pane>
              <Pane.Content
                style={{
                  overflowY: hasOverflow ? 'scroll' : undefined
                }}
              >
                <div style={{ height: hasOverflow ? '0px' : undefined }}>
                  <p>Pane 2</p>
                  {hasOverflow && textContent && <p>{textContent}</p>}
                </div>
              </Pane.Content>
              <Pane.Splitter layoutKey="row-1" orientation="bottom" min={0} max={2} />
            </Pane>
            <Pane>
              <Pane.Content
                style={{
                  overflowY: hasOverflow ? 'scroll' : undefined
                }}
              >
                <div style={{ height: hasOverflow ? '0px' : undefined }}>
                  <p>Pane 3</p>
                  {hasOverflow && textContent && <p>{textContent}</p>}
                </div>
              </Pane.Content>
              <Pane.Splitter layoutKey="column-1" orientation="end" min={0} max={2} />
            </Pane>
            <Pane>
              <Pane.Content
                style={{
                  overflowY: hasOverflow ? 'scroll' : undefined
                }}
              >
                <div style={{ height: hasOverflow ? '0px' : undefined }}>
                  <p>Pane 4</p>
                  {hasOverflow && textContent && <p>{textContent}</p>}
                </div>
              </Pane.Content>
            </Pane>
          </div>
        );
      }}
    </PaneProvider>
  );
};
