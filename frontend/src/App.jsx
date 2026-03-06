import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import View from "./pages/View";

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </>
  );
}

export default App;