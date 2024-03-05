import { getServerSession } from "next-auth";

import { Landing } from "@/features/landing";
import SignOutLayout from "@/features/signOutLayout/layout";
import SignInLayout from "@/features/signInLayout/layout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Dashboard } from "@/features/dashboard";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return (
      <SignOutLayout>
        <main>
          <Dashboard />
        </main>
      </SignOutLayout>
    );
  return (
    <SignInLayout>
      <main className="w-full">
        <Landing />
      </main>
    </SignInLayout>
  );
};

export default Home;
