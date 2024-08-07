import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Radio, Select } from "antd";
import { axiosInstance } from "../../authProvider";
import { useEffect, useState } from "react";

interface IStatus {
  _id: string;
  status: string;
}

export const JobCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { queryResult } = useSelect<IStatus>({
    resource: "jobstatus",
  });
  const userRole = sessionStorage.getItem("userRole");
  const username = localStorage.getItem("Username");
  let status = queryResult?.data?.data || [];
  if (userRole === "Production") {
    status = [
      { _id: "1", status: "Ready for Delivery" },
      { _id: "2", status: "Ready for Site" },
    ];
  } else if (userRole === "Designer") {
    status = [
      { _id: "1", status: "Job Created" },
      { _id: "2", status: "File preperation" },
      { _id: "3", status: "File sent for printing" },
    ];
  } else if (userRole === "ProjectManager-Sales") {
    status = [
      { _id: "1", status: "Job Created" },
      { _id: "2", status: "File preperation" },
      { _id: "3", status: "File sent for printing" },
    ];
  } else if (userRole === "ProjectCoordinator") {
    status = [
      { _id: "1", status: "Job Created" },
      { _id: "2", status: "File preperation" },
      { _id: "3", status: "File sent for printing" },
    ];
  }
  // const [projectManagers, setProjectManagers] = useState<any[]>([]);
  // const [designers, setDesigners] = useState<any[]>([]);
  // const [projectCoordinators, setProjectCoordinators] = useState<any[]>([]);
  // const [printers, setPrinters] = useState<any[]>([]);
  // const [production, setProduction] = useState<any[]>([]);
  // const [salesCoordinator, setSalesCoordinator] = useState<any[]>([]);

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
  //       setSalesCoordinator([]);

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
  // console.log(designers);
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="horizontal"
        initialValues={{
          editedBy: username,
        }}
      >
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
          <Input />
        </Form.Item>

        <Form.Item
          label={"Sales Coordinator"}
          name={["salescoordinator"]}
          rules={[
            {
              required: false,
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
              required: false,
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
          label={"Description"}
          name={["description"]}
          rules={[
            {
              required: false,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea />
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
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Reprint"
          name="option"
          rules={[
            {
              required: false,
              message: "Please select an option!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.option !== currentValues.option
          }
          noStyle
        >
          {({ getFieldValue }) => {
            return getFieldValue("option") === "yes" ? (
              <Form.Item
                label="Reason"
                name="reprintinfo"
                rules={[
                  {
                    required: true,
                    message: "Please input the Reprint Info!",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item
          label={"Job Status"}
          name={["jobstatus"]}
          initialValue={"Job Created"}
          rules={[
            {
              required: false,
              message: "Please select the job status!",
            },
          ]}
        >
          <Select defaultValue="Job Created" style={{ width: "50%" }}>
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
    </Create>
  );
};
