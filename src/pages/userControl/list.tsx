import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Form, Space, Table } from "antd";

export const UserList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="_id">
          <Table.Column dataIndex="empid" title={"EMPLOYEE ID"} />
          <Table.Column dataIndex="name" title={"Name"} />
          <Table.Column dataIndex="role" title={"Role"} />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record._id} />
                <ShowButton hideText size="small" recordItemId={record._id} />
                <DeleteButton hideText size="small" recordItemId={record._id} />
              </Space>
            )}
          />
        </Table>
      </List>
      <>
        <Form></Form>
      </>
    </>
  );
};
