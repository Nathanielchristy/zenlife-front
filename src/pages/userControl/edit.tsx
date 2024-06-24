import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";

export const UserEdit = () => {
  useDocumentTitle("Users | Zenith");
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});
  const [passwordVisible, setPasswordVisible] = useState(false);
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
        <FormItem label={"Role"} name={"role"}>
          <Select
            defaultValue="Employee"
            // style={{
            //   width: 00,
            // }}
            //   onChange={handleChange}
            options={[
              {
                value: "designer",
                label: "Designer",
              },
              {
                value: "salescoordinator",
                label: "Sales - Coordinator",
              },
              {
                value: "productionsupervisor",
                label: "Production - Supervisor",
              },
              {
                value: "printer",
                label: "Printer",
              },
              {
                value: "sitecoordinator",
                label: "Site - Coordinator",
              },
            ]}
          />
        </FormItem>
      </Form>
    </Edit>
  );
};
