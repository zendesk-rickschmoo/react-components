/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';
import styled, { css, ThemeProps, DefaultTheme } from 'styled-components';
import { StyledSeparator } from './StyledSeparator';

const COMPONENT_ID = 'splitter.separator_container';

interface IStyledSeparatorContainerProps {
  isHorizontal: boolean;
}

const getOrientationStyles = ({
  isHorizontal,
  theme
}: IStyledSeparatorContainerProps & ThemeProps<DefaultTheme>) => {
  if (isHorizontal) {
    return css`
      align-items: center;
      cursor: row-resize;
      margin-top: -${theme.space.base}px;
    `;
  }

  return css`
    justify-content: center;
    cursor: col-resize;
    margin-left: -${theme.space.base}px;
  `;
};

export const StyledSeparatorContainer = styled.div.attrs<IStyledSeparatorContainerProps>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledSeparatorContainerProps>`
  display: flex;
  position: absolute;
  z-index: 999999;
  outline: none;
  width: ${props =>
    props.isHorizontal === false ? `${props.theme.space.base * 2 - 1}px` : '100%'};
  height: ${props => (props.isHorizontal ? `${props.theme.space.base * 2 - 1}px` : '100%')};
  ${getOrientationStyles}

  &:hover > ${StyledSeparator} {
    width: ${props => props.isHorizontal === false && `${props.theme.space.base / 2}px`};
    height: ${props => props.isHorizontal && `${props.theme.space.base / 2}px`};
    background-color: ${props => getColor('blue', 600, props.theme)};
  }

  &:active > ${StyledSeparator} {
    width: ${props => props.isHorizontal === false && `${props.theme.space.base / 2}px`};
    height: ${props => props.isHorizontal && `${props.theme.space.base / 2}px`};
    background-color: ${props => getColor('blue', 800, props.theme)};
  }

  &:focus > ${StyledSeparator} {
    box-shadow: 0 0 0 ${props => props.theme.space.base * 0.75}px
      ${props => getColor('blue', 600, props.theme, 0.35)};
    width: ${props => props.isHorizontal === false && `${props.theme.space.base / 2}px`};
    height: ${props => props.isHorizontal && `${props.theme.space.base / 2}px`};
    background-color: ${props => getColor('blue', 600, props.theme)};
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)}
`;

StyledSeparatorContainer.defaultProps = {
  theme: DEFAULT_THEME
};
