import React from "react";
import "antd/dist/antd.css";
import { Typography, Row, Col, Card, Space } from "antd";
const { Title } = Typography;
const TodoForm = ({ handleSubmit, todo, editId, setTodo }) => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Title style={{ textAlign: "center" }}>My crud App</Title>
        <Card style={{ background: "gray" }}>
          <form className="todoForm" onSubmit={handleSubmit}>
            <Space>
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                style={{
                  border: "1px solid white",
                  borderRadius: "50px",
                  padding: "5px",
                }}
              />
              <button type="submit">{editId ? "Update" : "Add"}</button>
            </Space>
          </form>
        </Card>
      </Col>
    </Row>
  );
};

export default TodoForm;
