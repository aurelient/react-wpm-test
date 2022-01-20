import React from "react";

function Logs({ trial }) {
  function printRow([id, wpm, words, ks, errors]) {
    return (
      <tr className="form__table-row">
        <td>{id}</td>
        <td>{wpm}</td>
        <td>{words}</td>
        <td>{ks}</td>
        <td>{errors}</td>
      </tr>
    );
  }

  function printLocalStorage() {
    let trialID = window.localStorage.getItem("trialID");
    let logArray = [];
    for (let i = 0; i < trialID; i++) {
      logArray.push(window.localStorage.getItem("trial-" + i).split(","));
    }
    return logArray.map((item) => {
      return printRow(item);
    });
  }

  return (
    <>
      <table className="form__table">
        <thead>
          <tr>
            <th>trial</th>
            <th>wpm</th>
            <th>words</th>
            <th>keystrokes</th>
            <th>errors</th>
          </tr>
        </thead>
        <tbody>{printLocalStorage()}</tbody>
      </table>
      <small style={{ color: "#aaa", opacity: "0.01" }}>#{trial}</small>
    </>
  );
}

export default Logs;
