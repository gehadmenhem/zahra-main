import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

/* Helper to create menu items */
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const DashboardMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [childrenData, setChildrenData] = useState([]);
  const [items, setItems] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('/api/children', {
          withCredentials: true,
        });

        setChildrenData(response.data);

        const childMenuItems = response.data.map((child) =>
          getItem(
            `${child.first_name} ${child.last_name}`,
            `child-${child.id}`,
            <UserOutlined />
          )
        );

        setItems([
          getItem('Dashboard', '1', <PieChartOutlined />),
          getItem('Reports', '2', <DesktopOutlined />),
          getItem('Children', 'sub1', <UserOutlined />, childMenuItems),
          getItem('Team', 'sub2', <TeamOutlined />, [
            getItem('Team 1', '6'),
            getItem('Team 2', '8'),
          ]),
          getItem('Files', '9', <FileOutlined />),
        ]);
      } catch (error) {
        console.error('Error fetching children:', error);

        // Fallback menu
        setItems([
          getItem('Dashboard', '1', <PieChartOutlined />),
          getItem('Reports', '2', <DesktopOutlined />),
          getItem('Children', 'sub1', <UserOutlined />, []),
        ]);
      }
    };

    fetchChildren();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              { title: 'Children' },
              {
                title:
                  childrenData.length > 0
                    ? `${childrenData[0].first_name} ${childrenData[0].last_name}`
                    : 'No Children',
              },
            ]}
          />

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {childrenData.length > 0
              ? `${childrenData[0].first_name} is registered.`
              : 'No children registered.'}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardMenu;
