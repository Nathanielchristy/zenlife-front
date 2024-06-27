import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { Typography } from "antd";

const { Title } = Typography;

export const UserShow = () => {
  useDocumentTitle("Users | Zenith");
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{"Role"}</Title>
      <TextField value={record?.role} />
    </Show>
  );
};
