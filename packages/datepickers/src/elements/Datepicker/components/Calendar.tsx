/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { forwardRef, HTMLAttributes, useCallback, useRef } from 'react';
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import getDate from 'date-fns/getDate';

import {
  StyledDatepicker,
  StyledCalendar,
  StyledCalendarItem,
  StyledDayLabel,
  StyledDay
} from '../../../styled';
import useDatepickerContext from '../utils/useDatepickerContext';
import { getStartOfWeek } from '../../../utils/calendar-utils';
import { MonthSelector } from './MonthSelector';

export interface ICalendarProps extends HTMLAttributes<HTMLDivElement> {
  value?: Date;
  minValue?: Date;
  maxValue?: Date;
  isCompact?: boolean;
  locale?: string;
}

export const Calendar = forwardRef<HTMLDivElement, ICalendarProps>(
  ({ value, minValue, maxValue, isCompact, locale }, ref) => {
    const { state, dispatch } = useDatepickerContext();

    const weekStartsOn = getStartOfWeek(locale);
    const monthStartDate = startOfMonth(state.previewDate);
    const monthEndDate = endOfMonth(monthStartDate);
    const startDate = startOfWeek(monthStartDate, {
      weekStartsOn
    });
    const endDate = endOfWeek(monthEndDate, {
      weekStartsOn
    });

    const dayLabelFormatter = useCallback(
      (date, full = false) => {
        const formatter = new Intl.DateTimeFormat(locale, {
          weekday: full ? 'long' : 'short'
        });

        return formatter.format(date);
      },
      [locale]
    );

    const dayLabels = eachDayOfInterval({ start: startDate, end: addDays(startDate, 6) }).map(
      date => {
        const formattedDayLabel = dayLabelFormatter(date);

        return (
          <StyledCalendarItem key={`day-label-${formattedDayLabel}`} isCompact={isCompact}>
            <StyledDayLabel isCompact={isCompact!}>{formattedDayLabel}</StyledDayLabel>
          </StyledCalendarItem>
        );
      }
    );

    const transitDateRef = useRef<Date | null>();
    const datesInterval = eachDayOfInterval({ start: startDate, end: endDate });
    const { selected: containsSelected, today: containsToday } = datesInterval
      .map(date => ({ selected: value && isSameDay(date, value), today: isToday(date) }))
      .filter(({ selected: s, today: t }) => s || t)
      .reduce((map, next) => ({ ...map, ...next }), {}) as { selected: boolean; today: boolean };
    const items = datesInterval.map((date, itemsIndex) => {
      const formattedDateLabel = getDate(date);
      const isCurrentDate = isToday(date);
      const isPreviousMonth = !isSameMonth(date, state.previewDate);
      const isSelected = value && isSameDay(date, value);

      let tabIndex = -1;

      if (
        isSelected ||
        (!containsSelected && isCurrentDate) ||
        (!containsSelected && !containsToday && isSameDay(date, monthStartDate))
      ) {
        tabIndex = 0;
      }

      let isDisabled = false;

      if (minValue !== undefined) {
        isDisabled = isBefore(date, minValue) && !isSameDay(date, minValue);
      }

      if (maxValue !== undefined) {
        isDisabled = isDisabled || (isAfter(date, maxValue) && !isSameDay(date, maxValue));
      }

      return (
        <StyledCalendarItem key={`day-${itemsIndex}`} isCompact={isCompact}>
          <StyledDay
            isToday={isCurrentDate}
            isPreviousMonth={isPreviousMonth}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isCompact={isCompact!}
            data-test-id="day"
            data-test-previous={isPreviousMonth}
            data-test-selected={isSelected}
            data-test-disabled={isDisabled}
            data-test-today={isCurrentDate}
            data-date={date}
            aria-pressed={isSelected}
            aria-label={[dayLabelFormatter(date, true), formattedDateLabel].join(' ')}
            tabIndex={tabIndex}
            onClick={() => {
              if (!isDisabled) {
                dispatch({ type: 'SELECT_DATE', value: date });
              }
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
              let nextDate = null;

              switch (e.keyCode) {
                case KEY_CODES.SPACE:
                case KEY_CODES.ENTER:
                  dispatch({ type: 'SELECT_DATE', value: date });
                  break;
                case KEY_CODES.ESCAPE:
                  (e.target as HTMLButtonElement).blur();
                  break;
                case KEY_CODES.UP:
                  nextDate = addDays(date, -7);
                  break;
                case KEY_CODES.DOWN:
                  nextDate = addDays(date, 7);
                  break;
                case KEY_CODES.LEFT:
                  nextDate = addDays(date, -1);
                  break;
                case KEY_CODES.RIGHT:
                  nextDate = addDays(date, 1);
                  break;
              }

              if (nextDate) {
                const dateNode = document.querySelector(
                  `[data-date="${nextDate}"]`
                ) as HTMLButtonElement;

                dateNode?.focus();

                if (!dateNode) {
                  if (isBefore(date, nextDate)) {
                    dispatch({
                      type: 'PREVIEW_NEXT_MONTH'
                    });
                  } else if (isAfter(date, nextDate)) {
                    dispatch({
                      type: 'PREVIEW_PREVIOUS_MONTH'
                    });
                  }

                  transitDateRef.current = nextDate;
                }
              }
            }}
            ref={
              // when the preview date changes to another month using the keyboard,
              // we need a way to select the next element node and focus on it
              transitDateRef.current && isSameDay(transitDateRef.current, date)
                ? (node: HTMLButtonElement) => {
                    node?.focus();
                    transitDateRef.current = null;
                  }
                : null
            }
          >
            {formattedDateLabel}
          </StyledDay>
        </StyledCalendarItem>
      );
    });

    return (
      <StyledDatepicker
        ref={ref}
        isCompact={isCompact!}
        data-test-id="calendar-wrapper"
        onMouseDown={e => {
          /** Stop focus from escaping input */
          e.preventDefault();
        }}
      >
        <MonthSelector locale={locale} isCompact={isCompact!} />
        <StyledCalendar isCompact={isCompact!}>
          {dayLabels}
          {items}
        </StyledCalendar>
      </StyledDatepicker>
    );
  }
);

Calendar.displayName = 'Calendar';
