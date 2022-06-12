import React from 'react';

import Icon from '@ant-design/icons';

import LogoutSVG from './log-out.svg';

const LogoutImg = () => (
  <img
    src={LogoutSVG}
    alt="LogoutIcon"
  />
);

const Logout = (props) => (
  <Icon component={LogoutImg} {...props} />
);

export default Logout;
