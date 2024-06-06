import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const JobShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"Client Name"}</Title>
      <TextField value={record?.clientname} />
      <Title level={5}>{"Job Name"}</Title>
      <TextField value={record?.jobname} />
      <Title level={5}>{"Invoice Number"}</Title>
      <NumberField value={record?.invoiceno} />
      <Title level={5}>{"Sales Coordinator"}</Title>
      <TextField value={record?.salescoordinator} />
      <Title level={5}>{"Designer"}</Title>
      <TextField value={record?.designer} />
      <Title level={5}>{"Production Supervisor"}</Title>
      <TextField value={record?.productionsupervisor} />
      <Title level={5}>{"Printer Name"}</Title>
      <TextField value={record?.printername} />
      <Title level={5}>{"Site Coordinator"}</Title>
      <TextField value={record?.sitecoordinator} />
      <Title level={5}>{"Installation Team"}</Title>
      <TextField value={record?.installationteam} />
      <Title level={5}>{"Site Location"}</Title>
      <TextField value={record?.sitelocation} />
      <Title level={5}>{"Description"}</Title>
      <MarkdownField value={record?.description} />
      <Title level={5}>{"Job Status"}</Title>
      <TextField value={record?.jobstatus} />
    </Show>
  );
};
