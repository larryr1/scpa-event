import { useEffect, useRef, useState } from "react";
import { deepEqual } from "../utilities/deep-equal";

/**
 * A component that will periodically fetch and display all the messages retrieved from the server.
 * @returns the component.
 */
export const Messages = () => {
  const [messageData, setMessageData] = useState([]);
  const pendingMessageData = useRef([]);

  // Responsible for fetching new data
  async function fetchNewData() {
    let response;
    try {
      response = await fetch("/messages");
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

  // Set the interval for fetching data
  useEffect(() => {
    const interval = setInterval(fetchNewData, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  
  // Loading text if we don't have any messages yet
  if (messageData.length === 0) {
    return (
      <div className="App-messageContainer">
        <p>Loading messages...</p>
      </div>
    )
  }

  // Display the messages
  return (
    <div className="App-messageContainer">
      {messageData.map(message => {
        return <p style={{ fontSize: "3rem"}}>{message}</p>
      })}
    </div>
  );

  
}