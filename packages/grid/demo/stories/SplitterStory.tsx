/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import useResizeObserver from 'use-resize-observer';
import { Story } from '@storybook/react';
import { DefaultTheme } from 'styled-components';
import { PaneProvider, IPaneProvider, Pane, IPaneProviderReturnProps } from '@zendeskgarden/react-grid';
import { ThemeProvider, IGardenTheme } from '@zendeskgarden/react-theming';

interface IArgs extends IPaneProvider {
  handleValueChange: IPaneProvider['onChange'];
  rows: number;
  cols: number;
  isRtl: boolean;
  hasOverflow: boolean;
  textContent: string;
}

export const makeArray = (length: number) => {
  return Array.from({ length }, () => 0).map((_, index) => index + 1);
};

export const SplitterStory: Story<IArgs> = ({ 
  totalPanesWidth,
  totalPanesHeight,
  columnValues,
  rowValues,
  handleValueChange,
  rows,
  cols,
  isRtl,
  hasOverflow,
  textContent,
}) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  return (
    <ThemeProvider
      focusVisibleRef={null}
      theme={
        ((parentTheme: DefaultTheme) => ({
          ...parentTheme,
          rtl: isRtl ? 'rtl' : parentTheme.rtl
        })) as unknown as IGardenTheme
      }
    >
      <PaneProvider
        totalPanesWidth={totalPanesWidth ? totalPanesWidth : width}
        totalPanesHeight={totalPanesWidth ? totalPanesHeight : height}
        columnValues={columnValues}
        rowValues={rowValues}
        onChange={handleValueChange}
      >
        {({ getGridTemplateColumns, getGridTemplateRows }: IPaneProviderReturnProps) => {
          const isNotLastRow = (value: number) => value < rows * cols - cols + 1;

          return (
            <div
              ref={ref}
              style={{
                direction: isRtl ? 'rtl' : 'ltr',
                display: 'grid',
                width: '100%',
                height: '90vh',
                gridTemplateRows: getGridTemplateRows(),
                gridTemplateColumns: getGridTemplateColumns()
              }}
            >
              {makeArray(rows * cols).map(value => (
                <div key={`pane-${value}`}>
                  <Pane>
                    <Pane.Content
                      style={{
                        overflowY: hasOverflow ? 'scroll' : undefined
                      }}
                    >
                      <div style={{ height: hasOverflow ? '0px' : undefined }}>
                        <p>{`pane-${value}`}</p>
                        {hasOverflow && textContent && <p>{textContent}</p>}
                      </div>
                    </Pane.Content>
                    {isNotLastRow(value) && (
                      <Pane.Splitter
                        layoutKey={`pane-${Math.ceil(value / cols)}`}
                        orientation="bottom"
                        min={0}
                        max={2}
                      />
                    )}
                    {value % cols !== 0 && (
                      <Pane.Splitter
                        layoutKey={`pane-${value % cols}`}
                        orientation="end"
                        min={0}
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
    </ThemeProvider>
  );
};
