/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

 import React from 'react';
 import { Story } from '@storybook/react';
 import {
  PaneProvider,
  Pane,
} from '@zendeskgarden/react-grid';
 
 // eslint-disable-next-line @typescript-eslint/no-empty-interface
 interface IArgs {
 }
 
 // eslint-disable-next-line no-empty-pattern
 export const SplitterStory: Story<IArgs> = ({}) => (
   <PaneProvider>{({ layoutValues }) => <Pane />}</PaneProvider>
 );
 