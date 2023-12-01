import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Chatbot.module.scss";
import { Spinner, sendIcon } from "../../assets";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
// import { BiLoader } from "react-icons/bi";

const Chatbot = () => {
  
  const [chatMessages, setChatMessages] = useState(() => {
    const storedChatData = localStorage.getItem("chatData");
    if (storedChatData) {
      const parsedChatData = JSON.parse(storedChatData);
      return parsedChatData.chatMessages || [];
    }
    return [
      {
        role: "system",
        content: "Welcome to the chat! How can I assist you today?",
        timestamp: Date.now(),
      },
    ];
  });

  const [conversationHistory, setConversationHistory] = useState(() => {
    const storedChatData = localStorage.getItem("chatData");
    if (storedChatData) {
      const parsedChatData = JSON.parse(storedChatData);
      return parsedChatData.conversationHistory || [];
    }
    return [];
  });
  const [inputValue, setInputValue] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const chatContainerRef = useRef(null);
 

  const apiKey = "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";
  const model = "gpt-3.5-turbo";

 

  // Save chat history to local storage whenever chatMessages or conversationHistory change
  useEffect(() => {
    const chatData = {
      chatMessages: chatMessages,
      conversationHistory: conversationHistory,
    };
    localStorage.setItem("chatData", JSON.stringify(chatData));
  }, [chatMessages, conversationHistory]);


    const checkCreditsAndProceed = (action) => {
    const currentCredits = parseInt(localStorage.getItem("credits") || "0", 10);
    if (currentCredits <= 0) {
      alert("You have used all your credits. Please create an account to continue.");
      return false;
    }

    action();
    localStorage.setItem("credits", (currentCredits - 1).toString());
    return true;
  };


  const handleClick = () => {
    if (!inputValue.trim() || isWaitingForResponse) {
      return;
    }

    const proceed = checkCreditsAndProceed(() => {
      setIsWaitingForResponse(true);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${apiKey}`);
      myHeaders.append("Origin", "https://chatbot.cyberasol.com");

      const userMessageObj = {
        role: "user",
        content: inputValue,
      };

      const messages = [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...conversationHistory, 
        userMessageObj,
      ];

      const raw = JSON.stringify({
        model: model,
        messages: messages,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (
            data &&
            data.choices &&
            data.choices[0] &&
            data.choices[0].message
          ) {
            const assistantResponse = {
              role: "assistant",
              content: data.choices[0].message.content,
              timestamp: Date.now(),
            };

            setChatMessages((prevMessages) => [
              ...prevMessages,
              assistantResponse,
            ]);

            setIsWaitingForResponse(false);
            setConversationHistory((prevHistory) => [
              ...prevHistory,
              userMessageObj,
            ]);

            localStorage.setItem("chatData", JSON.stringify({
              messages: chatMessages,
              conversationHistory: conversationHistory,
            }));
          }
        }).catch((error) => {
          console.error("Error fetching response:", error);
          setIsWaitingForResponse(false);
        });
    });

    if (!proceed) return;

    setInputValue(""); 
};
  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      // Don't send empty messages
      return;
    }


    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        content: inputValue,
        role: "user",
      },
    ]);
  
    setInputValue(""); 
  };


  useEffect(() => {
  
    scrollToBottom();
  }, [chatMessages]);



 

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }

  return (
    <>
      {/* // ********************* Chat Bot *********************** */}
      <div className={styles.chatbot_container}>
        <div className={styles.chatbot_container_content}>
          <div
            className={styles.chatbot_container_content_innercontent}
            ref={chatContainerRef}
          >
            {chatMessages.map((message, ind) => (
              <div
                key={`${ind}-${message.timestamp || Date.now()}`}
                className={
                  message.role === "user"
                    ? styles.chatbot_container_content_innercontent_sender
                    : styles.chatbot_container_content_innercontent_receiver
                }
              >
                {message.role === "user" ? (
                  <Sender mtext={message.content} />
                ) : (
                  <Receiver
                    mtext={message.content}
                    isLoading={isWaitingForResponse}
                  />
                )}
              </div>
            ))}
            {isWaitingForResponse && (
              <div className={styles.loading_container}>
                <img src={Spinner} alt="GIF" />
                <p>
                  {/* <BiLoader /> */}
                  Loading...
                </p>
              </div>
            )}
          </div>

          <div className={styles.chatbot_container_content_inputBox}>
            <div className={styles.chatbot_container_content_inputBox_content}>
              <textarea
                type="text"
                rows="10"
                placeholder="Write a message"
                value={inputValue} // Bind to inputValue
                onChange={(e) => setInputValue(e.target.value)} // Update inputValue on change
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? e.shiftKey
                      ? setInputValue((prevValue) => prevValue + "\n")
                      : (e.preventDefault(), handleSendMessage(), handleClick())
                    : null
                }
                disabled={isWaitingForResponse}
                style={{
                  cursor: isWaitingForResponse ? "not-allowed" : "auto",
                }}
              />
              <img
                src={sendIcon}
                alt="Icons"
                onClick={() => {
                  handleSendMessage();
                  handleClick();
                }}
                style={{
                  cursor: isWaitingForResponse ? "not-allowed" : "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;

// ********************* Chat Bot Receiver messageBox Component ***********************
const Receiver = (props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null); 
  const location = useLocation(); 

  const startSpeech = useCallback((text) => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null; 
    };
    utterance.onstart = () => {
      setIsSpeaking(true); 
    };

    speechSynthesis.speak(utterance);
    utteranceRef.current = utterance; 
  }, []);

  const cancelSpeech = useCallback(() => {
    if (utteranceRef.current) {
      speechSynthesis.cancel(); 
      utteranceRef.current = null; 
    }
    setIsSpeaking(false); 
  }, []);

  const toggleSpeech = useCallback(() => {
    if (isSpeaking) {
      cancelSpeech(); 
    } else {
      startSpeech(props.mtext); 
    }
  }, [isSpeaking, props.mtext, cancelSpeech, startSpeech]);

 
  useEffect(() => {
    return () => {
      cancelSpeech(); 
    };
  }, [location, cancelSpeech]);
  return (
    <>
      <div className={styles.receiver}>
        <div className={styles.receiver_content}>
          <p>{props.mtext}</p>
        </div>
        <div onClick={toggleSpeech}>
          {isSpeaking ? (
            <span>
              <BsFillPauseCircleFill />
            </span>
          ) : (
            <span>
              <BsFillPlayCircleFill />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

// ********************* Chat Bot Sender messageBox Component ***********************
const Sender = (props) => {
  return (
    <>
      <div className={styles.sender}>
        <p>{props.mtext}</p>
      </div>
    </>
  );
};
