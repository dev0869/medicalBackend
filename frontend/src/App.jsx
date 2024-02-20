import { Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect } from "react";
import axios from "axios";
import { option, option2 } from "./utils";
const App = () => {
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/user/Verify",
          // {},
          // option
        );
        console.log(res.data);
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          const res1 = await axios.post(
            "http://localhost:8000/api/user/refreshAccessToken",
            {},
            option2
          );
          localStorage.setItem("AccessToken", res1.data.data);
        }
        console.log(error);
      }
    };
    verify();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default App;
