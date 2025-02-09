import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../Components/Layout/Layout";
import { ChatContext } from "../Components/context/ChatProvider";
import { formatDateTime } from "../Utils/commonFiles";
import { useSelector } from "react-redux";

export default function Messages() {
  const navigate = useNavigate();
  const { users, messages, sendMessage, setConnectionId, messageBottomRef, loadMoreMessages } = useContext(ChatContext);
  const getInfo = useSelector((state) => state.userAuth.adminDetail);

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user_id") || "";

  const [message, setMessage] = useState("");

  // Find the current user based on userId
  const currentUser = users?.data?.find((user) => user._id === userId);

  // Handle user chat selection
  const handleChat = (data) => {
    setConnectionId(data._id);
    navigate(`/messages?user_id=${data._id}`);
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const data = {
      message,
      receiver: userId,
    };
    sendMessage(data);
    setMessage("");
  };

  // Load more messages when scrolling to the top
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0) {
      loadMoreMessages();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat on initial load
    if (messageBottomRef.current) {
      messageBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Layout>
      <Container fluid>
        <Row className="mt-4">
          {/* User List */}
          <Col lg={4} className="message-user-list">
            <div className="user-list">
              {users?.data?.length > 0 ? (
                users.data.map((user) => (
                  <div
                    key={user._id}
                    className={`user-item ${userId === user._id ? "active" : ""}`}
                    onClick={() => handleChat(user)}
                  >
                    <div className="user-name">{user.name}</div>
                    <div className="user-status">{user.status}</div>
                  </div>
                ))
              ) : (
                <p>No users available</p>
              )}
            </div>
          </Col>

          {/* Chat Screen */}
          <Col lg={8}>
            <div className="message-box-chatscreen mt-3">
              <div className="chatscreen-middle" onScroll={handleScroll} style={{ overflowY: "auto", height: "500px" }}>
                {messages?.length > 0 ? (
                  messages.map((messageRes, index) => (
                    <div
                      key={index}
                      className={`${
      getInfo?._id === messageRes.sender?._id ? "chat-right-side" : "chat-left-side"
                    }`}
                    >
                      <p>{messageRes?.message}</p>
                      <span>{formatDateTime(messageRes?.createdAt)}</span>
                    </div>
                  ))
                ) : (
                  <p>No messages yet</p>
                )}
                <div ref={messageBottomRef} className="m-0"></div>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage}>
                <div className="chatscreen-bottom message-box-input">
                  <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write message here..."
                  />
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_103_5849)">
                        <path
                          d="M0.143157 3.08995C-0.0154793 2.65963 -0.0411072 2.19157 0.0696001 1.74652C0.180307 1.30146 0.422238 0.899952 0.763991 0.594112C1.10298 0.287237 1.52615 0.0889965 1.97891 0.0249753C2.43166 -0.0390459 2.89321 0.0340903 3.30399 0.234945L18.379 7.27161C18.7697 7.45195 19.1167 7.71457 19.3965 8.0415C19.6762 8.36842 19.882 8.75193 19.9998 9.16578H3.37316L0.190657 3.19578C0.173134 3.16128 0.157283 3.12597 0.143157 3.08995ZM3.38482 10.8333L0.257324 16.8124C0.239945 16.8452 0.224908 16.8792 0.212324 16.9141C0.0543303 17.3445 0.0293644 17.8125 0.140667 18.2572C0.25197 18.702 0.494401 19.103 0.836491 19.4083C1.25758 19.7875 1.80399 19.9976 2.37066 19.9983C2.71149 19.9983 3.05316 19.9216 3.37149 19.7658L18.3807 12.7341C18.772 12.5532 19.1195 12.2898 19.3993 11.9618C19.6791 11.6338 19.8846 11.2491 20.0015 10.8341H3.38482V10.8333Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_103_5849">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
