import { BrowserRouter, Route, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import HomePage from "./pages/HomePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/*" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}
