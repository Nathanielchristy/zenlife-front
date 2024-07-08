import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
interface IRole {
  _id: string;
  title: string;
}

export const UserEdit = () => {
  useDocumentTitle("Users | Zenith");
  const { formProps, saveButtonProps, formLoading } = useForm({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { queryResult } = useSelect<IRole>({
    resource: "roles",
  });
  interface IRole {
    _id: string;
    title: string;
  }

  const roles = queryResult?.data?.data || [];
  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
              message: "Please input the client name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={["email"]}
          rules={[
            {
              required: true,
              message: "Please input the client name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Password"} name={["password"]}>
          <Input.Password
            name="password"
            placeholder="input password"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
        </Form.Item>
        <Form.Item
          label="Role"
          name={"role"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            {roles.map((role) => (
              <Select.Option key={role.title} value={role.title}>
                {role.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
