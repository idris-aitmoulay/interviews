import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tooltips } from '../shared/components'

const Story = () => {
  return (
    <div>
      Tooltips:
      <br/>
      top tooltips :
      <Tooltips text={'tooltiped title'} align={'top'}>
        <div>tooltips top</div>
      </Tooltips>
      <br/>
      bottom tooltips :
      <Tooltips text={'tooltiped title'} align={'bottom'}>
        <div>tooltips bottom</div>
      </Tooltips>
      <br/>
      left  tooltips :
      <Tooltips text={'tooltiped title'} align={'left'}>
        <div>tooltips left</div>
      </Tooltips>

      <br/>
      right  tooltips :
      <Tooltips text={'tooltiped title'} align={'right'}>
        <div>tooltips right</div>
      </Tooltips>
    </div>
  );
};

storiesOf('Components/Tooltips', module)
  .add('Tooltips', () => <Story />);
