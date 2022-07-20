/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, MouseEventHandler, useMemo, useState } from 'react';
import { useCombobox } from 'downshift';
import { useFloating } from '@floating-ui/react-dom';
import mergeRefs from 'react-merge-refs';
import { MediaInput } from '@zendeskgarden/react-forms';
import { IComboboxProps } from '../../types/next';

const ITEMS = [
  'Asparagus',
  'Brussel sprouts',
  'Cauliflower',
  'Garlic',
  'Jerusalem artichoke',
  'Kale',
  'Lettuce',
  'Onion',
  'Mushroom',
  'Potato',
  'Radish',
  'Spinach',
  'Tomato',
  'Yam',
  'Zucchini'
];

/**
 * @extends HTMLAttributes<HTMLDivElement>
 */
export const Combobox = forwardRef<HTMLDivElement, IComboboxProps>(
  ({ isAutocomplete, ...props }, ref) => {
    const [items, setItems] = useState(ITEMS);

    const {
      getLabelProps,
      getComboboxProps,
      getInputProps,
      getToggleButtonProps,
      getMenuProps,
      getItemProps,
      isOpen,
      highlightedIndex
    } = useCombobox({
      items
      // onInputValueChange: ({ inputValue }) => {
      //   if (inputValue && inputValue.length > 0) {
      //     const valueRegexp = new RegExp(inputValue, 'gui');

      //     setItems(ITEMS.filter(item => item.match(valueRegexp)) || []);
      //   } else {
      //     setItems(ITEMS);
      //   }
      // }
    });

    const {
      reference: floatingInputRef,
      floating: floatingMenuRef,
      x,
      y
    } = useFloating({ placement: 'bottom-start' });

    let handleClick: MouseEventHandler | undefined = undefined;

    if (isAutocomplete && !isOpen) {
      const { onClick: onToggleButtonClick } = getToggleButtonProps();

      handleClick = onToggleButtonClick;
    }

    const { ref: downshiftComboboxRef, ...comboboxProps } = getComboboxProps({
      onClick: handleClick
    });
    const { ref: downshiftInputRef, ...inputProps } = getInputProps(comboboxProps); // https://github.com/downshift-js/downshift/issues/1239
    const { ref: downshiftMenuRef, ...menuProps } = getMenuProps();

    // https://floating-ui.com/docs/react-dom#stable-ref-props
    const inputRef = useMemo(
      () => mergeRefs([floatingInputRef, downshiftInputRef]),
      [floatingInputRef /* eslint-disable-line react-hooks/exhaustive-deps */]
    );
    const menuRef = useMemo(
      () => mergeRefs([floatingMenuRef, downshiftMenuRef]),
      [floatingMenuRef /* eslint-disable-line react-hooks/exhaustive-deps */]
    );
    const menuStyle = {
      position: 'absolute',
      top: y ?? 0,
      left: x ?? 0
    };

    /* eslint-disable jsx-a11y/label-has-associated-control */
    return (
      <div {...props} ref={mergeRefs([downshiftComboboxRef, ref])}>
        <label {...getLabelProps()}>Combobox</label>
        <MediaInput {...inputProps} ref={downshiftInputRef} wrapperRef={floatingInputRef} />
        {/* <input {...inputProps} ref={inputRef} /> */}
        <ul {...menuProps} ref={menuRef} style={menuStyle}>
          {isOpen &&
            items.map((item, index) => (
              <li
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
