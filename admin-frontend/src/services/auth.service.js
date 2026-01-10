import api from "./api";

export const loginAdmin = async (identifier, password) => {
  const res = await api.post("/auth/admin/login", {
    identifier,
    password,
  });
  return res.data;
};
