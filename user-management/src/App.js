import UsersOverview from "./components/pages/users";
import "./App.css";
import TokenContext from "./common/contexts/tokenContext";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("token");

  return (
    <div className="App">
      <TokenContext.Provider value={token}>
        <UsersOverview />
        {/* <CommentsOverview /> */}
      </TokenContext.Provider>
      <button onClick={() => setToken("new token")}>Change context</button>
    </div>
  );
}

export default App;
