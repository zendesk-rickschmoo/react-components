/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLAttributes } from 'react';
import { IUseSplitterProps } from '@zendeskgarden/container-splitter';

export type ALIGN_ITEMS = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export const ARRAY_ALIGN_ITEMS: ALIGN_ITEMS[] = ['start', 'end', 'center', 'baseline', 'stretch'];

export type ALIGN_SELF = 'auto' | ALIGN_ITEMS;
export const ARRAY_ALIGN_SELF: ALIGN_SELF[] = [
  'auto',
  'start',
  'end',
  'center',
  'baseline',
  'stretch'
];

export type DIRECTION = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export const ARRAY_DIRECTION: DIRECTION[] = ['row', 'row-reverse', 'column', 'column-reverse'];

export type JUSTIFY_CONTENT = 'start' | 'end' | 'center' | 'between' | 'around';
export const ARRAY_JUSTIFY_CONTENT: JUSTIFY_CONTENT[] = [
  'start',
  'end',
  'center',
  'between',
  'around'
];

export type TEXT_ALIGN = 'start' | 'end' | 'center' | 'justify';
export const ARRAY_TEXT_ALIGN: TEXT_ALIGN[] = ['start', 'end', 'center', 'justify'];

export type GRID_NUMBER = number | string;
export type BREAKPOINT = GRID_NUMBER | boolean;

export type SPACE = false | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export const ARRAY_SPACE: SPACE[] = [false, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export type WRAP = 'nowrap' | 'wrap' | 'wrap-reverse';
export const ARRAY_WRAP: WRAP[] = ['nowrap', 'wrap', 'wrap-reverse'];

export const ARRAY_ORIENTATION = ['top', 'bottom', 'start', 'end'] as const;
export type ORIENTATION = typeof ARRAY_ORIENTATION[number];
export type DIMENSIONS = 'rows' | 'columns';
export type UNITS = 'px' | 'fr';

export interface IPaneProviderReturnProps {
  /** Gets layout value by dimension and key. Accepts optional units. 
   * 
   * @param {DIMENSIONS} "row" or "column" dimension
   * @param {string} Sets the splitter key to get a layout value for
   * @param {UNITS} [units] Specifies the dimension unit for the return value
   * 
   */
  getLayoutValue: (dimension: DIMENSIONS, key: string, units?: UNITS) => number;
  /** Gets grid template rows track. Accepts optional units. 
   * 
   * @param {UNITS} [units] Specifies the dimension unit for the return value
   * 
   */
  getGridTemplateRows: (units?: UNITS) => string;
  /** Gets grid template columns track. Accepts optional units. 
   * 
   * @param {UNITS} [units] Specifies the dimension unit for the return value
   * 
   */
  getGridTemplateColumns: (units?: UNITS) => string;
}

export interface IPaneProvider {
  /** Provides the total width, in px units, of all panes in the layout */
  totalPanesWidth: number;
  /** Provides the total height, in px units, of all panes in the layout */
  totalPanesHeight: number;
  /** Defines default row values, in fr units, for an uncontrolled layout. The values are keyed by splitter. */
  defaultRowValues?: Record<string, number>;
  /** Defines default column values, in fr units, for an uncontrolled layout. The values are keyed by splitter. */
  defaultColumnValues?: Record<string, number>;
  /** Defines row values, in fr units, for a controlled layout. The values are keyed by splitter. */
  rowValues?: Record<string, number>;
  /** Defines column values, in fr units, for a controlled layout. The values are keyed by splitter. */
  columnValues?: Record<string, number>;
  /** 
   * Handles splitter position changes 
   * 
   * @param {Record<string, number>} The updated row values
   * @param {Record<string, number>} The updated column values
   */
  onChange?: (rowValues: Record<string, number>, columnValues: Record<string, number>) => void;
  children?: ({
    getLayoutValue,
    getGridTemplateColumns,
    getGridTemplateRows
  }: IPaneProviderReturnProps) => any;
}

export interface ISplitterContext {
  rowState: Record<string, number>;
  columnState: Record<string, number>;
  setRowValue: (isTop: boolean, id: string, value: number) => void;
  setColumnValue: (isStart: boolean, id: string, value: number) => void;
  getLayoutValue: (dimension: DIMENSIONS, id: string, units?: UNITS) => number;
  totalPanesHeight: number;
  totalPanesWidth: number;
  pixelsPerFr: { rows: number; columns: number };
}

export interface ISplitterProps extends HTMLAttributes<HTMLDivElement> {
  /** Specifies the splitter key */
  layoutKey: string;
  /** Sets a minimum, in fr units, for splitter position */
  min: number;
  /** Sets a maximum, in fr units, for splitter position */
  max: number;
  /** Determines splitter orientation within a pane */
  orientation?: ORIENTATION;
  /** Specifies whether splitter leads the primary pane */
  isLeading?: boolean;
  /** Specifies whether splitter trails the primary pane */
  isTrailing?: boolean;
  /** A browser window environment to attach events to */
  environment?: IUseSplitterProps['environment'];
  /** Specifies whether a separator behaves in fixed or variable mode */
  isFixed?: boolean;
}
