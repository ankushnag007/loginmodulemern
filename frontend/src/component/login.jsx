import { useEffect, useState } from "react";
import "./App.css";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); 

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
      console.log(userData, "userData");

      localStorage.setItem("user", JSON.stringify(userData));
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);  

  return (
    <>
      <div></div>
      <h1 className="text-3xl font-bold ">Firebase Auth</h1>
      <div className="h-full w-full flex items-center justify-center p-10 b-gradient-to-br from-indigo-50 to-blue-100">
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
};

export default Login;