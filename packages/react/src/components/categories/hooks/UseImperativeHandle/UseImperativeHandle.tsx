import React from "react";
import cn from "classnames";
import { Button } from "@/vendors/bootstrap";
import styles from "./UseImperativeHandle.module.scss";

const allMessages = [
  `Leia: Aren't you a little short to be a stormtrooper?`,
  `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
  `Leia: You're who?`,
  `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
  `Leia: Ben Kenobi is here! Where is he?`,
  `Luke: Come on!`,
  `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
  `Leia: Put that thing away! You're going to get us all killed.`,
  `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
  `Leia: It could be worse...`,
  `Han: It's worse.`,
  `Luke: There's something alive in here!`,
  `Han: That's your imagination.`,
  `Luke: Something just moves past my leg! Look! Did you see that?`,
  `Han: What?`,
  `Luke: Help!`,
  `Han: Luke! Luke! Luke!`,
  `Leia: Luke!`,
  `Leia: Luke, Luke, grab a hold of this.`,
  `Luke: Blast it, will you! My gun's jammed.`,
  `Han: Where?`,
  `Luke: Anywhere! Oh!!`,
  `Han: Luke! Luke!`,
  `Leia: Grab him!`,
  `Leia: What happened?`,
  `Luke: I don't know, it just let go of me and disappeared...`,
  `Han: I've got a very bad feeling about this.`,
  `Luke: The walls are moving!`,
  `Leia: Don't just stand there. Try to brace it with something.`,
  `Luke: Wait a minute!`,
  `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
].map((m, i) => ({ id: i, author: m.split(": ")[0], content: m.split(": ")[1] }));

type MessagesDisplayRef = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
};

type Message = {
  id: number;
  author: string;
  content: string;
};

const MessagesDisplay = React.forwardRef<MessagesDisplayRef, { messages: Message[] }>(({ messages }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    scrollToBottom();
  });
  function scrollToTop() {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }
  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }
  React.useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }));

  return (
    <div ref={containerRef} role='log' className={styles["messages-display"]}>
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  );
});

type UseImperativeHandleProps = {
  className?: string;
};

const UseImperativeHandle: RFC<UseImperativeHandleProps> = ({ className }) => {
  const messageDisplayRef = React.useRef<MessagesDisplayRef>();
  const [messages, setMessages] = React.useState<Message[]>(allMessages.slice(0, 8));
  const addMessage = () =>
    messages.length < allMessages.length ? setMessages(allMessages.slice(0, messages.length + 1)) : null;
  const removeMessage = () => (messages.length > 0 ? setMessages(allMessages.slice(0, messages.length - 1)) : null);

  const scrollToTop = () => (messageDisplayRef.current as MessagesDisplayRef).scrollToTop();
  const scrollToBottom = () => (messageDisplayRef.current as MessagesDisplayRef).scrollToBottom();

  return (
    <div className={cn(styles["use-imperative-handle"], className)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={addMessage} variant='light'>
          add message
        </Button>
        <Button onClick={removeMessage} variant='light'>
          remove message
        </Button>
      </div>
      <hr />
      <div>
        <Button onClick={scrollToTop} variant='light' style={{ marginBottom: 20 }}>
          scroll to top
        </Button>
      </div>
      <MessagesDisplay ref={messageDisplayRef as React.Ref<MessagesDisplayRef>} messages={messages} />
      <div>
        <Button onClick={scrollToBottom} variant='light' style={{ marginTop: 20 }}>
          scroll to bottom
        </Button>
      </div>
    </div>
  );
};

export { UseImperativeHandle };
