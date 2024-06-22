import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

interface IStatus {
  _id: string;
  status: string;
}

export const JobCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { queryResult } = useSelect<IStatus>({
    resource: "jobstatus",
  });

  const status = queryResult?.data?.data || [];

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="horizontal">
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
          <Input />
        </Form.Item>

        <Form.Item
          label={"Sales Coordinator"}
          name={["salescoordinator"]}
          rules={[
            {
              required: false,
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
              required: false,
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
          label={"Description"}
          name={["description"]}
          rules={[
            {
              required: false,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea />
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
    </Create>
  );
};
