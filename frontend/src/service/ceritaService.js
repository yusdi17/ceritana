import apiInstance from "../utils/axios";

export const getCerita = async (params = {}) => {
  const res = await apiInstance.get("/cerita", { params });
  return res.data;
};
export const postCerita = async (form) => {
  const fd = new FormData();
  fd.append('judul', form.judul);
  fd.append('cerita', form.cerita);
  fd.append('provinsi_id', form.provinsi_id);
  fd.append('is_published', form.is_published === 'true' ? '1' : '0');
  if (form.thumbnail?.[0]) fd.append('thumbnail', form.thumbnail[0]);

  return apiInstance.post('/cerita', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);
};
export const updateCerita = async (id, form) => {
  const fd = new FormData();
  fd.append('_method', 'PUT');
  fd.append('judul', form.judul);
  fd.append('cerita', form.cerita);
  fd.append('provinsi_id', form.provinsi_id);
  fd.append('is_published', form.is_published === 'true' ? '1' : '0');
  if (form.thumbnail?.[0]) fd.append('thumbnail', form.thumbnail[0]); // opsional

  return apiInstance.post(`/cerita/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);
};
export const getCeritaById = async (id) =>
  apiInstance.get(`/cerita/${id}`).then(res => res.data);
export const deleteCerita = async (id) =>
  apiInstance.delete(`/cerita/${id}`).then((res) => res.data);
export const getProvinsi = async (data) =>
  apiInstance.get('/provinsi', data).then((res) => res.data);