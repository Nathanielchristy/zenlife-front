import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";

import { Space, Table } from "antd";
import { IUser } from "../../interfaces";
import { BaseRecord, useGetIdentity, useNavigation } from "@refinedev/core";

export const JobList = () => {
  const { show } = useNavigation();
  const { data: user } = useGetIdentity<IUser>();
  const { tableProps } = useTable({
    syncWithLocation: true,
    // pagination: {
    //   pageSize: 10,
    // },
  });
  return (
    <List>
      <Table
        {...tableProps}
        rowKey="_id"
        pagination={{
          ...tableProps.pagination,
          position: ["bottomRight"],
          size: "default",
        }}
      >
        {/* <Table.Column dataIndex="_id" title="ID" /> */}
        <Table.Column dataIndex="jobcardnumber" title="Job Card Number" />
        <Table.Column dataIndex="clientname" title="Client Name" />
        <Table.Column dataIndex="jobname" title="Job Name" />

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
