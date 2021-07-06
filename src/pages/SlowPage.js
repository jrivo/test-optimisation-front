import { Icon, Spinner } from "@blueprintjs/core";
import { useNavigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../constants/general";
import { getUser } from "../utils/actions";

export function SlowPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await fetch(SERVER_ADDRESS + "/heavy-operation", {
      method: "GET",
    });
    setLoading(false);
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUser() ? null : navigate("/login");
    fetchData();
  }, []);
  return (
    <div>
      <div className="h-screen">
        {loading ? (
          <div className="flex flex-col items-center pt-64">
            <div>
              <Spinner intent="primary" />
            </div>
            <div className="pt-4">Operation pending...</div>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-64">
            <div>
              <Icon icon="tick" intent="success" iconSize={60} />
            </div>
            <div className="pt-4">Operation successful</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SlowPage;
