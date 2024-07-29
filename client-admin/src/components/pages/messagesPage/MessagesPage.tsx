import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./messagePage.scss";
import useAsyncEffect from "use-async-effect";
import axios from "axios";

interface Message {
  id: string;
  message: string;
}

export const MessagesPage = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesDirty, setMessagesDirty] = useState(false);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setMessages((array) => arrayMoveImmutable(array, oldIndex, newIndex))
    setMessagesDirty(true);
  }

  const newMessage = () => {
    const msg = prompt("Enter your new message.");
    if (msg !== null) {
      setMessages([{ id: uuidv4(), message: msg }, ...messages]);
      setMessagesDirty(true);
    }
  }

  const deleteMessage = (key: string) => {
    setMessages(messages.filter(msg => msg.id !== key));
    setMessagesDirty(true);
  }

  const submitMessages = async () => {
    if (!messagesDirty) return;
    console.log("Submitting new messages.");

    const response = await axios.post("/api/messages", { messages: messages }, { withCredentials: true });
    console.log(response.status);
    setMessagesDirty(false);
  }

  useAsyncEffect(async () => {
    try {
      const response = await axios.get("/api/messages", { headers: { "Content-Type": "application/json"}, withCredentials: true });

      if (response.status !== 200) {
        console.log(JSON.stringify(response));
       throw new Error("Recieved a status code that is not 200.");
      }

      console.log("Res is " + JSON.stringify(response.data) ); 

      setMessages(response.data);
    } catch (error) {
      console.log(error)
      alert("Error fetching messages. Check console logs.");
    }
  }, []);

  return (
    <div>
      <h1>Messages Configuration</h1>
      <p className="fw-bold">Set custom messages that will be cycled on any event displays.</p>
      <ul>
        <li>Click <span className="text-success">Add Message</span> to add a new message.</li>
        <li>Click <span className="text-danger">Delete</span> on a message to delete it.</li>
        <li>Click and drag to adjust the order the messages show.</li>
        <li>Any changes you make will show within seconds after saving.</li>
      </ul>

      <p className="fw-bold">First Message ⬇️</p>
      <SortableList onSortEnd={onSortEnd} className="rounded p-2 messageList mb-3" draggedItemClassName="draggedMessage">
        {messages.map((msg) => {
          return (
            <SortableItem key={msg.id}>
              <div className="message border rounded p-2 mt-2 mb-2 bg-white d-flex">{msg.message}<button className="ms-auto border-0 bg-danger text-white rounded" onClick={() => deleteMessage(msg.id)}>Delete</button></div>
            </SortableItem>
          );
        })}
      </SortableList>
      <p className="fw-bold">Last Message ⬆️</p>
      <button className="btn btn-success me-2" onClick={newMessage}>Add Message</button>
      <button className="btn btn-primary" disabled={!messagesDirty} onClick={submitMessages}>Save</button>
    </div>
  )
}