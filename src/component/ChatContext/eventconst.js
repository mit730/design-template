// export const JOIN_ROOM = "joinRoom";
// export const ADMIN_GET_USERS_EVENT = "get_user";
// export const ADMIN_GET_USER_CHAT_EVENT = "get_chat";
// export const ADMIN_SEND_MESSAGE_EVENT = "send_message";

// export const ADMIN_GET_USERS_LISTENER = "user";
// export const ADMIN_GET_USER_CHAT_LIST_LISTENER = "messages";
// export const ADMIN_GET_USER_MESSAGE_LISTENER = "receive_message";
// export const ADMIN_JOINED_USER_ROOM_LISTENER = "joinedRoomUser";





import React from "react";
import { JOIN_ROOM, ADMIN_SEND_MESSAGE_EVENT, ADMIN_EVENTS_LISTING_LISTENER, ADMIN_EVENTS_LISTING_EVENT, ADMIN_GET_USER_CHAT_EVENT, ADMIN_GET_USER_CHAT_LIST_LISTENER, ADMIN_GET_USER_MESSAGE_LISTENER, ADMIN_JOINED_USER_ROOM_LISTENER } from "./eventconst.ts";
import { io } from "socket.io-client";

export const ChatContext = React.createContext({})

const ChatProvider = (props) => {

    const params = new URLSearchParams(window.location.search);
    const userId = params.get("user_id") || '';
    const eventid = params.get("event_id") || '';

    const adminToken = sessionStorage.getItem('adminToken')
    const connectionUrl = process.env.REACT_APP_SOCKET_URL

    const [messages, setMessages] = React.useState([])
    const [events, setEvents] = React.useState({ data: [], total_count: 0 });
    const [connectionId, setConnectionId] = React.useState(userId || '');
    const [eventId, setEventId] = React.useState(eventid || '');
    const socketRef = React.useRef();
    const [messageLoad, setMessageLoad] = React.useState(false)
    const [socketConnect, setSocketConnect] = React.useState(false)
    const socketConnectRef = React.useRef(0)
    const messagePageRef = React.useRef(0)
    const messageBottomRef = React.useRef()
    const ChatScrollRef = React.useRef()
    const connectionIdRef = React.useRef('')
    const listenersInitialized = React.useRef(false);
    const eventsRef = React.useRef([]);

    const getEventsList = (eventsData) => {
        setEvents((events) => {
            return {
                ...events,
                data: eventsData.events,
            }
        });
        eventsRef.current = eventsData.events
    }

    const getMessage = (messageRes) => {
        const params = new URLSearchParams(window.location.search);
        const eventid = params.get("event_id") || '';
        if (eventid !== messageRes?.event?._id) {
            console.log('another User');
            return;
        }
        let filteredData = eventsRef.current
        let index = filteredData.findIndex((res) => res?._id === eventid)
        if (index !== -1) {
            filteredData[index].isUnRead = 0
            setEvents((events) => {
                return {
                    ...events,
                    data: filteredData,
                }
            });
        }
        setMessages((prevMessages) => [...prevMessages, messageRes]);
        setTimeout(() => {
            messageBottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }, 200);
    };

    const getMessageList = (messages) => {
        const params = new URLSearchParams(window.location.search);
        const eventid = params.get("event_id") || '';
        setMessages(messages)
        let filteredData = eventsRef.current
        let index = filteredData.findIndex((res) => res?._id === eventid)
        if (index !== -1) {
            filteredData[index].isUnRead = 0
            setEvents((events) => {
                return {
                    ...events,
                    data: filteredData,
                }
            });
        }
        setTimeout(() => {
            messageBottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }, 200);
    }

    const sendMessage = (messageBody) => {
        if (!socketRef.current?.connected) return 'Please connect chat';
        socketRef.current?.emit(ADMIN_SEND_MESSAGE_EVENT, messageBody);
        return 'Message sent'
    };

    const roomListened = (data) => {
    }

    const createConnection = (receiver, event) => {
        setConnectionId('')
        setEventId('')
        setMessages([])
        messagePageRef.current = 0
        let data = { receiver, event }
        socketRef.current?.emit(JOIN_ROOM, data);
        socketRef.current?.emit(ADMIN_GET_USER_CHAT_EVENT, data);
    };

    React.useEffect(() => {
        if (!adminToken) {
            setSocketConnect(false);
            return;
        }

        socketRef.current = io(connectionUrl, {
            extraHeaders: {
                auth: adminToken,
            },
        });

        socketConnectRef.current = setInterval(() => {
            if (socketRef.current?.connected) {
                setSocketConnect(true);
                let data = { search: '' };
                socketRef.current?.emit(ADMIN_EVENTS_LISTING_EVENT, data);
            }
        }, 1000);

        return () => {
            if (socketConnectRef.current) clearInterval(socketConnectRef.current);
            if (socketRef.current?.connected) {
                socketRef.current.disconnect();
            }
        };
    }, [adminToken]);

    React.useEffect(() => {
        if (socketRef.current?.connected && !listenersInitialized.current) {
            listenersInitialized.current = true;

            socketRef.current.on(ADMIN_EVENTS_LISTING_LISTENER, getEventsList);
            socketRef.current.on(ADMIN_GET_USER_CHAT_LIST_LISTENER, getMessageList);
            socketRef.current.on(ADMIN_GET_USER_MESSAGE_LISTENER, getMessage);
            socketRef.current.on(ADMIN_JOINED_USER_ROOM_LISTENER, roomListened);
        }

        return () => {
            if (socketRef.current?.connected) {
                socketRef.current.removeAllListeners(ADMIN_EVENTS_LISTING_LISTENER);
                socketRef.current.removeAllListeners(ADMIN_GET_USER_CHAT_LIST_LISTENER);
                socketRef.current.removeAllListeners(ADMIN_GET_USER_MESSAGE_LISTENER);
                socketRef.current.removeAllListeners(ADMIN_JOINED_USER_ROOM_LISTENER);
            }
        };
    }, [socketConnect, adminToken]);

    React.useEffect(() => {
        if (userId && eventId && socketConnect) {
            createConnection(userId, eventId);
        }
    }, [userId, connectionId, eventId, socketConnect]);

    return <ChatContext.Provider value={{ messages, socketRef, setEvents, messageBottomRef, messagePageRef, ChatScrollRef, events, setConnectionId, connectionId, setEventId, eventId, setMessages, createConnection, sendMessage }}>
        {props.children}
    </ChatContext.Provider>
}
export default ChatProvider;