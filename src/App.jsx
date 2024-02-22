import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ManageCars from "./components/admin/ManageCars";

function App() {
  return (
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/admin/manage-cars" element={<ManageCars />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
