import React from "react";
import axios from "axios";

function Signin({ setToken, setName, setRoom, name, room }) {
  async function handleSubmit(e) {
    e.preventDefault();

    const result = await axios.post(
      "https://video-call-2947-dev.twil.io/video-token",
      {
        identity: name,
        room: room,
      }
    );

    setToken(result.data);
    console.log("Got the token with value: ", result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label htmlFor="room">
        Room
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </label>
      <br></br>
      <button type="submit">Join the chat</button>
    </form>
  );
}

export default Signin;
