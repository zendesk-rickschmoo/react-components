/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import {
  ComboboxNext as Combobox,
  IComboboxNextProps as IComboboxProps,
  OptGroup,
  Option
} from '@zendeskgarden/react-dropdowns';

interface IArgs extends IComboboxProps {}

export const ComboboxStory: Story<IArgs> = args => (
  <Grid>
    <Row justifyContent="center" style={{ height: 'calc(100vh - 80px)' }}>
      <Col alignSelf="center">
        <Combobox {...args}>
          <OptGroup label="Test">
            <Option value="foo" label="Wow">
              foo
            </Option>
            <Option value="bar">bar</Option>
          </OptGroup>
          <OptGroup aria-label="check">
            <Option isDisabled value="asparagus">
              Asparagus
            </Option>
            <Option value="brussel sprouts" isDanger>
              <span>Brussel sprouts</span>
            </Option>
          </OptGroup>
        </Combobox>
      </Col>
    </Row>
  </Grid>
);
