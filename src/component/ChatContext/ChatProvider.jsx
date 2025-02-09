import React from "react";
import {
  JOIN_ROOM,
  ADMIN_SEND_MESSAGE_EVENT,
  ADMIN_GET_USERS_LISTENER,
  ADMIN_GET_USERS_EVENT,
  ADMIN_GET_USER_CHAT_EVENT,
  ADMIN_GET_USER_CHAT_LIST_LISTENER,
  ADMIN_GET_USER_MESSAGE_LISTENER,
  ADMIN_JOINED_USER_ROOM_LISTENER,
} from "./eventconst.js";
import { io } from "socket.io-client";

export const ChatContext = React.createContext({});

const ChatProvider = (props) => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user_id") || "";

  const adminToken = sessionStorage.getItem("adminToken");
  const connectionUrl = process.env.REACT_APP_SOCKET_URL;

  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState({ data: [], total_count: 0 });
  const [connectionId, setConnectionId] = React.useState(userId || "");
  const [messageLoad, setMessageLoad] = React.useState(false);
  const [socketConnect, setSocketConnect] = React.useState(false);

  const socketRef = React.useRef();
  const socketConnectRef = React.useRef(0);
  const messagePageRef = React.useRef(0);
  const messageBottomRef = React.useRef(null);
  const ChatScrollRef = React.useRef(null);

  const getUserList = (userData) => {
    setUsers((users) => ({
      ...users,
      data: userData.user || [],
      total_count: userData.total_count || 0,
    }));
  };

  const getMessage = (messageRes) => {
    if (
      connectionId !== messageRes?.receiver?._id &&
      connectionId !== messageRes?.sender?._id
    ) {
      console.log("Message for another admin");
      return;
    }

    setMessages((prevMessages) => {
      if (prevMessages.some((msg) => msg.id === messageRes.id)) return prevMessages;
      return [...prevMessages, messageRes];
    });

    setTimeout(() => {
      messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getMessageList = (messages) => {
    setMessages(messages);
    setTimeout(() => {
      messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const loadMoreMessages = () => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(ADMIN_GET_USER_CHAT_EVENT, {
        receiver: connectionId,
        page: messagePageRef.current + 1,
      });
      messagePageRef.current += 1;
    }
  };

  const sendMessage = (messageBody) => {
    if (!socketRef.current?.connected) return "Please connect chat";
    socketRef.current.emit(ADMIN_SEND_MESSAGE_EVENT, messageBody);
    return "Message sent";
  };

  const roomListened = (data) => {
    console.log("User joined room:", data);
  };

  const createConnection = (id) => {
    setConnectionId(id);
    setMessages([]);
    messagePageRef.current = 0;

    socketRef.current?.emit(JOIN_ROOM, { receiver: id });
    socketRef.current?.emit(ADMIN_GET_USER_CHAT_EVENT, { receiver: id });
  };

  React.useEffect(() => {
    if (!adminToken) {
      setSocketConnect(false);
      return;
    }

    socketRef.current = io(connectionUrl, {
      extraHeaders: { auth: adminToken },
    });

    socketConnectRef.current = setInterval(() => {
      if (socketRef.current?.connected) {
        setSocketConnect(true);
        socketRef.current.emit(ADMIN_GET_USERS_EVENT);
        clearInterval(socketConnectRef.current);
      }
    }, 1000);

    socketRef.current.on("connect_error", () => {
      setSocketConnect(false);
      setTimeout(() => {
        socketRef.current.connect();
      }, 3000);
    });

    return () => {
      clearInterval(socketConnectRef.current);
      socketRef.current?.disconnect();
    };
  }, [adminToken, connectionUrl]);

  React.useEffect(() => {
    if (!socketConnect) return;

    socketRef.current.on(ADMIN_GET_USERS_LISTENER, getUserList);
    socketRef.current.on(ADMIN_GET_USER_CHAT_LIST_LISTENER, getMessageList);
    socketRef.current.on(ADMIN_GET_USER_MESSAGE_LISTENER, getMessage);
    socketRef.current.on(ADMIN_JOINED_USER_ROOM_LISTENER, roomListened);

    return () => {
      socketRef.current?.removeAllListeners();
    };
  }, [socketConnect]);

  React.useEffect(() => {
    if (userId && socketConnect) {
      createConnection(userId);
    }
  }, [userId, socketConnect]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        sendMessage,
        loadMoreMessages,
        createConnection,
        connectionId,
        messageBottomRef,
        ChatScrollRef,
        setConnectionId,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;











// 

// import React, { useContext, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Layout from "../Components/Layout/Layout";
// import { useState } from "react";
// import Nav from "react-bootstrap/Nav";
// import Tab from "react-bootstrap/Tab";
// import { ChatContext } from "../Components/context/ChatProvider";
// import { formatDateTime } from "../Utils/commonFiles";
// import { useDispatch, useSelector } from "react-redux";
// import { startstopLoading } from "../Redux/Reducers/globalSlice";

// export default function Messages() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { events, messages, sendMessage, setConnectionId, setEventId, messageBottomRef } = useContext(ChatContext)
//   const getInfo = useSelector((e) => e.userAuth.adminDetail);

//   const params = new URLSearchParams(window.location.search);
//   const userId = params.get("user_id") || '';
//   const eventId = params.get("event_id") || '';
//   let currentEvent = events?.data?.filter((res) => res._id === eventId)

//   const [message, setMessage] = useState('')
//   const [searchValue, setSearchValue] = useState('');
//   const [filteredEvents, setFilteredEvents] = useState(events?.data || []);
//   const [loading, setLoading] = useState(true);
//   const debounceTimeout = useRef(null); // Ref to store the timeout

//   const handleChat = (data) => {
//     setLoading(true)
//     const currentEventId = data._id
//     const currentUserId = data.client._id
//     setEventId(currentEventId)
//     setConnectionId(currentUserId)
//     navigate(`/messages?user_id=${currentUserId}&event_id=${currentEventId}`)
//     setTimeout(() => {
//       setLoading(false)
//     }, 300)
//   }

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (e.key === "Enter" && !e.shiftKey) {
//       if (!message.trim()) return;
//       // Capitalize the first letter of the first line of the message
//       const formattedMessage = message
//         .trim()
//         .split("\n")
//         .map((line, index) =>
//           index === 0
//             ? line.charAt(0).toUpperCase() + line.slice(1)
//             : line
//         )
//         .join("\n");
//       const data = {
//         message: formattedMessage,
//         receiver: userId,
//         event: eventId,
//       };
//       sendMessage(data);
//       setMessage(''); // Clear the message input after sending
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage(e);
//     }
//   };

//   const handleSearch = (value) => {
//     if (value.trim() === '') {
//       setFilteredEvents(events?.data || []);
//       setSearchValue(value);
//     } else {
//       let filtered = [...events.data]
//       const data = filtered.filter((res) => res.eventName.toLowerCase().includes(value.trim().toLowerCase()))
//       const data2 = filtered.filter((res) => res.client.fullName.toLowerCase().includes(value.trim().toLowerCase()))
//       let filteredData = data.length ? data : data2
//       setFilteredEvents(filteredData);
//       setSearchValue(value);
//     }
//   };

//   const clearSearch = () => {
//     setSearchValue('');
//     setFilteredEvents(events?.data || []); // Reset to all events
//   };

//   useEffect(() => {
//     if (searchValue) {
//       let filtered = [...events.data]
//       const data = filtered.filter((res) => res.eventName.toLowerCase().includes(searchValue.trim().toLowerCase()))
//       const data2 = filtered.filter((res) => res.client.fullName.toLowerCase().includes(searchValue.trim().toLowerCase()))
//       let filteredData = data.length ? data : data2
//       setFilteredEvents(filteredData);
//     }
//     else {
//       setFilteredEvents(events?.data || []);
//     }
//   }, [events]);

//   useEffect(() => {
//     dispatch(startstopLoading(true));
//     setTimeout(() => {
//       dispatch(startstopLoading(false));
//       setLoading(false)
//     }, 1000)
//   }, [])

//   return (
//     <Layout>
//       <Container fluid>
//         <Row className="mt-4">
//           <Col lg={4}>
//             <div className="filters mt-3">
//               <div className="inner-filter-field">
//                 <div className="messages-list">
//                   <div className="messages-search">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                     >
//                       <path
//                         d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
//                         stroke="#9F9EA1"
//                         stroke-width="1.33333"
//                         stroke-linecap="square"
//                         stroke-linejoin="round"
//                       />
//                       <path
//                         d="M13.9996 14.0001L11.0996 11.1001"
//                         stroke="#9F9EA1"
//                         stroke-width="1.33333"
//                         stroke-linecap="square"
//                         stroke-linejoin="round"
//                       />
//                     </svg>
//                     <input type="text" placeholder="Search clients..."
//                       onChange={(e) => handleSearch(e.target.value)}
//                       value={searchValue} />
//                     {searchValue && (
//                       <span
//                         className="clear-icon"
//                         onClick={clearSearch}
//                       >
//                         &times;
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <Tab.Container
//                       id="left-tabs-example"
//                       defaultActiveKey="first"
//                     >
//                       <Row>
//                         <Col sm={12}>
//                           <Nav variant="pills" className="messages-tabs">
//                             <Nav.Item>
//                               <Nav.Link eventKey="first">All Chats</Nav.Link>
//                             </Nav.Item>
   
//                           </Nav>
//                         </Col>
//                         <Col sm={12}>
//                           <Tab.Content>
//                             <Tab.Pane eventKey="first">
//                               <div className="message-box-chatlist">
//                                 <ul>

//                                   {filteredEvents.length > 0 ? (
//                                     filteredEvents.map((eventRes, index) => (
//                                       <li
//                                         key={eventRes._id || index}
//                                         onClick={() => handleChat(eventRes)}
//                                         className={`${eventRes._id === eventId && 'active'}`}
//                                       >
//                                         <div>
//                                           <div>
//                                             <h2 className="p-0 mb-1">{eventRes?.client?.fullName || 'Unknown Client'}</h2>
//                                             <p>{eventRes?.eventName}</p>
//                                           </div>
//                                           <div>
//                                             <span>{formatDateTime(eventRes?.latestMessageCreatedAt || eventRes?.createdAt)}</span>
//                                             {(eventRes._id !== eventId && eventRes?.isUnRead > 0) && (
//                                               <span className="msg-num">{eventRes?.isUnRead}</span>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </li>
//                                     ))
//                                   ) :
//                                     <>
//                                       {loading ?
//                                         <>
//                                           <div>

//                                           </div>
//                                         </>
//                                         :
//                                         <div className="no-data">
//                                           <p>No events available</p>
//                                         </div>
//                                       }
//                                     </>
//                                   }
//                                 </ul>
//                               </div>
//                             </Tab.Pane>
        
//                           </Tab.Content>
//                         </Col>
//                       </Row>
//                     </Tab.Container>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//           <Col lg={8}>
//             <div className="message-box-chatscreen mt-3">
//               <div className="chatscreen-top justify-content-between">
//                 {(eventId && userId) &&
//                   <>
//                     <h3>{currentEvent[0]?.client?.fullName || ''}</h3>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="25"
//                       viewBox="0 0 24 25"
//                       fill="none"
//                     >
//                       <g opacity="0.8">
//                         <path
//                           d="M12 13.5C12.5523 13.5 13 13.0523 13 12.5C13 11.9477 12.5523 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5C11 13.0523 11.4477 13.5 12 13.5Z"
//                           stroke="#132027"
//                           stroke-width="2"
//                           stroke-linecap="square"
//                           stroke-linejoin="round"
//                         />
//                         <path
//                           d="M12 6.5C12.5523 6.5 13 6.05228 13 5.5C13 4.94772 12.5523 4.5 12 4.5C11.4477 4.5 11 4.94772 11 5.5C11 6.05228 11.4477 6.5 12 6.5Z"
//                           stroke="#132027"
//                           stroke-width="2"
//                           stroke-linecap="square"
//                           stroke-linejoin="round"
//                         />
//                         <path
//                           d="M12 20.5C12.5523 20.5 13 20.0523 13 19.5C13 18.9477 12.5523 18.5 12 18.5C11.4477 18.5 11 18.9477 11 19.5C11 20.0523 11.4477 20.5 12 20.5Z"
//                           stroke="#132027"
//                           stroke-width="2"
//                           stroke-linecap="square"
//                           stroke-linejoin="round"
//                         />
//                       </g>
//                     </svg>
//                   </>
//                 }
//               </div>
//               <div className={`chatscreen-middle ${!messages?.length ? 'empty' : ''}`}>
//                 {(messages?.length && (eventId && userId)) ? (
//                   messages.map((messageRes, index) => (
//                     <>
//                       <div
//                         className={`${getInfo?._id === messageRes.sender?._id
//                           ? 'chat-right-side'
//                           : 'chat-left-side'
//                           }`}
//                       >
//                         <p style={{ whiteSpace: 'pre-wrap' }}>
//                           {messageRes?.message}
//                         </p>
//                         <span>{formatDateTime(messageRes?.createdAt)}</span>
//                       </div>
//                       <div ref={messageBottomRef} className="m-0"></div>
//                     </>
//                   ))
//                 ) : (
//                   <>
//                     {loading ? null : <div className="no-chat-message">
//                       <p> {(eventId && userId) ? 'No chats available. Please start a conversation.' : 'Click a thread to open chat.'}</p>
//                     </div>}
//                   </>
//                 )}
//               </div>

//               {(eventId && userId) && <form onSubmit={handleSendMessage}>
//                 <div className="chatscreen-bottom message-box-input">
//                   <textarea
//                     name="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(e)}
//                     placeholder="Write message here..."
//                   />
//                   {/* <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write message here..." /> */}
//                   <button type="submit">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       fill="none"
//                     >
//                       <g clip-path="url(#clip0_103_5849)">
//                         <path
//                           d="M0.143157 3.08995C-0.0154793 2.65963 -0.0411072 2.19157 0.0696001 1.74652C0.180307 1.30146 0.422238 0.899952 0.763991 0.594112C1.10298 0.287237 1.52615 0.0889965 1.97891 0.0249753C2.43166 -0.0390459 2.89321 0.0340903 3.30399 0.234945L18.379 7.27161C18.7697 7.45195 19.1167 7.71457 19.3965 8.0415C19.6762 8.36842 19.882 8.75193 19.9998 9.16578H3.37316L0.190657 3.19578C0.173134 3.16128 0.157283 3.12597 0.143157 3.08995ZM3.38482 10.8333L0.257324 16.8124C0.239945 16.8452 0.224908 16.8792 0.212324 16.9141C0.0543303 17.3445 0.0293644 17.8125 0.140667 18.2572C0.25197 18.702 0.494401 19.103 0.836491 19.4083C1.25758 19.7875 1.80399 19.9976 2.37066 19.9983C2.71149 19.9983 3.05316 19.9216 3.37149 19.7658L18.3807 12.7341C18.772 12.5532 19.1195 12.2898 19.3993 11.9618C19.6791 11.6338 19.8846 11.2491 20.0015 10.8341H3.38482V10.8333Z"
//                           fill="white"
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_103_5849">
//                           <rect width="20" height="20" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </button>
//                 </div>
//               </form>}
//             </div>
//           </Col>
//         </Row>
//         <div class="mb-0">
//           <p class="pb-4"></p>
//         </div>
//       </Container>
//     </Layout>
//   );
// }