import React from 'react';
import './App.css';
import {NotFound} from "./pages/error/notFound";
import Home from "./pages/main/home";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
