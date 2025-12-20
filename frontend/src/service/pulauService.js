import apiInstance from "../utils/axios";

export const getPulau = async () =>
  apiInstance.get("/provinsi").then((res) => res.data);

export const deletePulau = async (id) =>
  apiInstance.delete(`/provinsi/${id}`).then((res) => res.data);

export const postPulau = async (data) =>
  apiInstance.post("/provinsi", data).then((res) => res.data);
