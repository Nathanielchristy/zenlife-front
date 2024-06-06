import { Enforcer, Model, newEnforcer } from "casbin";
import { StringAdapter } from "casbin";
import { IUser } from "./interfaces";
import { AxiosInstance } from "axios";

interface AccessControlProviderProps {
  action: string;
  params?: any;
  resource: string;
}

export const accessControlProvider = async (
  axiosInstance: AxiosInstance,
  model: Model,
  adapter: StringAdapter
) => {
  const response = await axiosInstance.get("/authUser/getuser");
  const UserRole = response.data.role;
  const defaultRole = "guest";

  return {
    // check if user has permission to access a resource
    can: async ({ action, params, resource }: AccessControlProviderProps) => {
      const role = UserRole ? UserRole : defaultRole;
      const enforcer: Enforcer = await newEnforcer(model, adapter);
      if (action === "delete" || action === "edit" || action === "show") {
        return {
          can: await enforcer.enforce(
            role,
            `${resource}/${params?.id}`,
            action
          ),
        };
      }
      if (action === "field") {
        return {
          can: await enforcer.enforce(
            role,
            `${resource}/${params?.field}`,
            action
          ),
        };
      }
      return {
        can: await enforcer.enforce(role, resource, action),
      };
    },
  };
};
