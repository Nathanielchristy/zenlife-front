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
  let status = queryResult?.data?.data || [];
  const filter_status = queryResult?.data?.data || [];
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
  if (userRole === "Designer") {
    status = [
      { _id: "1", status: "Job Created" },
      { _id: "2", status: "File preperation" },
      { _id: "3", status: "File sent for printing" },
    ];
  } else if (userRole === "Production") {
    status = [
      { _id: "1", status: "Ready for Delivery" },
      { _id: "2", status: "Ready for Site" },
      { _id: "3", status: "Completed" },
    ];
  } else if (userRole === "Printing") {
    status = [
      { _id: "1", status: "Ready for Delivery" },
      { _id: "2", status: "Ready for Production" },
      { _id: "3", status: "Completed" },
    ];
  } else if (userRole === "Accounts" || userRole === "Accounts Assistant") {
    status = [
      { _id: "1", status: "Estimate Prepared" },
      { _id: "2", status: "Invoice Prepared" },
    ];
  }
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
        <Table.Column dataIndex="invoiceno" title="Estimate Number" />

        <Table.Column
          dataIndex="jobstatus"
          title="Job Status"
          filters={filter_status.map((s) => ({
            text: s.status,
            value: s.status,
          }))}
          onFilter={(value, record) => record.jobstatus === value}
          render={(text: string, record: BaseRecord) => (
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
          )}
        />
        <Table.Column dataIndex="editedBy" title="Updated By" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value: any) => (
            <DateField value={value} format="DD/MM/YYYY" />
          )}
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
