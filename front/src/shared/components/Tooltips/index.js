import React from 'react';
import { element, oneOf } from 'prop-types';
import './style.scss';

export const Tooltips = ({
  children,
  align = 'bottom',
  text
}) => {
  const className = `tooltips__container tooltips__container__${align}`;
  return (
    <div className={'tooltips'}>
      <span className={className}>{text}</span>
      {children}
    </div>
  );
};


const alignProps = ['left', 'right', 'top', 'bottom'];
Tooltips.propTypes = {
  children: element,
  text: element,
  align: oneOf(alignProps)
};
