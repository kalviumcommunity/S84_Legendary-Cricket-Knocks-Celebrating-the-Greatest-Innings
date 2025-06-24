import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import AddKnock from "./pages/AddKnock";
// import UpdateKnock from "./pages/UpdateKnock"; // New import
// import Navbar from "./components/Navbar";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import AddKnock from "./pages/addKnock";
import UpdateKnock from "./pages/updateKnock";

// App component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-knock" element={<AddKnock />} />
        <Route path="/update-knock/:id" element={<UpdateKnock />} />
        {/* Placeholder routes from Navbar */}
        <Route path="/videos" element={<div>Videos Page</div>} />
        <Route path="/pictures" element={<div>Pictures Page</div>} />
        <Route path="/insights" element={<div>Insights Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;