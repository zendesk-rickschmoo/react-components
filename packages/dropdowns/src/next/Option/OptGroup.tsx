/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef } from 'react';
import { useText } from '@zendeskgarden/react-theming';
import { IOptGroupProps } from '../types';
import { StyledOptGroup } from '../views/StyledOptGroup';

/**
 * @extends LiHTMLAttributes<HTMLLIElement>
 */
export const OptGroup = forwardRef<HTMLLIElement, IOptGroupProps>(({ children, ...props }, ref) => {
  /* This useText logic ensures that the group has a valid `aria-label`, either
   * specified directly or provided by the `label` prop. */
  const name = props.label && !props['aria-label'] ? 'label' : 'aria-label';
  const ariaLabel = useText(OptGroup, props, name, props.label ? '' : 'group');

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { label, 'aria-label': _, ...other } = props;

  return (
    <StyledOptGroup
      role="none"
      hasLabel={label !== undefined && label !== null}
      {...other}
      ref={ref}
    >
      {label}
      <hr />
      <ul aria-label={ariaLabel} role="group">
        {children}
      </ul>
    </StyledOptGroup>
  );
});

OptGroup.displayName = 'OptGroup';
