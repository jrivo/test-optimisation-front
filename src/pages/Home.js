import React, { useEffect } from "react";

export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-grow justify-center h-screen pt-64 text-4xl text-blue-500 font-semibold animate-pulse">
      Performance and optimization testing
    </div>
  );
}

export default Home;
