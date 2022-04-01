/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

export { Col } from './elements/Col';
export { Grid } from './elements/Grid';
export { Row } from './elements/Row';

export { PaneProvider } from './elements/splitter/PaneProvider';
export { Pane } from './elements/splitter/Pane';
export { default as useSplitterContext, SplitterContext } from './utils/useSplitterContext';

export type { IColProps } from './elements/Col';
export type { IGridProps } from './elements/Grid';
export type { IRowProps } from './elements/Row';

export type { IPaneProvider, IPaneProviderReturnProps } from './elements/splitter/PaneProvider';
export type { ISplitterProps } from './elements/splitter/Splitter';
export type { ISplitterContext } from './utils/useSplitterContext';

export {
  ARRAY_ALIGN_ITEMS,
  ARRAY_ALIGN_SELF,
  ARRAY_DIRECTION,
  ARRAY_JUSTIFY_CONTENT,
  ARRAY_TEXT_ALIGN,
  ARRAY_SPACE,
  ARRAY_WRAP
} from './utils/types';

export type {
  ALIGN_ITEMS,
  ALIGN_SELF,
  DIRECTION,
  JUSTIFY_CONTENT,
  TEXT_ALIGN,
  GRID_NUMBER,
  BREAKPOINT,
  SPACE,
  WRAP
} from './utils/types';
