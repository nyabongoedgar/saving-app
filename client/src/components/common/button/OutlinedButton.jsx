import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

const OutlinedButton = (props) => {
  const { text } = props;
  return (
    <Button
      className="outlined"
      {...props}
    >
      {text}
    </Button>
  );
};

OutlinedButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default OutlinedButton;
