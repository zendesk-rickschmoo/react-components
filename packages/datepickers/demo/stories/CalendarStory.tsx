/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useMemo, useReducer } from 'react';
import { Story } from '@storybook/react';
import { IDatepickerProps } from '@zendeskgarden/react-datepickers';
import { Calendar } from '../../src/elements/Datepicker/components/Calendar';
import {
  datepickerReducer,
  retrieveInitialState
} from '../../src/elements/Datepicker/utils/datepicker-reducer';
import { DATE_STYLE } from './types';
import { DatepickerContext } from '../../src/elements/Datepicker/utils/useDatepickerContext';

interface IArgs extends IDatepickerProps {
  dateStyle: DATE_STYLE;
}

const labels = {
  previousButton: 'previous month',
  nextButton: 'next month'
};

export const CalendarStory: Story<IArgs> = props => {
  const { dateStyle, value, locale, onChange, customParseDate, minValue, maxValue, isCompact } =
    props;
  const formatDate = useCallback(
    (date: Date) => new Intl.DateTimeFormat(locale, { dateStyle }).format(date),
    [locale, dateStyle]
  );
  const memoizedReducer = useMemo(
    () => datepickerReducer({ value, formatDate, locale, onChange, customParseDate }),
    [value, formatDate, locale, onChange, customParseDate]
  );
  const [state, dispatch] = useReducer(memoizedReducer, retrieveInitialState(props));

  return (
    <DatepickerContext.Provider
      value={useMemo(() => ({ state, dispatch, labels }), [state, dispatch])}
    >
      <Calendar
        value={value}
        locale={locale}
        minValue={minValue}
        maxValue={maxValue}
        isCompact={isCompact}
      />
    </DatepickerContext.Provider>
  );
};
