import React, { useEffect, useState } from 'react';
import { joinRoom, receiveMessage, sendMessage, socket } from '../socket';
import axios from 'axios';

const ChatPage = () => {
    const [msgInput, setMsgInput] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const chat_id = "676a5b01df8fb093f0478460";
    const API_BASE_URL = "http://localhost:3000/api";

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/chat/messages/${chat_id}`);
            setAllMessages(response.data?.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {

        joinRoom(chat_id);
        fetchMessages();

        const handleNewMessage = (newMessage) => {
            console.log('new message', newMessage);
            fetchMessages();
        };

        receiveMessage(handleNewMessage);

        return () => { socket.off("receiveMessage", handleNewMessage) };

    }, []);

    const fnSendMsg = async () => {
        if (!msgInput.trim()) return;

        const messageData = { chat_id: chat_id, sender_id: "6765931ff4effbc965585998", content: msgInput };

        try {
            const response = await axios.post(`${API_BASE_URL}/chat/messages`, messageData);
            if (response?.data?.data?.length > 0) {
                const messages = response?.data?.data;
                setAllMessages(prevMessages => [...prevMessages, ...messages]);
                sendMessage(chat_id, msgInput);
                setMsgInput("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 max-h-[500px] overflow-y-auto">
                    {allMessages?.map((msg) => (
                        <div key={msg?._id}>
                            <p>{msg?.content}</p>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-2">
                    <input
                        className="flex-1 p-2 border rounded"
                        placeholder="Write Message..."
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={fnSendMsg}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;