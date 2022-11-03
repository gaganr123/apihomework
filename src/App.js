import axios from "axios";

import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Card, Button, Modal, Form, Input, Typography, Divider } from "antd";
import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

const App = () => {
  const [active, setActive] = useState(false);
  const { Title, Text } = Typography;
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

  const [posts, setPosts] = useState([]);
  const apiEndPoint = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts();
  }, []);

  const addPost = async () => {
    const post = {
      name: "New User",
      phone: "998755",
      email: "gg@gmail.com",
      website: "gaga.com",
      body: "new",
    };
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  };

  const handleUpdate = async (post) => {
    post.name = "Updated";
    post.phone = "Updated";
    post.email = "Updated";
    post.website = "Updated";
    await axios.put(apiEndPoint + "/" + post.id);
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = { ...post };
    setPosts(postsClone);
  };

  const handleDelete = async (post) => {
    await axios.delete(apiEndPoint + "/" + post.id + post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  const handleFav = async (post) => {
    setActive(!active);
  };
  if (posts.length === 0)
    return <Text> There are no post in the Database </Text>;
  return (
    <>
      <Row>
        <Col span={12} offset={6} style={{ padding: 4 }}>
          <Title level={3}>There are {posts.length} post in the Database</Title>
          <Button onClick={addPost} type="primary">
            + Add New User
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        {posts.map((post) => {
          return (
            <>
              <Col xs={24} xl={8} key={post.id} style={{ padding: 8 }}>
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
                      onClick={() => handleFav(post)}
                      style={{ color: active ? "red" : "" }}
                    />,
                    <EditOutlined key="edit" onClick={showModal} />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDelete(post)}
                    />,
                  ]}
                >
                  <h4>{post.name}</h4>
                  <p>
                    <MailOutlined />
                    {post.email}
                  </p>
                  <p>
                    <PhoneOutlined />
                    {post.phone}
                  </p>
                  <p>
                    <GlobalOutlined />
                    {post.website}
                  </p>
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
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => handleUpdate(post)}
                        >
                          Update
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};

export default App;
