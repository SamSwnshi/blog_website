import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-5 text-center items-center bg-gray-700">
      
        <h1 className="text-2xl">Blog App</h1>
     
      <div className="flex gap-4">
        <p>Home</p>
        <p>Login</p>
        <p>SignUp</p>
      </div>
    </div>
  );
};

export default Header;
