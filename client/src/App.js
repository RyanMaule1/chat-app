import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chats from "./Pages/Chats";
import { useAuthContext } from "./Hooks/useAuthContext";


function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login/> }/>
          <Route path="/signup" element={ <Signup/> }/>
          <Route path="/chats" element={user && <Chats/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
