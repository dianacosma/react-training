import UsersOverview from "./components/pages/users";
import "./App.css";
import TokenContext from "./common/contexts/tokenContext";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDetails from "./components/pages/user-details";

function App() {
  const [token, setToken] = useState("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/users/:id" element={<UserDetails />} />
          <Route exact path="/" element={<UsersOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
