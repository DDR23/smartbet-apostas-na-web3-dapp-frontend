import { notifications } from "@mantine/notifications";
import { FaRegCircleCheck } from "react-icons/fa6"
import { LuAlertCircle } from "react-icons/lu";
import { TbXboxX } from "react-icons/tb";

interface NotificationOptions {
  title: string;
  message: string;
  data?: any;
}

export default function ProviderNotification({ title, message }: NotificationOptions) {
  const notificationColor = title === 'Sucesso' ? 'green' : title === 'Alerta' ? 'Orange' : 'red';
  const notificationIcon = title === 'Sucesso' ? <FaRegCircleCheck /> : title === 'Alerta' ? <LuAlertCircle /> : <TbXboxX />;

  notifications.show({
    title: title,
    message: message,
    autoClose: 5000,
    color: notificationColor,
    icon: notificationIcon
  });
}
