import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const quickReplies = [
  "Service timings",
  "Where is the church?",
  "Upcoming events",
  "Prayer request"
];

function botReply(input) {
  const value = input.toLowerCase();
  if (value.includes("service") || value.includes("timing")) {
    return "Our Sunday worship service begins at 9:30 AM. Friday prayer fellowship begins at 7:00 PM.";
  }
  if (value.includes("where") || value.includes("location") || value.includes("address")) {
    return "Please use the Contact section for the church location and directions. The page includes a quick navigation link.";
  }
  if (value.includes("event")) {
    return "You can view the latest church gatherings in the Events section, including worship, prayer and community programs.";
  }
  if (value.includes("prayer")) {
    return "We would be glad to stand with you in prayer. Please use the contact form and write your prayer request in the message field.";
  }
  return "Thank you for reaching out to Jubilee Tamil Church. I can help with service timings, events, directions and prayer requests.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Vanakkam! Welcome to Jubilee Tamil Church. How can I help you today?" }
  ]);

  const send = (text = value) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "user", text: clean }, { from: "bot", text: botReply(clean) }]);
    setValue("");
  };

  return (
    <>
      <motion.button
        className="chat-fab"
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open church chatbot"
      >
        {open ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
          >
            <div className="chat-head">
              <span className="chat-icon"><Sparkles size={18} /></span>
              <div>
                <strong>JTC Connect</strong>
                <small>Church Assistant</small>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.from}`}>{msg.text}</div>
              ))}
            </div>

            <div className="quick-replies">
              {quickReplies.map(q => <button key={q} onClick={() => send(q)}>{q}</button>)}
            </div>

            <div className="chat-input">
              <input
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask a question..."
              />
              <button onClick={() => send()} aria-label="Send message"><Send size={18} /></button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
