/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext, useEffect, HTMLProps } from 'react';
import { ThemeContext } from 'styled-components';
import {
  useSplitter,
  SplitterOrientation,
  SplitterType,
  SplitterPosition,
  IUseSplitterProps
} from '@zendeskgarden/container-splitter';
import { SplitterContext } from '../../utils/useSplitterContext';
import { PaneContext } from '../../utils/usePaneContext';
import { ORIENTATION, DIMENSIONS } from '../../utils/types';

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

const orientationToDimension = {
  start: 'columns',
  end: 'columns',
  top: 'rows',
  bottom: 'rows'
};

export const Splitter = ({
  layoutKey,
  min,
  max,
  orientation = 'start',
  isFixed = false,
  isLeading,
  isTrailing,
  environment = window,
  ...props
}: ISplitterProps) => {
  const splitterContext = useContext(SplitterContext);
  const paneContext = useContext(PaneContext);
  const themeContext = useContext(ThemeContext);
  let position;

  if (isLeading === true) {
    position = SplitterPosition.LEADS;
  } else if (isTrailing === true) {
    position = SplitterPosition.TRAILS;
  } else {
    position = orientationToPosition[orientation!];
  }

  const splitterOrientation = paneToSplitterOrientation[orientation!];

  const pixelsPerFr =
    splitterContext.pixelsPerFr[orientationToDimension[orientation!] as DIMENSIONS];

  const { getSeparatorProps, getPrimaryPaneProps } = useSplitter({
    type: isFixed ? SplitterType.FIXED : SplitterType.VARIABLE,
    orientation: splitterOrientation,
    position,
    min: min * pixelsPerFr,
    max: max * pixelsPerFr,
    rtl: themeContext.rtl,
    environment: environment!,
    onChange: valueNow => {
      switch (orientationToDimension[orientation!]) {
        case 'rows':
          splitterContext.setRowValue(orientation === 'top', layoutKey, valueNow / pixelsPerFr);
          break;
        case 'columns':
          splitterContext.setColumnValue(
            orientation === 'start',
            layoutKey,
            valueNow / pixelsPerFr
          );
          break;
      }
    },
    valueNow: splitterContext.getLayoutValue(
      orientationToDimension[orientation!] as DIMENSIONS,
      layoutKey,
      'px'
    )
  });

  useEffect(() => {
    if (!paneContext.id) {
      paneContext.setId(getPrimaryPaneProps().id);
    }
  }, [paneContext, getPrimaryPaneProps]);

  const isHorizontal = paneToSplitterOrientation[orientation!] === SplitterOrientation.HORIZONTAL;

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

Splitter.defaultProps = {
  orientation: 'end',
  isFixed: false,
  environment: window
};

Splitter.displayName = 'Pane.Splitter';
