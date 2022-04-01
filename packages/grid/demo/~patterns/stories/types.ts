/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { ISplitterProps } from '@zendeskgarden/react-grid';

interface ICardSplitterProps extends ISplitterProps {
  hasParentContext: boolean;
}

interface ICardSplitterPane {
  name: string;
  splitters: ICardSplitterProps[];
}

export interface ICardSplitterColumn {
  name: string;
  panes: ICardSplitterPane[];
}
