import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addChild, getChildrens, updateChild } from '../menu/children/services';

const ParentInfoTable = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [form] = Form.useForm();

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const data = await getChildrens(user.parent_id);
      setChildren(data.data || []);
    } catch (error) {
      message.error('Failed to fetch children');
    }
    setLoading(false);
  };

  const handleAddChild = () => {
    navigate(`/dashboard/${id}/addchild`);
  };

  const handleEditChild = (child) => {
    setEditingChild(child);
    form.setFieldsValue(child);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingChild) {
        await updateChild(editingChild.child_id, values);
        message.success('Child updated successfully');
      } else {
        await addChild({ ...values, parent_id: user.parent_id });
        message.success('Child added successfully');
      }
      setIsModalVisible(false);
      fetchChildren();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEditChild(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Parent Information</h2>
      <Table
        dataSource={[{ ...user, key: 'parent' }]}
        columns={[
          { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
          { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
          { title: 'Email', dataIndex: 'email_address', key: 'email' },
          { title: 'Phone', dataIndex: 'phone_number', key: 'phone' },
        ]}
        pagination={false}
        style={{ marginBottom: 20 }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <h3>Children</h3>
        <Button type="primary" onClick={handleAddChild}>
          Add Child
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={children}
        loading={loading}
        rowKey="child_id"
      />

      <Modal
        title={editingChild ? 'Edit Child' : 'Add Child'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please input date of birth!' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParentInfoTable;
