import { currentUser } from "@clerk/nextjs/server";
import { ResourcesView } from "../../../views/resources/resources-view";

export const metadata = { title: "Resources — Dad Companion" };

export default async function ResourcesPage() {
  const user = await currentUser();
  const userName = user?.fullName ?? user?.firstName ?? "";
  return <ResourcesView userName={userName} />;
}
