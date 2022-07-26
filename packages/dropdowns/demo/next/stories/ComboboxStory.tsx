/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Story } from '@storybook/react';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Combobox, IComboboxProps } from '@zendeskgarden/react-dropdowns';

interface IArgs extends IComboboxProps {}

export const ComboboxStory: Story<IArgs> = args => (
  <Grid>
    <Row justifyContent="center" style={{ height: 'calc(100vh - 80px)' }}>
      <Col alignSelf="center">
        <Combobox {...args} />
      </Col>
    </Row>
  </Grid>
);
