import React from "react";
 const MessageList = ({messages}) => {
    const reversedMessages = [...messages].reverse()
 }
 return (
    <div>
        <h2>Messages</h2>
        <ul>
            {reversedMessages.map((messages,index) => (
                <li key={index}>
                    <span className="timestamp">
                        {new Date(messages.timestamp).toLocaleDateString()}
                    </span>
                    <span>
                        {messages.user ? message.user.username : 'Anonymous'}
                    </span>
                    {message.content}

                </li>
            ))}
        </ul>
    </div>
 )

 export default MessageList