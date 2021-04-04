import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';


/**
 *
 align	This value will be merged into placement's config, please refer to the settings rc-tooltip	object	-
 arrowPointAtCenter	Whether the arrow is pointed at the center of target	boolean	false
 autoAdjustOverflow	Whether to adjust popup placement automatically when popup is off screen	boolean	true
 color	The background color	string	-	4.3.0
 defaultVisible	Whether the floating tooltip card is visible by default	boolean	false
 destroyTooltipOnHide	Whether destroy tooltip when hidden, parent container of tooltip will be destroyed when keepParent is false	boolean | { keepParent?: boolean }	false
 getPopupContainer	The DOM container of the tip, the default behavior is to create a div element in body	function(triggerNode)	() => document.body
 mouseEnterDelay	Delay in seconds, before tooltip is shown on mouse enter	number	0.1
 mouseLeaveDelay	Delay in seconds, before tooltip is hidden on mouse leave	number	0.1
 overlayClassName	Class name of the tooltip card	string	-
 overlayStyle	Style of the tooltip card	object	-
 placement	The position of the tooltip relative to the target, which can be one of top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom	string	top
 trigger	Tooltip trigger mode. Could be multiple by passing an array	hover | focus | click | contextMenu | Array<string>	hover
 visible	Whether the floating tooltip card is visible or not	boolean	false
 onVisibleChange
 */

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
  children: PropTypes.element,
  text: PropTypes.element,
  align: PropTypes.oneOf(alignProps)
};
