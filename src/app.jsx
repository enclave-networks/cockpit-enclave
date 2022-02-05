import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./home.jsx";
import Enrol from "./enrol.jsx";
import NotRunning from "./not-running.jsx";

export default function App() {
  let urlPrefix = ':id/enclave/index.html';
  return (
    <BrowserRouter basename='/cockpit/'>
      <Routes>
        <Route path={`${urlPrefix}/`} element={<Home />} />
        <Route path={`${urlPrefix}/enrol`} element={<Enrol />} />
        <Route path={`${urlPrefix}/not-running`} element={<NotRunning />} />
      </Routes>
    </BrowserRouter>
  );
}
