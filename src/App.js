import "./App.css";
import { useState } from "react";
import Signin from "./components/Signin";
import TwilioVideos from "./components/TwilioVideos";

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("room");

  const [token, setToken] = useState("");
  return (
    <div className="app">
      {!token ? (
        <Signin
          setToken={setToken}
          setName={setName}
          name={name}
          setRoom={setRoom}
          room={room}
        />
      ) : (
        <TwilioVideos token={token} room={room} />
      )}
    </div>
  );
}

export default App;
