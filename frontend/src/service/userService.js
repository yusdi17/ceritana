import apiInstance from "../utils/axios";

export const getUser = async (data) =>
  apiInstance.get("/manage-users", data).then((res) => res.data);

export const deleteUser = async (id) =>
  apiInstance.delete(`/manage-users/${id}`).then((res) => res.data);