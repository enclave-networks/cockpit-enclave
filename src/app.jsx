import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./home.jsx";
import Enrol from "./enrol.jsx";
import NotRunning from "./not-running.jsx";

export default function App () {
    return(
        <BrowserRouter basename='/cockpit/@localhost/enclave/index.html'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="enrol" element={<Enrol />} />
            <Route path="not-running" element={<NotRunning />} />
          </Routes>
        </BrowserRouter>
      );
}
