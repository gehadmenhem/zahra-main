import {
  CalendarOutlined,
  DesktopOutlined,
  FileOutlined,
  InfoCircleOutlined,
  MedicineBoxOutlined,
  PictureOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Modal, Spin, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ChildAttendance from '../child_attendance/ChildAttendance';
import ChildInfoCard from '../child_info/ChildInfoCard';
import ParentInfoTable from '../parentInfoDashboard/ParentInfoTable';
import ChildCard from './card/ChildCard';
import { getChildrens } from './children/services';
import './dashboard_menu.css';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const cards = [
    { key: 'info', label: 'Child Info', icon: <InfoCircleOutlined /> },
    { key: 'images', label: 'Child Images', icon: <PictureOutlined /> },
    {
      key: 'activity',
      label: 'Child Practice Activity',
      icon: <PlayCircleOutlined />,
    },
    {
      key: 'attendance',
      label: 'Child Attendance',
      icon: <CalendarOutlined />,
    },
    { key: 'milestones', label: 'Milestones', icon: <TrophyOutlined /> },
    { key: 'medication', label: 'Medication', icon: <MedicineBoxOutlined /> },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKey(key);

    // Navigate based on menu item
    if (key === '1') {
      // Dashboard - navigate to base dashboard route
      setSelectedChild(null);
      navigate(`/dashboard/${id}`);
    } else if (key.startsWith('child-')) {
      // Child item - navigate to child view (you can customize this)
      const childId = key.replace('child-', '');

      const child = childrenData.find((c) => c.children_id == childId);
      setSelectedChild(child);

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
        console.log(data);
        const childMenuItems = (data || []).map((child) =>
          getItem(
            `${child.child_first_name} ${child.child_last_name}`,
            `child-${child.children_id}`,
            <Avatar src={child.profile_image} size="medium" />
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

  // Refresh children when returning from addchild page
  const prevPathRef = useRef();
  useEffect(() => {
    if (
      prevPathRef.current &&
      prevPathRef.current.includes('/addchild') &&
      location.pathname === `/dashboard/${id}` &&
      !loading
    ) {
      const fetchChildren = async () => {
        try {
          setLoading(true);
          const data = await getChildrens(parentId);
          setChildrenData(data || []);
          const childMenuItems = (data || []).map((child) =>
            getItem(
              `${child.child_first_name} ${child.child_last_name}`,
              `child-${child.children_id}`,
              <Avatar src={child.profile_image} size="medium" />
            )
          );
          setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[2] = getItem(
              'Children',
              'sub1',
              <UserOutlined />,
              childMenuItems
            );
            return newItems;
          });
        } catch (error) {
          console.error('Error fetching children:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchChildren();
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, id, parentId, loading]);

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
          ) : selectedChild ? (
            <>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                  { title: 'Children' },
                  {
                    title: `${selectedChild.child_first_name} ${selectedChild.child_last_name}`,
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
                <h2>
                  {selectedChild.child_first_name}{' '}
                  {selectedChild.child_last_name}
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                  }}
                >
                  {cards.map((card) => (
                    <ChildCard
                      key={card.key}
                      card={card}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[{ title: 'Children' }, { title: 'Select a Child' }]}
              />

              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                Please select a child from the menu to view details.
              </div>
            </>
          )}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={900}
        centered
        className="child-modal"
        title={
          <div className="modal-title-wrapper">
            <div className="modal-avatar">
              <Avatar
                className="avatar"
                src={selectedChild?.profile_image}
                size="medium"
              />
            </div>

            <div className="modal-title-text">
              <h2>
                {selectedChild?.child_first_name +
                  ' ' +
                  selectedChild?.child_last_name}
              </h2>

              <p>{selectedCard?.label}</p>
            </div>
          </div>
        }
      >
        {selectedCard?.key === 'info' && selectedChild && (
          <ChildInfoCard child={selectedChild} />
        )}
        {selectedCard?.key === 'attendance' && selectedChild && (
          <ChildAttendance />
        )}
        {/* {selectedCard?.key === 'medical' && selectedChild && (
          <MedicalInfo child={selectedChild} />
        )}
        {selectedCard?.key === 'emergency' && selectedChild && (
          <EmergencyInfo child={selectedChild} />
        )} */}
      </Modal>
    </Layout>
  );
};

export default DashboardMenu;
