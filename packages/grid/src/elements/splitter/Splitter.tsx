/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext, HTMLProps } from 'react';
import {
  useSplitter,
  SplitterOrientation,
  SplitterType,
  SplitterPosition
} from '@zendeskgarden/container-splitter';
import { SplitterContext } from '../../utils/useSplitterContext';
import { ORIENTATION } from '../../utils/types';

import { StyledPaneItem } from '../../styled/splitter/StyledPaneItem';
import { StyledSeparatorContainer } from '../../styled/splitter/StyledSeparatorContainer';
import { StyledSeparator } from '../../styled/splitter/StyledSeparator';
export interface ISplitterProps extends HTMLProps<any> {
  key: string;
  min: number;
  max: number;
  orientation: ORIENTATION;
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

export const Splitter = ({ key, min, max, orientation, ...props }: ISplitterProps) => {
  const context = useContext(SplitterContext);
  const { getSeparatorProps } = useSplitter({
    type: SplitterType.VARIABLE,
    orientation: gridOrientationToOrientation[orientation],
    position: orientationToPosition[orientation],
    min,
    max,
    rtl: false,
    onChange: valueNow => {
      context.setLayoutValue(key, valueNow);
    },
    valueNow: context.layoutState[key],
    environment: window
  });

  const isHorizontal = gridOrientationToOrientation[orientation] === SplitterOrientation.HORIZONTAL;

  return (
    <StyledPaneItem gridOrientation={orientation}>
      <StyledSeparatorContainer isHorizontal={isHorizontal} {...getSeparatorProps()} {...props}>
        <StyledSeparator isHorizontal={isHorizontal} />
      </StyledSeparatorContainer>
    </StyledPaneItem>
  );
};
