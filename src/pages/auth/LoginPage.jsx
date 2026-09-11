import LoginForm from "../../components/auth/LoginForm";
import LoginBrandPanel from "../../components/auth/LoginBrandPanel";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      <LoginBrandPanel />
    </div>
  );
}