/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';

export const StyledPane = styled.div`
  display: grid;
  grid-template-columns: 0px 1fr 0px;
  grid-template-rows: 0px 1fr 0px;
  width: 100%;
  height: 100%;
`;

StyledPane.defaultProps = {
  theme: DEFAULT_THEME
}