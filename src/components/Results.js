import React from "react";

function Results(props) {
  return (
    <div className="content">
      Your typing speed was {Math.round((props.keystrokes * 2) / 5)} WPM, you
      typed {props.wordsTyped} words, and {props.keystrokes} keystrokes, with{" "}
      {props.errors} errors in 30 seconds.
      <span style={{ opacity: 0.01 }}> #{props.trial}</span>
    </div>
  );
}

export default Results;
