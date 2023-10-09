import { Landing } from "@/features/landing";
import SignOutLayout from "@/features/signOutLayout/layout";

const Home = () => {
  return (
    <SignOutLayout>
      <main>
        <Landing />
      </main>
    </SignOutLayout>
  );
};

export default Home;
