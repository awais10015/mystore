import Navbar from "@/app/components/Navbar";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function SignInPage() {
  return (
    <>
      <Navbar bg="white" />
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your Furniture Shop account"
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
}
