import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../../hooks/useNotifications";

export default function NotificationsButton() {
  const navigate = useNavigate();

  const {
    notifications,
    chargerNotifications,
    marquerCommeLue,
  } = useNotifications();

  const [afficherNotifications, setAfficherNotifications] = useState(false);

  useEffect(() => {
    chargerNotifications();
  }, []);

  const nombreNonLues = notifications.filter(
    (notification) => !notification.lu
  ).length;

  const handleNotificationClick = async (notification) => {
    if (!notification.lu) {
      await marquerCommeLue(notification.id);
    }

    setAfficherNotifications(false);

    navigate(`/transporteur/missions/${notification.mission}`);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setAfficherNotifications(!afficherNotifications)
        }
        className="relative flex size-8 items-center justify-center"
        aria-label="Notifications"
      >
        <Bell className="size-5 text-slate-400" />

        {nombreNonLues > 0 && (
          <span className="absolute -right-2 -top-2 flex min-w-5 h-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-semibold text-white">
            {nombreNonLues}
          </span>
        )}
      </button>

      {afficherNotifications && (
        <div className="absolute right-0 top-11 z-50 w-96 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

          <div className="border-b border-slate-100 px-4 py-3">
            <h2 className="font-semibold text-slate-800">
              Notifications
            </h2>
          </div>

          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              Aucune notification
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    handleNotificationClick(notification)
                  }
                  className={`w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50 ${
                    !notification.lu
                      ? "bg-orange-50"
                      : "bg-white"
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 size-2.5 shrink-0 rounded-full ${
                        !notification.lu
                          ? "bg-orange-500"
                          : "bg-slate-300"
                      }`}
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {notification.titre}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          notification.date_creation
                        ).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}