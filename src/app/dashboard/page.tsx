// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server"

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) return <div>Please sign in</div>;

  return <div>Welcome to your dashboard!</div>;
}
