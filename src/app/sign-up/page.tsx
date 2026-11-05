import Navbar from "@/app/components/Navbar";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <>
      <Navbar bg="white" />
      <AuthLayout
        title="Create your account"
        subtitle="Sign up to shop and manage your cart"
      >
        <SignupForm />
      </AuthLayout>
    </>
  );
}
