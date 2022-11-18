import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Modal,
  Space,
} from "antd";
const { Title, Text } = Typography;
const Apptodo = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTask = localStorage.getItem("taskList");
    if (savedTask) {
      return JSON.parse(savedTask);
    } else {
      return [];
    }
  });
  const addTask = () => {
    if (task !== "") {
      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  const handleDel = (delTask) => {
    const newTask = taskList.filter((task) => {
      return task !== delTask;
    });
    setTaskList(newTask);
  };
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Title style={{ textAlign: "center" }}>My Task Details</Title>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Card>
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
                label="Your Task"
                name="task"
                rules={[
                  {
                    required: true,
                    message: "Please input your task!",
                  },
                ]}
              >
                <Input
                  value={task}
                  placeholder="task"
                  onChange={(e) => setTask(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={addTask}>
                  AddTask
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <hr />
          {taskList.length > 0 ? (
            <Card>
              {taskList.map((task, index) => (
                <div
                  className="content"
                  key={index}
                  style={{ padding: "20px" }}
                >
                  <p>
                    <b>Your task details:</b> {task}
                  </p>

                  <Button type="danger" onClick={showModal}>
                    Delete
                  </Button>
                  <Modal
                    title="Delete Confirmation"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div className="mod">
                      <Space>
                        <Text strong>Are you sure you want to delete it ?</Text>
                        <Button
                          type="danger"
                          onClick={() => {
                            handleDel(task);
                          }}
                        >
                          Yes
                        </Button>
                      </Space>
                    </div>
                  </Modal>
                </div>
              ))}
            </Card>
          ) : (
            <p style={{ textAlign: "center" }}>No task found</p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Apptodo;
