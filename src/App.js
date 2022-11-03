import "./App.css";

import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Card, Button, Modal, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

function App() {
  const [active, setActive] = useState(false);
  const handleFav = () => {
    setActive(!active);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data = await response.json();
      localStorage.setItem("users", JSON.stringify(data));
      setUsers(data);
    } catch (error) {
      console.log("my error is " + error);
    }
  };

  const deleteData = () => {
    localStorage.removeItem("users");
    setUsers(null);
  };
  const updateUser = () => {
    alert("updated");
  };
  // const deleteUser = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/users/${id}`,
  //       { method: "DELETE" }
  //     );

  //     setUsers(await response.json());
  //   } catch (error) {
  //     console.log("my error is " + error);
  //   }
  // };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Row>
        {users.map((user) => {
          const { id, name, email, phone, website } = user;
          return (
            <>
              <Col xs={24} xl={8} key={id} style={{ padding: 8 }}>
                <Card
                  style={{
                    width: 300,
                    padding: 5,
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <HeartFilled
                      key="addfav"
                      onClick={handleFav}
                      style={{ color: active ? "red" : "" }}
                    />,
                    <EditOutlined key="edit" onClick={showModal} />,
                    <DeleteOutlined key="delete" onClick={deleteData} />,
                  ]}
                >
                  <h4>{name}</h4>
                  <p>
                    <MailOutlined />
                    {email}
                  </p>
                  <p>
                    <PhoneOutlined />
                    {phone}
                  </p>
                  <p>
                    <GlobalOutlined />
                    {website}
                  </p>
                </Card>
              </Col>
            </>
          );
        })}

        <Modal
          title="Edit user details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="Phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Website"
              name="Website"
              rules={[
                {
                  required: true,
                  message: "Please input your website!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={updateUser}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
}

export default App;
