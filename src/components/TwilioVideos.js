import React, { useEffect, useRef } from "react";
import TwilioVideo from "twilio-video";

function TwilioVideos({ token, room }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  function appendNewParticipant(track, identity) {
    const chat = document.createElement("DIV");
    chat.setAttribute("id", identity);
    chat.appendChild(track.attach());
    remoteVideoRef.current.appendChild(chat);
  }

  useEffect(() => {
    TwilioVideo.connect(token, {
      video: true,
      audio: true,
      name: room,
    }).then((room) => {
      console.log(room);
      TwilioVideo.createLocalVideoTrack().then((track) => {
        localVideoRef.current.appendChild(track.attach());
      });
      function removeParticipant(participant) {
        console.log("Removing Participant with identity", participant.identity);
        const elem = document.getElementById(participant.identity);
        elem.parentNode.removeChild(elem);
      }
      function addParticipant(participant) {
        console.log("Add a new participant");
        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            const track = publication.track;
            appendNewParticipant(track, participant.identity);
            console.log("Attached a Track");
          }
        });

        participant.on("trackSubscribed", (track) => {
          console.log("Append a new track");
          appendNewParticipant(track, participant.identity);
        });
      }
      room.participants.forEach(addParticipant);
      room.on("participantConnected", addParticipant);
      room.on("participantDisconnected", removeParticipant);
    });
  }, [token, room]);

  return (
    <div>
      <h1>Your in Room: {room} </h1>
      <div ref={localVideoRef}></div>
      <div ref={remoteVideoRef}></div>
    </div>
  );
}

export default TwilioVideos;
