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
  ISplitterContext,
  Row as GridRow,
  Col
} from '@zendeskgarden/react-grid';
import { Field, Label, Input, InputGroup } from '@zendeskgarden/react-forms';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row as TableRow, Table } from '@zendeskgarden/react-tables';
import { Paragraph, SM, LG } from '@zendeskgarden/react-typography';
import { Button } from '@zendeskgarden/react-buttons';
import { ICardSplitterColumn } from './types';
import { VEGGIE_IPSUM } from '../../stories/data';

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
  columnIndex: number;
  columnContext: ISplitterContext;
  panes: ICardSplitterColumn['panes'];
}

interface IRowGridProps {
  columnIndex: number;
  columnContext: ISplitterContext;
  panes: ICardSplitterColumn['panes'];
  resizeRef: React.RefCallback<any>;
}

const FakeContent = ({ index }: { index: number }) => {
  switch(index % 4) {
    case 0:
      return (
        <>
        <GridRow justifyContent="start">
          <Col>
            <Field>
              <Label>Plant</Label>
              <Input />
            </Field>
          </Col>
        </GridRow>
        <GridRow justifyContent="start">
          <Col>
            <Field>
              <Label>Animal</Label>
              <Input />
            </Field>
          </Col>
        </GridRow>
        </>
      );
    case 1:
      return (
        <>
          <GridRow justifyContent="start">
            <Col>
              <Field>
                <Label>Plant</Label>
                <Input />
              </Field>
            </Col>
          </GridRow>
          <GridRow justifyContent="start">
            <Col>
              <SM>
                <Paragraph>{VEGGIE_IPSUM[0]}</Paragraph>
              </SM>
            </Col>
          </GridRow>
        </>
      );
    case 2:
      return (
        <GridRow justifyContent="start">
          <Col>
            <Field>
              <Label>Invoice number</Label>
              <InputGroup>
                <Input value="GDN10136H74NK-0011" readOnly />
                <Button focusInset isNeutral>
                  Copy
                </Button>
              </InputGroup>
            </Field>
          </Col>
        </GridRow>
      );
    case 3:
      return (
        <Table style={{ minWidth: 100 }}>
          <Head>
            <HeaderRow>
              <HeaderCell>Fruit</HeaderCell>
              <HeaderCell>Sun exposure</HeaderCell>
              <HeaderCell>Soil</HeaderCell>
            </HeaderRow>
          </Head>
          <Body>
            <TableRow>
              <Cell>Raspberries</Cell>
              <Cell>Partial shade</Cell>
              <Cell>Moist and slightly acidic</Cell>
            </TableRow>
            <TableRow>
              <Cell>Strawberries</Cell>
              <Cell>Full sun</Cell>
              <Cell>Medium moisture</Cell>
            </TableRow>
            <TableRow>
              <Cell>Grapes</Cell>
              <Cell>Full sun</Cell>
              <Cell>Rich and well draining</Cell>
            </TableRow>
            <TableRow>
              <Cell>Cherries</Cell>
              <Cell>Partial sun</Cell>
              <Cell>Rich and well draining</Cell>
            </TableRow>
            <TableRow>
              <Cell>Tomatoes</Cell>
              <Cell>Partial shade</Cell>
              <Cell>Well draining</Cell>
            </TableRow>
          </Body>
        </Table>
      );
    default:
      return null;
  }
};

const RowGrid = ({
  resizeRef,
  panes,
  getGridTemplateRows,
  getGridTemplateColumns,
  columnContext,
  columnIndex
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
      {panes.map((pane, index) => (
        <Pane key={pane.name}>
          <Pane.Content style={{ padding: '1em', overflow: 'auto' }}>
            <div style={{ height: 0 }}>
              <LG tag="h2">{pane.name}</LG>
              <FakeContent index={columnIndex + index + 1} />
            </div>
          </Pane.Content>
          {pane.splitters.map(({ hasParentContext, ...splitter }, splitterIndex) => {
            if (hasParentContext) {
              return (
                <Pane.Splitter
                  key={`${pane.name}-${splitter.layoutKey}-${splitterIndex}`}
                  splitterContext={columnContext}
                  {...splitter}
                />
              );
            }

            return <Pane.Splitter key={`${pane.name}-${splitter.layoutKey}-${splitterIndex}`} {...splitter} />;
          })}
        </Pane>
      ))}
    </div>
  );
};

const Row = ({ columnIndex, columnContext, panes }: IRowProps) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  return (
    <PaneProvider
      totalPanesWidth={width}
      totalPanesHeight={height - 20}
      defaultColumnValues={{}}
      defaultRowValues={{
        'row-1': 1,
        'row-2': 1,
        'row-3': 1
      }}
    >
      {({ getGridTemplateColumns, getGridTemplateRows }: IPaneProviderReturnProps) => {
        return (
          <RowGrid
            columnContext={columnContext}
            columnIndex={columnIndex}
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
      {columns.map((column, columnIndex) => (
        <Pane key={column.name}>
          <Pane.Content>
            <Row panes={column.panes} columnIndex={columnIndex} columnContext={splitterContext} />
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
