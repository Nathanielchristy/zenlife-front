import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
const { TextArea } = Input;
import { axiosInstance } from "../../authProvider";
import React, { useState, useEffect } from "react";
import { useDocumentTitle } from "@refinedev/react-router-v6";
export const JobEdit = () => {
  useDocumentTitle("Jobs | Zenith");
  const userRole = sessionStorage.getItem("userRole");
  interface IStatus {
    _id: string;
    status: string;
  }
  const { formProps, saveButtonProps, formLoading } = useForm({});

  const { queryResult } = useSelect<IStatus>({
    resource: "jobstatus",
  });
  // const [projectManagers, setProjectManagers] = useState<any[]>([]);
  // const [designers, setDesigners] = useState<any[]>([]);
  // const [projectCoordinators, setProjectCoordinators] = useState<any[]>([]);
  // const [printers, setPrinters] = useState<any[]>([]);
  // const [production, setProduction] = useState<any[]>([]);
  // const [salesCoordinator, setSalesCoordinator] = useState<any[]>([]);
  const username = localStorage.getItem("Username");
  let status = queryResult?.data?.data || [];

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get("/users");
  //       const rolesAndNamesArray = response.data.map(
  //         (employee: { role: any; name: any }) => {
  //           const { role, name } = employee;
  //           return [role, name];
  //         }
  //       );
  //       // Clear previous state
  //       setProjectManagers([]);
  //       setDesigners([]);
  //       setProjectCoordinators([]);
  //       setPrinters([]);
  //       setProduction([]);

  //       rolesAndNamesArray.forEach((item: [any, any]) => {
  //         const [role, name] = item;
  //         switch (role) {
  //           case "ProjectManager-Sales":
  //             setProjectManagers((prev) => [...prev, name]);
  //             break;
  //           case "Designer":
  //             setDesigners((prev) => [...prev, name]);
  //             break;
  //           case "ProjectCoordinator":
  //             setProjectCoordinators((prev) => [...prev, name]);
  //             break;
  //           case "Printer":
  //             setPrinters((prev) => [...prev, name]);
  //             break;
  //           case "Production":
  //             setProduction((prev) => [...prev, name]);
  //             break;
  //           // Add more cases if there are other roles
  //           default:
  //             break;
  //         }
  //         const combinedArray = [
  //           ...projectManagers,
  //           ...designers,
  //           ...projectCoordinators,
  //         ];
  //         console.log(combinedArray);
  //         setSalesCoordinator(combinedArray);
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       throw error; // Re-throw error to be handled by the caller if needed
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Job Card Number"}
          name={["jobcardnumber"]}
          rules={[
            {
              required: true,
              message: "Please input the Job Card Number!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
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
          label={"Estimate Number"}
          name={["invoiceno"]}
          rules={[
            {
              required: false,
              message: "Please input the invoice number!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={"Sales Coordinator"}
          name={["salescoordinator"]}
          rules={[
            {
              required: true,
              message: "Please input the sales coordinator!",
            },
          ]}
        >
          {/* <Select defaultValue="" style={{ width: "50%" }}>
            {salesCoordinator.map((salesCoordinator, index) => (
              <Select.Option key={index} value={salesCoordinator}>
                {salesCoordinator}
              </Select.Option>
            ))}
          </Select> */}
          <Input />
        </Form.Item>

        <Form.Item
          label={"Designer"}
          name={["designer"]}
          rules={[
            {
              required: true,
              message: "Please input the designer!",
            },
          ]}
        >
          {/* <Select defaultValue="" style={{ width: "50%" }}>
            {designers.map((designer, index) => (
              <Select.Option key={index} value={designer}>
                {designer}
              </Select.Option>
            ))}
              
          </Select> */}
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
          label={"Important updates & information"}
          name={["description"]}
          rules={[
            {
              required: false,
              message: "Please input the description!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={"Additional Info"}
          name={["additionalinfo"]}
          rules={[
            {
              required: false,
              message: "Please input the Additional Info!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={"Reprint"}
          name={["reprintinfo"]}
          rules={[
            {
              required: false,
              message: "Please input the Reprint Info!",
            },
          ]}
        >
          <TextArea rows={2} />
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
        <Form.Item
          label={"Updated By"}
          name={["editedBy"]}
          rules={[
            {
              required: false,
              message: "Please input the description!",
            },
          ]}
          style={{ display: "none" }}
        >
          <Input value={`${username}`} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
