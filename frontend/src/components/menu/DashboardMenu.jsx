import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Spin, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ParentInfoTable from '../parentInfoDashboard/ParentInfoTable';
import { getChildrens } from './children/services';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const DashboardMenu = ({ parentId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [childrenData, setChildrenData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState('1');
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  // Fetch children once on mount
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        const data = await getChildrens(parentId); // fetch children from backend
        setChildrenData(data || []);

        const childMenuItems = (data || []).map((child) =>
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
        // fallback menu
        setItems([
          getItem('Dashboard', '1', <PieChartOutlined />),
          getItem('Reports', '2', <DesktopOutlined />),
          getItem('Children', 'sub1', <UserOutlined />, []),
          getItem('Team', 'sub2', <TeamOutlined />, [
            getItem('Team 1', '6'),
            getItem('Team 2', '8'),
          ]),
          getItem('Files', '9', <FileOutlined />),
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (parentId) fetchChildren();
  }, [parentId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
        <Spin size="large" tip="Loading children..." />
      </div>
    );
  }

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
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ margin: '0 16px' }}>
          {location.pathname.includes('/addchild') ? (
            <Outlet />
          ) : selectedKey === '1' ? (
            <ParentInfoTable />
          ) : (
            <>
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
            </>
          )}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardMenu;
