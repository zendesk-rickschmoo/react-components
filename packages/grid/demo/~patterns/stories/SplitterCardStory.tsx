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
  IPaneProviderReturnProps,
  useSplitterContext,
  ISplitterContext
} from '@zendeskgarden/react-grid';
import { ICardSplitterColumn } from './types';

interface IArgs extends IPaneProvider {
  hasOverflow: boolean;
  textContent: string;
  columns: ICardSplitterColumn[];
}

interface IColumnGridProps {
  resizeRef: React.RefCallback<any>;
  columns: ICardSplitterColumn[];
}

interface IRowProps {
  columnContext: ISplitterContext;
  panes: ICardSplitterColumn['panes'];
}

interface IRowGridProps {
  columnContext: ISplitterContext;
  panes: ICardSplitterColumn['panes'];
  resizeRef: React.RefCallback<any>;
}

const RowGrid = ({
  resizeRef,
  panes,
  getGridTemplateRows,
  getGridTemplateColumns,
  columnContext
}: IRowGridProps &
  Pick<IPaneProviderReturnProps, 'getGridTemplateColumns' | 'getGridTemplateRows'>) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      ref={resizeRef}
      style={{
        direction: themeContext.rtl ? 'rtl' : 'ltr',
        display: 'grid',
        width: '100%',
        height: '100%',
        gap: '10px',
        gridTemplateRows: getGridTemplateRows(),
        gridTemplateColumns: getGridTemplateColumns()
      }}
    >
      {panes.map(pane => (
        <Pane key={pane.name}>
          <Pane.Content>
            <p>{pane.name}</p>
          </Pane.Content>
          {pane.splitters.map(({ hasParentContext, ...splitter }) => {
            if (hasParentContext) {
              return (
                <Pane.Splitter
                  key={splitter.layoutKey}
                  splitterContext={columnContext}
                  {...splitter}
                />
              );
            }

            return <Pane.Splitter key={splitter.layoutKey} {...splitter} />;
          })}
        </Pane>
      ))}
    </div>
  );
};

const Row = ({ columnContext, panes }: IRowProps) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  return (
    <PaneProvider
      totalPanesWidth={width}
      totalPanesHeight={height - 20}
      defaultColumnValues={{}}
      defaultRowValues={{
        'row-1': 1,
        'row-2': 1
      }}
    >
      {({ getGridTemplateColumns, getGridTemplateRows }: IPaneProviderReturnProps) => {
        return (
          <RowGrid
            columnContext={columnContext}
            resizeRef={ref}
            panes={panes}
            getGridTemplateColumns={getGridTemplateColumns}
            getGridTemplateRows={getGridTemplateRows}
          />
        );
      }}
    </PaneProvider>
  );
};

const ColumnGrid = ({
  resizeRef,
  columns,
  getGridTemplateRows,
  getGridTemplateColumns
}: IColumnGridProps &
  Pick<IPaneProviderReturnProps, 'getGridTemplateColumns' | 'getGridTemplateRows'>) => {
  const themeContext = useContext(ThemeContext);
  const splitterContext = useSplitterContext();

  return (
    <div
      ref={resizeRef}
      style={{
        direction: themeContext.rtl ? 'rtl' : 'ltr',
        display: 'grid',
        width: '100%',
        height: '90vh',
        gap: '10px',
        gridTemplateRows: getGridTemplateRows(),
        gridTemplateColumns: getGridTemplateColumns()
      }}
    >
      {columns.map(column => (
        <Pane key={column.name}>
          <Pane.Content>
            <Row panes={column.panes} columnContext={splitterContext} />
          </Pane.Content>
        </Pane>
      ))}
    </div>
  );
};

export const SplitterCardStory: Story<IArgs> = ({ columns }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  return (
    <PaneProvider
      totalPanesWidth={width - 20}
      totalPanesHeight={height}
      defaultColumnValues={{
        'column-1': 1,
        'column-2': 1,
        'column-3': 1
      }}
      defaultRowValues={{}}
    >
      {({ getGridTemplateColumns, getGridTemplateRows }: IPaneProviderReturnProps) => {
        return (
          <ColumnGrid
            resizeRef={ref}
            columns={columns}
            getGridTemplateColumns={getGridTemplateColumns}
            getGridTemplateRows={getGridTemplateRows}
          />
        );
      }}
    </PaneProvider>
  );
};
