import React, { useState } from "react";
import { Alert, UncontrolledCollapse } from "reactstrap";
import { toast } from "react-toastify";

import Loader from "../../../../components/Loader/Loader";
import { supabase } from "../../../../services/supabaseClient";

const Messages = ({ student }) => {
  const [openCurrentItem, setOpenCurrentItem] = useState(null);
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const getMessagesByStudentId = async (student) => {
    setOpenCurrentItem(student.id);
    try {
      setMessagesLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select()
        .eq("studentId", student.id);

      if (error) throw error;

      const messageIndex =
        messages.length > 0
          ? messages.findIndex((message) => message.studentId === student.id)
          : -1;

      if (messageIndex !== -1) {
        const updated = [...messages, (messages[messageIndex].messages = data)];
        setMessages(updated);
      } else {
        const updated = [
          ...messages,
          {
            studentId: student.id,
            messages: data,
          },
        ];
        setMessages(updated);
      }
    } catch (error) {
      toast(error.message, {
        type: "error",
      });
    } finally {
      setMessagesLoading(false);
    }
  };

  const studentMessages = messages.filter(
    (message) => message.studentId === student.id
  );

  return (
    <UncontrolledCollapse
      onEntering={() => getMessagesByStudentId(student)}
      toggler={`#student-${student.lastName.replace(/\s/g, "") + student.id}`}
    >
      <Loader isLoading={isMessagesLoading && openCurrentItem === student.id}>
        <div className="mt-3">
          {studentMessages[0]?.messages?.length ? (
            <>
              <p>Messages:</p>
              <ul className="list-unstyled">
                {studentMessages[0].messages.map((message) => {
                  return (
                    <li>
                      <div className="d-flex justify-content-between align-items-end">
                        <em style={{ fontSize: 10 }}>
                          {new Date(message.createdAt).toLocaleString()}
                        </em>
                        <strong style={{ fontSize: 12 }}>
                          {message.authorName
                            ? message.authorName
                            : "Anonymous :)"}
                        </strong>
                      </div>
                      <Alert color="info" key={message.id}>
                        {message.text}
                      </Alert>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p>No messages here yet!</p>
          )}
        </div>
      </Loader>
    </UncontrolledCollapse>
  );
};

export default Messages;
