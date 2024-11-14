import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotificationWithIcon = (
  type: NotificationType,
  title: string,
  description: string
) => {
  notification[type]({
    message: title,
    description,
  });
};
