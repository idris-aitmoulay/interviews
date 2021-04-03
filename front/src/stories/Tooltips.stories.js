import React from 'react';
import { storiesOf } from '@storybook/react';
const Story = () => {
  return (
    <div>
      hi hi this is story book
    </div>
  );
};

storiesOf('Components/Tooltips', module)
  .add('Tooltips', () => <Story />);
