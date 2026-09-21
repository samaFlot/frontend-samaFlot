import api from "./api";

export async function getNotifications() {
  const response = await api.get("/notifications/");
  return response.data;
}

export async function marquerNotificationCommeLue(id) {
  const response = await api.patch(`/notifications/${id}/lue/`);
  return response.data;
}