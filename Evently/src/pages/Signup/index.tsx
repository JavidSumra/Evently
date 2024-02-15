import React from "react";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
