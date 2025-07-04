import { useContext } from "react";
import { MessageContext } from "../store/messageStore";

function Message() {
  const { state: message, dispatch } = useContext(MessageContext);

  return (
    <>
      <div
        className="toast-container position-fixed"
        style={{ top: "64px", right: "15px" }}
      >
        {message.type && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay="3000"
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              {" "}
              {}
              <strong className="me-auto">{message.title}</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch({ type: "CLEAR_MESSAGE" })}
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message.text}</div>{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default Message;
