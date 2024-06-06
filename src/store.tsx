import create from "zustand";

interface RoleState {
  role: string;
  setRole: (role: string) => void;
}

const useRoleStore = create<RoleState>((set) => ({
  role: "",
  setRole: (role) => set({ role }),
}));

export default useRoleStore;
