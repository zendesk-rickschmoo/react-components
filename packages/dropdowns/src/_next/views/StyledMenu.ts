/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import {
  DEFAULT_THEME,
  menuStyles,
  MENU_POSITION as MenuPosition
} from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'dropdowns.menu';

interface IStyledMenuProps {
  position: MenuPosition;
  isHidden: boolean;
}

export const StyledMenu = styled.div.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<IStyledMenuProps>`
  ${props =>
    menuStyles(props.position, {
      theme: props.theme,
      hidden: props.isHidden,
      childSelector: '> ul',
      animationModifier: '[data-garden-animate="true"]'
    })};
`;

StyledMenu.defaultProps = {
  theme: DEFAULT_THEME
};
