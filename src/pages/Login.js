import { Button, InputGroup } from "@blueprintjs/core";
import { useNavigate } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../constants/general";
import { getUser, storeItem } from "../utils/actions";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate = useNavigate();

  const showButton = (
    <Button
      icon={showPassword ? "unlock" : "lock"}
      minimal={true}
      onClick={() => setShowPassword(!showPassword)}
    ></Button>
  );

  const login = async () => {
    setLoading(true);
    const query = { username, password };
    try {
      var res = await axios.post(SERVER_ADDRESS + "/login", query);
      console.log(res.status);
      console.log(res.data);
      console.log(res);
      storeItem("user", res.data.user);
      navigate("/data");
    } catch (error) {
      console.log(error);
      setInvalidCredentials(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (invalidCredentials) {
      setInvalidCredentials(false);
    }
  }, [username, password]);

  useEffect(() => {
    document.getElementsByTagName("nav")[0].style.display = "none";
    if(getUser())
    {
      navigate("/data")
    }
  }),
    [];
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white rounded-lg overflow-hidden shadow"
        style={{ width: 300 }}
      >
        <div className="flex justify-center bg-gray-100 py-6">ESGI</div>
        <div
          className={`px-2 rounded text-center bg-red-100 text-red-900 py-2 mt-4 mx-4 ${
            invalidCredentials ? "block" : "hidden"
          }`}
        >
          Invalid credentials
        </div>
        <div className="flex flex-col items-center w-full px-4">
          <InputGroup
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fill
            className="mb-4 mt-4"
          />
          <InputGroup
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={showButton}
            className="mb-4"
            fill
          />
          <Button
            className="mb-4"
            fill
            intent="primary"
            onClick={login}
            loading={loading}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
