import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, useGetIdentity } from "@refinedev/core";
import { Space, Table } from "antd";
import { IUser } from "../../interfaces";

export const DashList = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { tableProps, filters } = useTable({
    syncWithLocation: true,
    filters: {
      initial: [
        {
          field: "createdBy",
          operator: "contains",
          value: user?.name,
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        {/* <Table.Column dataIndex="_id" title="ID" /> */}
        <Table.Column dataIndex="clientname" title="Client Name" />
        <Table.Column dataIndex="jobname" title="Job Name" />
        {/* <Table.Column dataIndex="invoiceno" title="Invoice Number" /> */}
        <Table.Column dataIndex="jobstatus" title="Job Status" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_: any, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
