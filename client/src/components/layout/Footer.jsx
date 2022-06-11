import React from 'react';

import { Layout } from 'antd';

const {
  Footer: FooterComponent,
} = Layout;

function Footer() {
  return (
    <FooterComponent>
      <span>Copyright ©2022 Etinx. All rights reserved.</span>
    </FooterComponent>
  );
}

export default Footer;
