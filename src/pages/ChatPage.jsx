import React, { useEffect, useState, useRef } from 'react';
import { joinRoom, receiveMessage, sendMessage, socket } from '../socket';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetRoomQuery } from '../redux/storeApis';
import { config } from '../constants';

const ChatPage = () => {
    const location = useLocation();
    const messagesEndRef = useRef(null);

    const receiver_id = location.state?.receiver_id ?? null;
    const sender_id = location.state?.sender_id ?? null;

    const { data: getChatRoom, isSuccess: isSuccessGetChatRoom } = useGetRoomQuery({ sender_id, receiver_id },{ skip: !receiver_id && !sender_id });

    const [msgInput, setMsgInput] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [chat_id, setChat_id] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { scrollToBottom(); }, [allMessages]);

    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            console.log('new message received', newMessage);
            setAllMessages(prevMessages => [...prevMessages, newMessage]);
        };
        // Set up socket listener
        receiveMessage(handleReceiveMessage);
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []);

    useEffect(() => {
        if (getChatRoom?.data?._id) {
            setChat_id(getChatRoom.data._id);
        }
    }, [isSuccessGetChatRoom]);

    useEffect(() => {
        if (chat_id) {
            joinRoom(chat_id);
            fetchMessages();
        }
    }, [chat_id]);

    const fetchMessages = async () => {
        if (!chat_id) return;
        try {
            setIsLoading(true);
            const response = await axios.get(`${config.serverApiUrl}chat/messages/${chat_id}`);
            setAllMessages(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fnSendMsg = async () => {
        if (!msgInput.trim() || !chat_id) return;

        const messageData = { chat_id: chat_id, sender_id, content: msgInput.trim(), };

        try {
            const response = await axios.post(`${config.serverApiUrl}chat/messages`, messageData);
            if (response?.data?.data) {
                // Add new message to local state immediately
                const newMessage = response?.data?.data;
                setAllMessages(prevMessages => [...prevMessages, newMessage]);

                // Emit message to the server for real-time broadcasting
                sendMessage(chat_id, newMessage);
                setMsgInput("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            fnSendMsg();
        }
    };

    return (
        <div className="p-4 h-screen flex flex-col">
            <div className="flex-1 flex flex-col space-y-4">
                {/* Messages Section */}
                <div className="flex-1 flex flex-col space-y-2 overflow-y-auto">
                    {isLoading ? (
                        <div className="text-center py-4">Loading messages...</div>
                    ) : (
                        <>
                            {allMessages.map((msg) => (
                                <div
                                    key={msg?._id}
                                    className={`p-2 rounded-lg max-w-[70%] ${msg?.sender_id === sender_id
                                            ? 'bg-blue-500 text-white self-end'
                                            : 'bg-gray-200 self-start'
                                        }`}
                                >
                                    <p>{msg?.content}</p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Section */}
                <div className="flex space-x-2 p-4 bg-white">
                    <input
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write a message..."
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                        onClick={fnSendMsg}
                        disabled={!msgInput.trim() || !chat_id}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;