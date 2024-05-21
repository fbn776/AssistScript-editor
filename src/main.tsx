import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Help from "./pages/Help.tsx";
import Layout from "./Layout.tsx";
import App from "./pages/App.tsx";
import {NoPage} from "./pages/NoPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<App />} />
                  <Route path="help" element={<Help />} />
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
