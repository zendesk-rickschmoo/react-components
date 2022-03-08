/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext, useEffect, HTMLProps, useCallback } from 'react';
import {
  useSplitter,
  SplitterOrientation,
  SplitterType,
  SplitterPosition,
  IUseSplitterProps
} from '@zendeskgarden/container-splitter';
import { SplitterContext } from '../../utils/useSplitterContext';
import { PaneContext } from '../../utils/usePaneContext';
import { ORIENTATION } from '../../utils/types';
import { getPx, getFr } from './PaneProvider';

import { StyledPaneItem } from '../../styled/splitter/StyledPaneItem';
import { StyledSeparatorContainer } from '../../styled/splitter/StyledSeparatorContainer';
import { StyledSeparator } from '../../styled/splitter/StyledSeparator';
export interface ISplitterProps extends HTMLProps<any> {
  layoutKey: string;
  min: number;
  max: number;
  orientation?: ORIENTATION;
  isLeading?: boolean;
  isTrailing?: boolean;
  rtl?: boolean;
  environment?: IUseSplitterProps['environment'];
  isFixed?: boolean;
}

const orientationToPosition = {
  start: SplitterPosition.TRAILS,
  end: SplitterPosition.TRAILS,
  top: SplitterPosition.LEADS,
  bottom: SplitterPosition.TRAILS
};

const paneToSplitterOrientation = {
  start: SplitterOrientation.VERTICAL,
  end: SplitterOrientation.VERTICAL,
  top: SplitterOrientation.HORIZONTAL,
  bottom: SplitterOrientation.HORIZONTAL
};

export const Splitter = ({
  layoutKey,
  min,
  max,
  orientation = "end",
  isFixed = false,
  rtl = false,
  environment = window,
  isLeading,
  isTrailing,
  ...props
}: ISplitterProps) => {
  const splitterContext = useContext(SplitterContext);
  const paneContext = useContext(PaneContext);
  let position;

  if (isLeading === true) {
    position = SplitterPosition.LEADS;
  } else if (isTrailing === true) {
    position = SplitterPosition.TRAILS;
  } else {
    position = orientationToPosition[orientation];
  }

  const splitterOrientation = paneToSplitterOrientation[orientation];

  const getPxForSplitter = useCallback((layoutValue: number) => {
    switch(splitterOrientation) {
      case SplitterOrientation.HORIZONTAL:
        return getPx(layoutValue, splitterContext.totalHeightFractions, splitterContext.totalPanesHeight);
      case SplitterOrientation.VERTICAL:
        return getPx(layoutValue, splitterContext.totalWidthFractions, splitterContext.totalPanesWidth);
      default:
        return 0;
    }
  }, [splitterContext, splitterOrientation]);

  const getFrForSplitter = useCallback((layoutValue: number) => {
    switch(splitterOrientation) {
      case SplitterOrientation.HORIZONTAL:
        return getFr(layoutValue, splitterContext.totalHeightFractions, splitterContext.totalPanesHeight);
      case SplitterOrientation.VERTICAL:
        return getFr(layoutValue, splitterContext.totalWidthFractions, splitterContext.totalPanesWidth);
      default:
        return 0;
    }
  }, [splitterContext, splitterOrientation]);

  const { getSeparatorProps, getPrimaryPaneProps } = useSplitter({
    type: isFixed ? SplitterType.FIXED : SplitterType.VARIABLE,
    orientation: splitterOrientation,
    position,
    min: getPxForSplitter(min),
    max: getPxForSplitter(max),
    rtl,
    onChange: valueNow => {
      splitterContext.setLayoutValue(layoutKey, getFrForSplitter(valueNow));
    },
    valueNow: getPxForSplitter(splitterContext.layoutState[layoutKey]),
    environment
  });

  useEffect(() => {
    if (!paneContext.id) {
      paneContext.setId(getPrimaryPaneProps().id);
    }
  }, [paneContext, getPrimaryPaneProps]);

  const isHorizontal = paneToSplitterOrientation[orientation] === SplitterOrientation.HORIZONTAL;

  const separatorProps = getSeparatorProps({
    'aria-controls': paneContext.id
  });

  return (
    <StyledPaneItem paneOrientation={orientation}>
      <StyledSeparatorContainer isHorizontal={isHorizontal} {...separatorProps} {...props}>
        <StyledSeparator isHorizontal={isHorizontal} />
      </StyledSeparatorContainer>
    </StyledPaneItem>
  );
};
