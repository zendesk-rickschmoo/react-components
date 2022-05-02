/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { ThemeProps, DefaultTheme, css } from 'styled-components';
import { retrieveComponentStyles, getColor, DEFAULT_THEME } from '@zendeskgarden/react-theming';

const retrieveSizing = ({
  isCompact,
  theme
}: { isCompact?: boolean } & ThemeProps<DefaultTheme>) => {
  let size = theme.space.base * 10;

  if (isCompact) {
    size = theme.space.base * 8;
  }

  return css`
    width: ${size}px;
    height: ${size}px;
  `;
};

const retrieveColor = ({ theme }: ThemeProps<DefaultTheme>) => {
  return css`
    background-color: ${theme.colors.background};
    color: ${getColor('neutralHue', 600, theme)};

    :hover {
      background-color: ${getColor('primaryHue', 600, theme, 0.08)};
      color: ${theme.colors.foreground};
    }

    &[data-garden-focus-visible],
    :focus,
    :active {
      box-shadow: ${theme.shadows.md(getColor('primaryHue', 600, theme, 0.35) as string)};
    }

    :active {
      transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
      background-color: ${getColor('primaryHue', 600, theme, 0.2)};
      color: ${theme.colors.foreground};
    }
  `;
};

const COMPONENT_ID = 'datepickers.header_paddle';

export const StyledHeaderPaddle = styled.button.attrs({
  'data-garden-id': COMPONENT_ID,
  type: 'button',
  tabIndex: 0
})<{
  isCompact: boolean;
  isHidden?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${props => props.theme.rtl && 'rotate(180deg)'};
  transition:
    box-shadow 0.1s ease-in-out,
    background-color 0.25s ease-in-out,
    color 0.25s ease-in-out;
  visibility: ${props => props.isHidden && 'hidden'};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  text-decoration: none;
  font-size: 0;
  user-select: none;

  ${/* sc-block */ retrieveSizing}

  ${retrieveColor}

  &::-moz-focus-inner {
    border: 0;
  }

  &:focus {
    outline: none;
  }

  svg {
    width: ${props => `${props.theme.iconSizes.md}`};
    height: ${props => `${props.theme.iconSizes.md}`};
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledHeaderPaddle.defaultProps = {
  theme: DEFAULT_THEME
};
