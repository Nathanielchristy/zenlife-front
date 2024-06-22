import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useUpdate } from "@refinedev/core";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useRoleStore from "../../store";
const { TextArea } = Input;
export const JobEdit = () => {
  interface IStatus {
    _id: string;
    status: string;
  }
  const { formProps, saveButtonProps, formLoading } = useForm({});
  const { role, setRole } = useRoleStore();

  const { queryResult } = useSelect<IStatus>({
    resource: "jobstatus",
  });

  const status = queryResult?.data?.data || [];
  console.log(status);

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Client Name"}
          name={["clientname"]}
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
          label={"Job Name"}
          name={["jobname"]}
          rules={[
            {
              required: true,
              message: "Please input the job name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Invoice Number"}
          name={["invoiceno"]}
          rules={[
            {
              required: false,
              message: "Please input the invoice number!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={"Sales Coordinator"}
          name={["salescoordinator"]}
          rules={[
            {
              required: true,
              message: "Please input the sales coordinator!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Designer"}
          name={["designer"]}
          rules={[
            {
              required: true,
              message: "Please input the designer!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Production Supervisor"}
          name={["productionsupervisor"]}
          rules={[
            {
              required: false,
              message: "Please input the production supervisor!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Printer Name"}
          name={["printername"]}
          rules={[
            {
              required: false,
              message: "Please input the printer name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Site Coordinator"}
          name={["sitecoordinator"]}
          rules={[
            {
              required: false,
              message: "Please input the site coordinator!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Installation Team"}
          name={["installationteam"]}
          rules={[
            {
              required: false,
              message: "Please input the installation team!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Site Location"}
          name={["sitelocation"]}
          rules={[
            {
              required: false,
              message: "Please input the site location!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Important updates & information"}
          name={["description"]}
          rules={[
            {
              required: false,
              message: "Please input the description!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label={"Job Status"}
          name={["jobstatus"]}
          initialValue={"Unassigned"}
          rules={[
            {
              required: false,
              message: "Please select the job status!",
            },
          ]}
        >
          <Select defaultValue="Unassigned" style={{ width: "50%" }}>
            {status.map((s) => (
              <Select.Option key={s._id} value={s.status}>
                {s.status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
