import { currentUser } from "@clerk/nextjs/server";
import { CommunityView } from "../../../views/community/community-view";

export const metadata = { title: "Community — Dad Companion" };

export default async function CommunityPage() {
  const user = await currentUser();
  const userName = user?.fullName ?? user?.firstName ?? "";
  return <CommunityView userName={userName} />;
}
