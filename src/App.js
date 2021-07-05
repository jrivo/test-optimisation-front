import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
//
import { Link, Router, Redirect } from "components/Router";
import Dynamic from "containers/Dynamic";

import "@blueprintjs/core/lib/css/blueprint.css";
import "./tailwind.min.css";
import "./app.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Data from "./pages/Data";
import SlowPage from "./pages/SlowPage";
// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
  return (
    <Root>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/data">Data</Link>
        <Link to="/slow-page">Slow Page</Link>
      </nav>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Redirect from="/" to="/login" />
            <Login path="/login" />
            <Home path="/home" />
            <Data path="/data" />
            <SlowPage path="slow-page" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
