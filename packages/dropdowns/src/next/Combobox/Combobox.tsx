/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCombobox } from 'downshift';
import { autoUpdate, flip, offset, size, useFloating } from '@floating-ui/react-dom';
import mergeRefs from 'react-merge-refs';
import { composeEventHandlers } from '@zendeskgarden/container-utilities';
import {
  DEFAULT_THEME,
  menuStyles,
  MENU_POSITION as MenuPosition
} from '@zendeskgarden/react-theming';
import { MediaInput } from '@zendeskgarden/react-forms';
import { IComboboxProps } from '../../types/next';
import { StyledItem } from '../../styled';

const StyledMenu = styled.div<{ position: MenuPosition; isHidden: boolean }>`
  ${props =>
    menuStyles(props.position, {
      theme: props.theme,
      hidden: props.isHidden,
      childSelector: 'ul',
      animationModifier: '[data-garden-animate="true"]'
    })};

  & > ul {
    overflow-y: scroll;
  }
`;

StyledMenu.defaultProps = {
  theme: DEFAULT_THEME
};

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
  ({ isAutocomplete, onBlur, onClick, ...props }, ref) => {
    const [items] = useState(ITEMS);
    const [openChangeType, setOpenChangeType] = useState<string>();

    const {
      getComboboxProps,
      getToggleButtonProps,
      getInputProps,
      getMenuProps,
      getItemProps,
      isOpen,
      highlightedIndex
    } = useCombobox({
      items,
      onIsOpenChange: ({ type }) => setOpenChangeType(type)
    });

    const handleBlur = () => isAutocomplete && setOpenChangeType(undefined);

    const handleClick = useCallback(
      event => {
        if (isAutocomplete) {
          // Downshift does not expect a dropdown like Garden's autocomplete
          // where the wrapping div functions like an open/close button. Finesse
          // state so that default close-on-blur functionality is not undone by
          // the toggle of the "button".
          const { onClick: onToggleButtonClick } = getToggleButtonProps();

          if (openChangeType === useCombobox.stateChangeTypes.InputBlur) {
            // In the case of close-on-blur set state that indicates the
            // "button" was clicked, but don't actually perform the action since
            // the menu is already closed.
            setOpenChangeType(useCombobox.stateChangeTypes.ToggleButtonClick);
          } else {
            onToggleButtonClick(event);
          }
        }
      },
      [isAutocomplete, getToggleButtonProps, openChangeType]
    );

    const { ref: downshiftComboboxRef, ...comboboxProps } = getComboboxProps();
    const { ref: downshiftInputRef, ...inputProps } = getInputProps({
      'aria-autocomplete': isAutocomplete ? 'list' : 'none',
      onClick: event => isAutocomplete && isOpen && event.stopPropagation(),
      ...comboboxProps // https://github.com/downshift-js/downshift/issues/1239
    });

    const {
      reference: floatingInputRef,
      floating: floatingMenuRef,
      placement,
      x,
      y
    } = useFloating({
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip(),
        size({
          apply: ({ elements, rects }) => {
            elements.floating.style.width = `${rects.reference.width}px`;
          }
        })
      ]
    });

    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isOpen) {
        setIsHidden(false);
      } else {
        timeout = setTimeout(() => setIsHidden(true), 200 /* match menu opacity transition */);
      }

      return () => clearTimeout(timeout);
    }, [isOpen]);

    return (
      <>
        <MediaInput
          {...inputProps}
          ref={mergeRefs([downshiftInputRef, downshiftComboboxRef])}
          wrapperRef={mergeRefs([floatingInputRef, ref])}
          wrapperProps={{
            onBlur: composeEventHandlers(handleBlur, onBlur),
            onClick: composeEventHandlers(handleClick, onClick),
            ...props
          }}
          select={isAutocomplete && (isOpen ? 'open' : 'close')}
        />
        <StyledMenu
          position={placement === 'bottom-start' ? 'bottom' : 'top'}
          isHidden={!isOpen}
          data-garden-animate={isHidden ? 'false' : 'true'}
          style={{ top: y ?? 0, left: x ?? 0 }}
          ref={floatingMenuRef}
        >
          <ul {...getMenuProps()}>
            {!isHidden &&
              items.map((item, index) => (
                <StyledItem
                  key={`${item}${index}`}
                  isFocused={highlightedIndex === index}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </StyledItem>
              ))}
          </ul>
        </StyledMenu>
      </>
    );
  }
);

Combobox.displayName = 'Combobox';
