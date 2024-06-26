import {
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Typography,
  Grid,
  Steps,
} from "antd";
import {
  UserOutlined,
  BarcodeOutlined,
  TeamOutlined,
  GlobalOutlined,
  FileMarkdownOutlined,
} from "@ant-design/icons";
import { useShow } from "@refinedev/core";
import { useMemo } from "react";
import { Show } from "@refinedev/antd";
import { useDocumentTitle } from "@refinedev/react-router-v6";

const { Title } = Typography;

export const JobShow = () => {
  useDocumentTitle("Jobs | Zenith");
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const breakpoints = Grid.useBreakpoint();

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
      "File preparation",
      "File sent for printing",
      "Printing",
      "Ready for Production",
      "Ready for Delivery",
      "Ready for Site",
      "Completed",
    ],
    []
  );

  const currentStatusIndex = useMemo(
    () => statusValues.indexOf(record?.jobstatus),
    [record?.jobstatus, statusValues]
  );

  const items = statusValues.map((status, index) => ({
    title: status,
    // description: record?.jobstatus === status ? `Job ${record?.jobstatus}` : "",
  }));

  return (
    <Show>
      <Card loading={isLoading}>
        <Title level={4}>Job Details</Title>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            {/* Conditional rendering based on xs breakpoint */}
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
      </Card>
    </Show>
  );
};
