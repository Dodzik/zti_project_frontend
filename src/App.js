import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import LoggingScreen from "./screens/LoggingScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import UserPanelScreen from "./screens/UserPanelScreen";


function App() {
  const [userId , setUserId] = useState();
  const [auth, setAuth] = useState(false);
  return (
      <Router>
        <Routes>
          <Route extact path="/" element={<LoggingScreen userId={userId} setUserId={setUserId} auth={auth} setAuth={setAuth}/>} ></Route>
          <Route extact path="/RegistrationScreen" element={<RegistrationScreen/>} ></Route>
            <Route extact path="/UserPanel" element={<UserPanelScreen userId={userId} setUserId={setUserId} auth={auth} setAuth={setAuth}/>} ></Route>
        </Routes>
      </Router>

  );
}

export default App;
