import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Layout, Skeleton } from 'antd';

import SideMenu from './SideMenu';
import MainHeader from './MainHeader';
import Footer from './Footer';
import MainContent from './MainContent';
import './css/layout.scss';

export default function LayoutContainer() {
  const { loading } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ height: '100%' }}>
      {loading && <Skeleton />}
      {!loading && (
        <>
          <SideMenu collapsed={collapsed} user={null} toggle={toggle} />
          <Layout style={{ position: 'relative', overflow: 'auto' }} className="off-white-bg">
            <MainHeader
              style={{ minHeight: 'unset' }}
              collapsed={collapsed}
            />
            <MainContent />
            <Footer />
          </Layout>
        </>
      )}
    </Layout>
  );
}
