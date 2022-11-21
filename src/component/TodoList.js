import React from "react";
import "antd/dist/antd.css";
import { Card, Row, Col, Typography, Space, Button } from "antd";
const { Title } = Typography;
const TodoList = ({ todos, handleDelete, handleEdit }) => {
  return (
    <Row style={{ marginTop: "50px" }}>
      <Col span={12} offset={6}>
        {todos.length > 0 ? (
          <Card>
            {todos.map((t) => (
              <div className="singleTodo">
                <Title style={{ textAlign: "center" }} level={5} key={t.id}>
                  {t.todo}
                </Title>
                <Space>
                  <Button type="ghost" onClick={() => handleEdit(t.id)}>
                    Edit
                  </Button>
                  <Button type="danger" onClick={() => handleDelete(t.id)}>
                    Delete
                  </Button>
                </Space>
              </div>
            ))}
          </Card>
        ) : (
          <Title style={{ textAlign: "center" }} level={4}>
            No Task
          </Title>
        )}
      </Col>
    </Row>
  );
};

export default TodoList;
