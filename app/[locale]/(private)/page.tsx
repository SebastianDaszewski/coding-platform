import { Dashboard } from "@/features/dashboard";
import SignInLayout from "@/features/signInLayout/layout";

const Home = () => {
  return (
    <SignInLayout>
      <main>
        <Dashboard />
      </main>
    </SignInLayout>
  );
};

export default Home;
