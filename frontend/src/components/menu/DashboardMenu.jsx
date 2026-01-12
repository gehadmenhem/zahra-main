import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Spin, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const [selectedChild, setSelectedChild] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKey(key);

    // Navigate based on menu item
    if (key === '1') {
      // Dashboard - navigate to base dashboard route
      setSelectedChild(null);
      navigate(`/dashboard/${id}`);
    } else if (key.startsWith('child-')) {
      console.log(key);
      // Child item - navigate to child view (you can customize this)
      const childId = key.replace('child-', '');
      console.log(childId);
      const child = childrenData.find((c) => c.children_id == childId);
      setSelectedChild(child);
      console.log(child);
      navigate(`/dashboard/${id}/child/${childId}`);
    }
    // For other menu items, just update selectedKey without navigation
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
            `${child.child_first_name} ${child.child_last_name}`,
            `child-${child.children_id}`,
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
                        ? `${childrenData[0].child_first_name} ${childrenData[0].child_last_name}`
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
                  ? `${childrenData[0].child_first_name} is registered.`
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
