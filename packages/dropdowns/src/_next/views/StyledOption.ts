/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { css, ThemeProps, DefaultTheme } from 'styled-components';
import { rgba } from 'polished';
import { DEFAULT_THEME, getColor, retrieveComponentStyles } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'dropdowns.option';

export interface IStyledOptionProps {
  isActive?: boolean;
  isCompact?: boolean;
  isDanger?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
}

const getColorStyles = (props: IStyledOptionProps & ThemeProps<DefaultTheme>) => {
  let foregroundColor;
  let backgroundColor;

  if (props.isDisabled) {
    foregroundColor = getColor('neutralHue', 400, props.theme);
  } else if (props.isDanger) {
    foregroundColor = getColor('dangerHue', 600, props.theme);
    backgroundColor = rgba(foregroundColor!, 0.08);
  } else {
    foregroundColor = props.theme.colors.foreground;
    backgroundColor = getColor('primaryHue', 600, props.theme, 0.08);
  }

  return css`
    background-color: ${props.isActive && backgroundColor};
    color: ${foregroundColor};
  `;
};

const getSizeStyles = (props: IStyledOptionProps & ThemeProps<DefaultTheme>) => {
  const paddingVertical = props.theme.space.base * (props.isCompact ? 1 : 2);

  return css`
    padding: ${paddingVertical}px ${props.theme.space.base * 9}px;
  `;
};

export const StyledOption = styled.li.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledOptionProps>`
  display: block;
  cursor: ${props => (props.isDisabled ? 'default' : 'pointer')};
  text-decoration: none;
  word-wrap: break-word;
  user-select: none;

  ${getSizeStyles};
  ${getColorStyles};

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledOption.defaultProps = {
  theme: DEFAULT_THEME
};
