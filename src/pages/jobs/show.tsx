import {
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Typography,
  Grid,
  Steps,
  Button,
  Modal,
} from "antd";
import {
  UserOutlined,
  BarcodeOutlined,
  TeamOutlined,
  GlobalOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useModal, useShow } from "@refinedev/core";
import { useMemo } from "react";
import { Show } from "@refinedev/antd";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import PdfLayout from "./JobDetailsPDF";

const { Title } = Typography;

export const JobShow = () => {
  useDocumentTitle("Jobs | Zenith");
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const breakpoints = Grid.useBreakpoint();

  const { show, visible, close } = useModal();

  const details = useMemo(() => {
    const list = [
      {
        icon: <UserOutlined />,
        title: "Client Name",
        description: record?.clientname,
      },
      {
        icon: <BarcodeOutlined />,
        title: "Job Name",
        description: record?.jobname,
      },
      {
        icon: <BarcodeOutlined />,
        title: "Estimate Number",
        description: record?.invoiceno,
      },
      {
        icon: <UserOutlined />,
        title: "Sales Coordinator",
        description: record?.salescoordinator,
      },
      {
        icon: <UserOutlined />,
        title: "Designer",
        description: record?.designer,
      },
      {
        icon: <UserOutlined />,
        title: "Production Supervisor",
        description: record?.productionsupervisor,
      },
      {
        icon: <UserOutlined />,
        title: "Printer Name",
        description: record?.printername,
      },
      {
        icon: <UserOutlined />,
        title: "Site Coordinator",
        description: record?.sitecoordinator,
      },
      {
        icon: <TeamOutlined />,
        title: "Installation Team",
        description: record?.installationteam,
      },
      {
        icon: <GlobalOutlined />,
        title: "Site Location",
        description: record?.sitelocation,
      },
      {
        icon: <FileMarkdownOutlined />,
        title: "Description",
        description: record?.description,
      },
    ];
    return list;
  }, [record]);

  const statusValues = useMemo(
    () => [
      "Job Created",
      "File preperation",
      "File sent for printing",
      "Printing",
      "Ready for Production",
      "Ready for Delivery",
      "Ready for Site",
      "Completed",
    ],
    []
  );
  const formatDate = (dateString: string | number | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Date(dateString).toLocaleString("en-GB", options);
  };

  const currentStatusIndex = useMemo(
    () => statusValues.indexOf(record?.jobstatus),
    [record?.jobstatus, statusValues]
  );
  console.log(record?.statusHistory);

  const items = statusValues.map((status) => {
    const matchedRecord = record?.statusHistory.find(
      (detail: { jobstatus: string }) => detail.jobstatus === status
    );
    return {
      title: status,
      description: matchedRecord
        ? `${matchedRecord.jobstatus} by ${
            matchedRecord.editedBy
          } at ${formatDate(matchedRecord.updatedAt)}`
        : "Status Not Updated Properly",
    };
  });

  return (
    <Show>
      <Card loading={isLoading}>
        <Title level={4}>Job Details</Title>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            {breakpoints.xs ? (
              <Descriptions bordered={breakpoints.lg} layout="vertical">
                {details.map((item, index) => (
                  <Descriptions.Item
                    key={index}
                    label={
                      <Space>
                        {item.icon}
                        {item.title}
                      </Space>
                    }
                  >
                    {item.description}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            ) : (
              <Descriptions bordered={breakpoints.lg} column={1}>
                {details.map((item, index) => (
                  <Descriptions.Item
                    key={index}
                    label={
                      <Space>
                        {item.icon}
                        {item.title}
                      </Space>
                    }
                  >
                    {item.description}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            )}
          </Col>
          <Col xs={24} lg={8} style={{ padding: "30px" }}>
            <Steps
              current={currentStatusIndex}
              progressDot
              direction={breakpoints.xs ? "horizontal" : "vertical"}
              items={items}
            />
          </Col>
        </Row>
        <Button
          size="large"
          onClick={() => {
            show();
          }}
          value={"View"}
        >
          View PDF
        </Button>
        <Modal visible={visible} onCancel={close} width="80%" footer={null}>
          <PdfLayout record={record} />
        </Modal>
      </Card>
    </Show>
  );
};
