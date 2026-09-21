import { useState } from "react";
import {
  getNotifications,
  marquerNotificationCommeLue,
} from "../services/notificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const chargerNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des notifications :",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const marquerCommeLue = async (id) => {
    await marquerNotificationCommeLue(id);

    setNotifications((notifications) =>
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, lu: true }
          : notification
      )
    );
  };

  return {
    notifications,
    loading,
    chargerNotifications,
    marquerCommeLue,
  };
}