import apiInstance from "../utils/axios";

export const postRegister = async (data) =>
  apiInstance.post("/register", data).then((res) => res.data);
export const postLogin = async (data) =>
  apiInstance.post("/login", data).then((res) => res.data);

