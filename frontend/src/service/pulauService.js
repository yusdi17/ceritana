import apiInstance from "../utils/axios";

export const getPulau = async (data) =>
  apiInstance.get("/provinsi", data).then((res) => res.data);

export const deletePulau = async (id) =>
  apiInstance.delete(`/provinsi/${id}`).then((res) => res.data);

export const postPulau = async (data) =>
  apiInstance.post("/provinsi", data).then((res) => res.data);
