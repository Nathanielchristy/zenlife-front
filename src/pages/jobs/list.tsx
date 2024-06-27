import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useSelect,
  useTable,
} from "@refinedev/antd";

import { Select, Space, Table, message } from "antd";
import { IUser } from "../../interfaces";
import {
  BaseRecord,
  useGetIdentity,
  useNavigation,
  useUpdate,
} from "@refinedev/core";

export const JobList = () => {
  const { show } = useNavigation();
  const { data: user } = useGetIdentity<IUser>();
  const { tableProps } = useTable({
    syncWithLocation: true,
    // pagination: {
    //   pageSize: 10,
    // },
  });
  interface IStatus {
    _id: string;
    status: string;
  }
  const { queryResult } = useSelect<IStatus>({
    resource: "jobstatus",
  });
  const status = queryResult?.data?.data || [];
  const { mutate: updateJobStatus } = useUpdate();
  const userRole = sessionStorage.getItem("userRole");
  const username = localStorage.getItem("Username");

  const handleStatusChange = (record: BaseRecord, newStatus: string) => {
    updateJobStatus(
      {
        resource: "jobs", // The resource name, make sure it matches your resource
        id: record._id,
        values: { jobstatus: newStatus, editedBy: username },
      },
      {
        onSuccess: () => {
          message.success("Job status updated successfully");
          // Optionally, you can refetch or update local table data here
        },
        onError: () => {
          message.error("Failed to update job status");
        },
      }
    );
  };
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

        <Table.Column
          dataIndex="jobstatus"
          title="Job Status"
          render={(text: string, record: BaseRecord) =>
            userRole === "admin" || userRole === "manager" ? (
              <Select
                defaultValue={text}
                onChange={(value) => handleStatusChange(record, value)}
                style={{ width: "100%" }}
              >
                {status.map((s) => (
                  <Select.Option key={s._id} value={s.status}>
                    {s.status}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              text
            )
          }
        />
        <Table.Column dataIndex="editedBy" title="Updated By" />
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
