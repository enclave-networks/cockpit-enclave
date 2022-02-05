import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./home.jsx";
import Enrol from "./enrol.jsx";
import NotRunning from "./not-running.jsx";
import constants from './constants.js';

export default function App() {
  return (
    <BrowserRouter basename='/cockpit'>
      <Routes>
        <Route path={`${constants.urlPrefix}/`} element={<Home />} />
        <Route path={`${constants.urlPrefix}/enrol`} element={<Enrol />} />
        <Route path={`${constants.urlPrefix}/not-running`} element={<NotRunning />} />
      </Routes>
    </BrowserRouter>
  );
}
