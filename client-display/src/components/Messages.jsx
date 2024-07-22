import { useEffect, useRef, useState } from "react";
import { deepEqual } from "../utilities/deep-equal";

export const Messages = () => {
  const [messageData, setMessageData] = useState([]);
  const pendingMessageData = useRef([]);

  async function getNewData() {
    console.log("Getting new message data");

    let response;
    try {
      response = await fetch("http://10.16.197.121:8000/messages");
    } catch (error) {
      console.log(error);
      pendingMessageData.current = ["FETCH_ERR_CHECK_LOGS"];
      setMessageData(["FETCH_ERR_CHECK_LOGS"]);
      return;
    }

    console.log("Getting new data in Messages.");
    
    const messages = await response.json();
    if (!deepEqual(pendingMessageData.current, messages)) {
      pendingMessageData.current = messages;
      setMessageData(messages);
    }
  }

  useEffect(() => {
    const interval = setInterval(getNewData, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  
  if (messageData.length === 0) {
    return (
      <div className="App-messageContainer">
        <p>Loading messages...</p>
      </div>
    )
  } else {
    return (
      <div className="App-messageContainer">
        {messageData.map(message => {
          return <p style={{ fontSize: "3rem"}}>{message}</p>
        })}
      </div>
    );
  }

  
}