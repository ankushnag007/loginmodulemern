import { useState } from "react";
import "./App.css";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";


const  Login = ()=> {
  const [count, setCount] = useState(0);

  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        phoneNumber: user.phoneNumber,
      };

      const apiResponse = await fetch(
        "http://localhost:4000/api/auth/google-login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "Loginlication/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("error fetching login");
      }

      const data = await apiResponse.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div></div>
      <h1 className="text-3xl font-bold ">Firebase Auth</h1>
      <div className="card">
        <button
          className="flex flex-row items-center justify-center gap-2"
          onClick={googleLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
            className="h-5 w-5"
            alt="Google logo"
          />
          Signup with google
        </button>
      </div>
    </>
  );
}

export default Login;
