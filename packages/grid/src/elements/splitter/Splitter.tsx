/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import {
  useSplitter,
  SplitterOrientation,
  SplitterType,
  SplitterPosition
} from '@zendeskgarden/container-splitter';
import { SplitterContext } from '../../utils/useSplitterContext';
import { PaneContext } from '../../utils/usePaneContext';
import { ARRAY_ORIENTATION, DIMENSIONS, ISplitterProps } from '../../utils/types';

import { StyledPaneItem } from '../../styled/splitter/StyledPaneItem';
import { StyledSeparatorContainer } from '../../styled/splitter/StyledSeparatorContainer';
import { StyledSeparator } from '../../styled/splitter/StyledSeparator';

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
  orientation,
  isFixed,
  isLeading,
  isTrailing,
  environment,
  splitterContext: customContext,
  ...props
}: ISplitterProps) => {
  const parentContext = useContext(SplitterContext);
  const paneContext = useContext(PaneContext);
  const themeContext = useContext(ThemeContext);
  const splitterContext = customContext ? customContext : parentContext;
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

Splitter.propTypes = {
  layoutKey: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(ARRAY_ORIENTATION),
  isLeading: PropTypes.bool,
  isTrailing: PropTypes.bool,
  environment: PropTypes.object,
  isFixed: PropTypes.bool,
  splitterContext: PropTypes.object
};
