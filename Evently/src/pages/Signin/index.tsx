import SigninForm from "./SigninForm";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;
