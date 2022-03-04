/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext, useEffect, HTMLProps } from 'react';
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

import { StyledPaneItem } from '../../styled/splitter/StyledPaneItem';
import { StyledSeparatorContainer } from '../../styled/splitter/StyledSeparatorContainer';
import { StyledSeparator } from '../../styled/splitter/StyledSeparator';
export interface ISplitterProps extends HTMLProps<any> {
  layoutKey: string;
  min: number;
  max: number;
  orientation: ORIENTATION;
  rtl?: boolean;
  environment?: IUseSplitterProps['environment'];
  isFixed?: boolean;
}

const orientationToPosition = {
  start: SplitterPosition.LEADS,
  end: SplitterPosition.TRAILS,
  top: SplitterPosition.LEADS,
  bottom: SplitterPosition.TRAILS
};

const gridOrientationToOrientation = {
  start: SplitterOrientation.VERTICAL,
  end: SplitterOrientation.VERTICAL,
  top: SplitterOrientation.HORIZONTAL,
  bottom: SplitterOrientation.HORIZONTAL
};

export const Splitter = ({
  layoutKey,
  min,
  max,
  orientation,
  isFixed = false,
  rtl = false,
  environment = window,
  ...props
}: ISplitterProps) => {
  const splitterContext = useContext(SplitterContext);
  const paneContext = useContext(PaneContext);

  const { getSeparatorProps, getPrimaryPaneProps } = useSplitter({
    type: isFixed ? SplitterType.FIXED : SplitterType.VARIABLE,
    orientation: gridOrientationToOrientation[orientation],
    position: orientationToPosition[orientation],
    min,
    max,
    rtl,
    onChange: valueNow => {
      splitterContext.setLayoutValue(layoutKey, valueNow);
    },
    valueNow: splitterContext.layoutState[layoutKey],
    environment
  });

  useEffect(() => {
    if (!paneContext.id) {
      paneContext.setId(getPrimaryPaneProps().id);
    }
  }, [paneContext, getPrimaryPaneProps]);

  const isHorizontal = gridOrientationToOrientation[orientation] === SplitterOrientation.HORIZONTAL;

  const separatorProps = getSeparatorProps({
    'aria-controls': paneContext.id
  });

  return (
    <StyledPaneItem gridOrientation={orientation}>
      <StyledSeparatorContainer isHorizontal={isHorizontal} {...separatorProps} {...props}>
        <StyledSeparator isHorizontal={isHorizontal} />
      </StyledSeparatorContainer>
    </StyledPaneItem>
  );
};
