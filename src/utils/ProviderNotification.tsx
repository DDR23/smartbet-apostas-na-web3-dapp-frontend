import { notifications } from "@mantine/notifications";
import { FaRegCircleCheck } from "react-icons/fa6"
import { FiAlertCircle } from "react-icons/fi";
import { TbXboxX } from "react-icons/tb";

interface NotificationOptions {
  title: string;
  message: string;
  data?: any;
}

export default function ProviderNotification({ title, message }: NotificationOptions) {
  const notificationColor = title === 'Success' ? 'green' : title === 'Error' ? 'red' : 'orange';
  const notificationIcon = title === 'Success' ? <FaRegCircleCheck /> : title === 'Error' ? <TbXboxX /> : <FiAlertCircle />;

  notifications.show({
    title: title,
    message: message,
    autoClose: 5000,
    color: notificationColor,
    icon: notificationIcon
  });
}
