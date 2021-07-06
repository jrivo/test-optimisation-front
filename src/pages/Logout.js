import { useNavigate } from "@reach/router";
import { useEffect } from "react";
import { removeUser } from "../utils/actions";

export function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    removeUser();
    navigate("/login");
  }, []);
  return null;
}

export default Logout;
