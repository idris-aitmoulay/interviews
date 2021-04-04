import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tooltips } from '../shared/components'

const Story = () => {
  return (
    <div>
      Tooltips:
      <br/>
      fffffffffffffffffffffffffffffffffffffffffffffffff :
      <Tooltips text={'tooltiped title'}>
        <div>la vie est belle la vie est belle</div>
      </Tooltips>
    </div>
  );
};

storiesOf('Components/Tooltips', module)
  .add('Tooltips', () => <Story />);
