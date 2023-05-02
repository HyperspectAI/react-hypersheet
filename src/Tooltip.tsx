/* eslint-disable react/jsx-indent */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line react/prop-types

import React, { useState } from 'react';
import { TooltipProps } from './types';

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  return (
     <div className="tooltipWrapper">
        <div
          className="tooltipTrigger"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
        {showTooltip && <div className="tooltip">{content}</div>}
     </div>
  );
};

export default Tooltip;
