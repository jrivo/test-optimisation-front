import React, { useEffect } from "react";
import { Head } from "react-static";
import { useNavigate } from "./Router";


export function Layout({children}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Head>
        <title>Tests de performance et optimisation</title>
      </Head>
      <div className="flex-grow h-full overflow-y-auto flex flex-col">
        <div className="flex-grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Layout;