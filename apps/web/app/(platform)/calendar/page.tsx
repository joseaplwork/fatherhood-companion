import { currentUser } from "@clerk/nextjs/server";
import { CalendarView } from "../../../views/calendar/calendar-view";

export const metadata = { title: "Calendar — Dad Companion" };

export default async function CalendarPage() {
  const user = await currentUser();
  const userName = user?.fullName ?? user?.firstName ?? "";
  return <CalendarView userName={userName} />;
}
