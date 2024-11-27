import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();


  const handleSignup = async () => {
    // Compare passwords and return true if they match
    if (password !== password2) {
      console.error("Passwords do not match");
      throw new Error("Passwords do not match");
    }

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("User signed up successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed", response);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return { email, setEmail, password, setPassword, setPassword2, handleSignup, error: null };

};

export default useSignup;