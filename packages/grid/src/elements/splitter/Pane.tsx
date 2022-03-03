/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { StyledPane } from '../../styled/splitter/StyledPane';

export interface IPane {
  children?: any;
}

export const Pane = ({ children }: IPane) => {
  return <StyledPane>{children}</StyledPane>;
};
