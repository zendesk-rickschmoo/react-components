/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { ICardSplitterColumn } from './types';

export const CARD_SPLITTER_COLUMNS: ICardSplitterColumn[] = [
  {
    name: 'Column 1',
    panes: [
      {
        name: 'Pane 1',
        splitters: [
          {
            hasParentContext: false,
            layoutKey: 'row-1',
            orientation: 'bottom',
            min: 0,
            max: 2
          },
          {
            hasParentContext: true,
            layoutKey: 'column-1',
            orientation: 'end',
            isTrailing: true,
            min: 0,
            max: 2
          }
        ]
      },
      {
        name: 'Pane 2',
        splitters: [
          {
            hasParentContext: true,
            layoutKey: 'column-1',
            orientation: 'end',
            min: 0,
            max: 2
          },
          {
            hasParentContext: false,
            layoutKey: 'row-2',
            orientation: 'top',
            min: 0,
            max: 2
          }
        ]
      }
    ]
  },
  {
    name: 'Column 2',
    panes: [
      {
        name: 'Pane 3',
        splitters: [
          {
            hasParentContext: true,
            layoutKey: 'column-2',
            orientation: 'start',
            isLeading: true,
            min: 0,
            max: 2
          },
          {
            hasParentContext: false,
            layoutKey: 'row-1',
            orientation: 'bottom',
            min: 0,
            max: 2
          },
          {
            hasParentContext: true,
            layoutKey: 'column-2',
            orientation: 'end',
            min: 0,
            max: 2
          }
        ]
      },
      {
        name: 'Pane 4',
        splitters: [
          {
            hasParentContext: false,
            layoutKey: 'row-2',
            orientation: 'top',
            min: 0,
            max: 2
          },
          {
            hasParentContext: true,
            layoutKey: 'column-2',
            orientation: 'start',
            isLeading: true,
            min: 0,
            max: 2
          },
          {
            hasParentContext: true,
            layoutKey: 'column-2',
            orientation: 'end',
            min: 0,
            max: 2
          }
        ]
      }
    ]
  },
  {
    name: 'Column 3',
    panes: [
      {
        name: 'Pane 5',
        splitters: [
          {
            hasParentContext: false,
            layoutKey: 'row-1',
            orientation: 'bottom',
            min: 0,
            max: 2
          },
          {
            hasParentContext: true,
            layoutKey: 'column-3',
            orientation: 'start',
            isLeading: true,
            min: 0,
            max: 2
          }
        ]
      },
      {
        name: 'Pane 6',
        splitters: [
          {
            hasParentContext: false,
            layoutKey: 'row-2',
            orientation: 'top',
            isLeading: true,
            min: 0,
            max: 2
          },
          {
            hasParentContext: true,
            layoutKey: 'column-3',
            orientation: 'start',
            isLeading: true,
            min: 0,
            max: 2
          }
        ]
      }
    ]
  }
];
