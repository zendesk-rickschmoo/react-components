/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

 import React, {useContext} from "react";
 import { SplitterContext } from "../../utils/useSplitterContext";

export const Splitter = ({ layoutId, min, max, ...props }) => {
  const context = useContext(SplitterContext);
  const { getSeparatorProps } = useSplitter({
    type: "variable",
    orientation: "horizontal",
    position: "trails",
    min,
    max,
    rtl: false,
    onChange: (valueNow) => {
      context.setLayoutState(state => ({
        ...state.rows,
        [layoutId]: valueNow
      }));
    },
    valueNow: context.layoutState[layoutId],
    environment: window
  });

  return (
    <PaneGrid.Bottom>
      <StyledSeparatorContainer
        orientation="horizontal"
        position="trails"
        {...getSeparatorProps()}
        {...props}
      >
        <StyledSeparator orientation="horizontal" />
      </StyledSeparatorContainer>
    </PaneGrid.Bottom>
  );
};