/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { css, DefaultTheme, ThemeProps } from 'styled-components';
import { DEFAULT_THEME, getColor, retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { StyledOption } from './StyledOption';

interface IStyledOptGroupProps {
  hasLabel: boolean;
}

const COMPONENT_ID = 'dropdowns.optgroup';

const getSizeStyles = (props: IStyledOptGroupProps & ThemeProps<DefaultTheme>) => {
  const paddingHorizontal = props.theme.space.base * 3;
  const hrMargin = `${
    props.hasLabel ? paddingHorizontal : props.theme.space.base
  }px -${paddingHorizontal}px ${props.theme.space.base}px`;

  return css`
    padding: ${props.hasLabel ? props.theme.space.base * 2 : 0}px ${paddingHorizontal}px 0;

    & > hr {
      margin: ${hrMargin};
      border: none;
      height: ${props.theme.borderWidths.sm};
    }

    & > ul {
      margin: 0 -${paddingHorizontal}px;
      padding: 0;
    }
  `;
};

export const StyledOptGroup = styled(StyledOption).attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledOptGroupProps>`
  cursor: default;
  font-weight: ${props => props.theme.fontWeights.semibold};

  ${getSizeStyles};

  & > hr {
    background-color: ${props => getColor('neutralHue', 200, props.theme)};
  }

  & > ul {
    font-weight: ${props => props.theme.fontWeights.regular};
  }

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledOptGroup.defaultProps = {
  theme: DEFAULT_THEME
};
