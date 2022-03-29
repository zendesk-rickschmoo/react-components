/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';
import styled from 'styled-components';

const COMPONENT_ID = 'splitter.separator';

export interface IStyledSeparatorProps {
  isHorizontal: boolean;
}

export const StyledSeparator = styled.div.attrs<IStyledSeparatorProps>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledSeparatorProps>`
  outline: none;
  border-style: none;
  background-color: ${props => getColor('gray', 300, props.theme)};
  width: ${props => (props.isHorizontal === false ? `${props.theme.space.base / 4}px` : '100%')};
  height: ${props => (props.isHorizontal ? `${props.theme.space.base / 4}px` : '100%')};
  margin: 0 auto;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledSeparator.defaultProps = {
  theme: DEFAULT_THEME
};
