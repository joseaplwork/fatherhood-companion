import type { NotificationType } from "../enums/index";

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  readAt: Date | null;
  metadata: Record<string, string> | null;
  createdAt: Date;
};
