/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useMemo } from 'react';
import { StyledHeader, StyledHeaderPaddle, StyledHeaderLabel } from '../../../styled';
import useDatepickerContext from '../utils/useDatepickerContext';

import ChevronLeftStrokeIcon from '@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg';
import ChevronRightStrokeIcon from '@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg';

interface IMonthSelectorProps {
  locale?: string;
  isCompact: boolean;
}

export const MonthSelector: React.FunctionComponent<IMonthSelectorProps> = ({
  locale,
  isCompact
}) => {
  const { state, dispatch, labels } = useDatepickerContext();

  const monthTitle = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric'
    });

    return formatter.format(state.previewDate);
  }, [locale, state.previewDate]);

  const { previewPreviousMonth, previewNextMonth } = {
    previewPreviousMonth: useCallback(() => {
      dispatch({
        type: 'PREVIEW_PREVIOUS_MONTH'
      });
    }, [dispatch]),
    previewNextMonth: useCallback(() => {
      dispatch({
        type: 'PREVIEW_NEXT_MONTH'
      });
    }, [dispatch])
  };

  return (
    <StyledHeader isCompact={isCompact}>
      <StyledHeaderPaddle
        isCompact={isCompact}
        aria-label={labels?.previousButton}
        onClick={previewPreviousMonth}
        data-test-id="previous-month"
      >
        <ChevronLeftStrokeIcon />
      </StyledHeaderPaddle>
      <StyledHeaderLabel
        isCompact={isCompact}
        data-test-id="month-display"
        aria-live="polite"
        aria-atomic="true"
      >
        {monthTitle}
      </StyledHeaderLabel>
      <StyledHeaderPaddle
        isCompact={isCompact}
        aria-label={labels?.nextButton}
        onClick={previewNextMonth}
        data-test-id="next-month"
      >
        <ChevronRightStrokeIcon />
      </StyledHeaderPaddle>
    </StyledHeader>
  );
};
