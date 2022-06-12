import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu } from "antd";
import { logoutUser } from "../../redux/actions/authActions";
import BarChart from "../../assets/icons/BarChart";
import LogoutIcon from "../../assets/icons/Logout";

const { Sider } = Layout;

// eslint-disable-next-line react/prop-types
function SideMenu({ collapsed, user, toggle }) {
  const location = useLocation();
  const dispatch = useDispatch();
  let menuItems = [];

  const getMenuItemProps = ({
    path,
    name,
    key,
    defaultIcon,
    selectedIcon,
    order,
  }) => {
    let icon = defaultIcon;
    if (
      path === location.pathname ||
      path.split("/")[1] === location.pathname.split("/")[1]
    ) {
      icon = selectedIcon;
    }
    return {
      path,
      name,
      key,
      icon,
      order,
    };
  };
  const dashboard = {
    path: "/",
    name: "Dashboard",
    key: "dashboard",
    defaultIcon: <BarChart />,
    selectedIcon: <BarChart color="white" />,
    order: 1,
  };

  const dashboardProps = getMenuItemProps(dashboard);

  const getSortedItems = (arr) => arr.sort((v1, v2) => v1.order - v2.order);

  const normalUserItems = getSortedItems([dashboardProps]);

  menuItems = normalUserItems;

  const getSelectedItem = () =>
    menuItems
      .filter(
        (item) => item.path.split("/")[1] === location.pathname.split("/")[1]
      )
      .reduce((a, c) => {
        a.push(c.path);
        return a;
      }, []);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      id="side-menu"
    >
      {/* <LogoItem collapsed={collapsed} toggle={toggle} /> */}
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["/"]}
        selectedKeys={getSelectedItem()}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.path}
            icon={item.icon}
            className="layout horizontal center start"
          >
            <NavLink className="nav-text" to={item.path}>
              {item.name}
            </NavLink>
          </Menu.Item>
        ))}

        <Menu.Item
          key={"logout"}
          className="layout horizontal center start"
          style={{ bottom: "40px", position: "absolute" }}
          icon={<LogoutIcon />}
          onClick={() => dispatch(logoutUser())}
        >
          <NavLink className="nav-text" to="">
            Logout
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

SideMenu.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

SideMenu.defaultProps = {
  user: null,
};

export default SideMenu;
