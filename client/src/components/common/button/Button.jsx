import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

const YellowButton = (props) => {
  const { text, icon, className } = props;
  return (
    <Button
      style={{ borderColor: 'transparent' }}
      icon={icon}
      {...props}
      className={`${className} prim-yellow-bg horizontal center-center`}
    >
      {text}
    </Button>
  );
};

YellowButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element,
};

YellowButton.defaultProps = {
  icon: <span />,
  className: '',
};

export default YellowButton;
