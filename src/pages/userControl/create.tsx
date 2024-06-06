import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

interface IRole {
  _id: string;
  title: string;
}

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { queryResult } = useSelect<IRole>({
    resource: "roles",
  });

  const roles = queryResult?.data?.data || [];

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please input the name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={"email"}
          rules={[
            {
              required: true,
              message: "Please input the email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name={"password"}
          rules={[
            {
              required: true,
              message: "Please input the password",
            },
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            placeholder="●●●●●●●●"
            size="large"
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
    </Create>
  );
};
