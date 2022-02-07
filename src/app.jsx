import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./home.jsx";
import Enrol from "./enrol.jsx";
import NotRunning from "./not-running.jsx";
import { createRoute } from './routeHelper.js';

export default function App() {
  return (
    <BrowserRouter basename='/cockpit'>
      <Routes>
        <Route path={createRoute("/")} element={<Home />} />
        <Route path={createRoute("/enrol")} element={<Enrol />} />
        <Route path={createRoute("not-running")} element={<NotRunning />} />
      </Routes>
    </BrowserRouter>
  );
}
