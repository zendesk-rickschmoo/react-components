/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { HTMLAttributes, LiHTMLAttributes } from 'react';

export interface IComboboxProps extends HTMLAttributes<HTMLDivElement> {
  /** Determines if this combobox behaves as an autocomplete */
  isAutocomplete?: boolean;
  isMultiselect?: boolean;
}

export interface IOptionProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Sets the value that is returned upon selection */
  value?: string;
  /** Sets the text label of the option (defaults to `value`) */
  label?: string;
  /** Indicates that the element is not interactive */
  isDisabled?: boolean;
  /** Applies danger styling */
  isDanger?: boolean;
}

export type OptionValue = NonNullable<IOptionProps['value']>;

export interface IOptGroupProps extends LiHTMLAttributes<HTMLLIElement> {
  label?: string;
}
