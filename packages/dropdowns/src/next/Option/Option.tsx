/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { IOptionProps } from '../types';
import useListboxContext from '../context/useListboxContext';
import { StyledOption } from '../views/StyledOption';

/**
 * @extends LiHTMLAttributes<HTMLLIElement>
 */
export const Option = React.forwardRef<HTMLLIElement, IOptionProps>(
  ({ value, isDisabled, ...props }, ref) => {
    const { getOptionProps, values, activeValue } = useListboxContext();

    if (isDisabled) {
      return <StyledOption isDisabled {...props} aria-disabled ref={ref} />;
    } else if (value === undefined || value === null) {
      return <StyledOption {...props} ref={ref} />;
    }

    return (
      <StyledOption
        isActive={value === activeValue}
        {...props}
        {...getOptionProps({ item: value, index: values.indexOf(value) })}
        ref={ref}
      />
    );
  }
);

Option.displayName = 'Option';
