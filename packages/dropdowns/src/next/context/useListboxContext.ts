/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useContext, createContext } from 'react';
import { UseComboboxPropGetters } from 'downshift';
import { OptionValue } from '../types';

export interface IListboxContext {
  getOptionProps: UseComboboxPropGetters<OptionValue>['getItemProps'];
  values: OptionValue[];
  activeValue?: OptionValue;
}

export const ListboxContext = createContext<IListboxContext | undefined>(undefined);

const useListboxContext = () => {
  const listboxContext = useContext(ListboxContext);

  if (!listboxContext) {
    throw new Error('This component must be rendered within a listbox.');
  }

  return listboxContext;
};

export default useListboxContext;
