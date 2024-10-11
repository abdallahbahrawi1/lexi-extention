import React from "react";
import { Routes, Route } from "react-router-dom";
import Popup from "./popup"; 
import MemorizedPage from "../MemorizedPage/MemorizedPage";
import Flashcards from "../Flashcards/Flashcards";

function comRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Popup />} />
        <Route path="/memorized" element={<MemorizedPage />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>  
    </>
  );
}

export default comRoutes;
