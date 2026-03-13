import React, { useState } from "react";
import axios from "axios";

function App() {

  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const userId = "123";

  const saveEntry = async () => {

    await axios.post("http://localhost:5000/api/journal", {
      userId,
      ambience: "forest",
      text
    });

    alert("Saved");

  };

  const getEntries = async () => {

    const res = await axios.get(
      `http://localhost:5000/api/journal/${userId}`
    );

    setEntries(res.data);

  };

  const analyze = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/journal/analyze",
      { text }
    );

    setAnalysis(JSON.stringify(res.data));

  };

  const getInsights = async () => {

    const res = await axios.get(
      `http://localhost:5000/api/journal/insights/${userId}`
    );

    alert(JSON.stringify(res.data));

  };

  return (

    <div style={{ padding: 40 }}>

      <h2>AI Journal</h2>

      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={saveEntry}>Save Entry</button>
      <button onClick={analyze}>Analyze</button>
      <button onClick={getEntries}>View Entries</button>
      <button onClick={getInsights}>Insights</button>

      <div>
        <h3>Analysis</h3>
        {analysis}
      </div>

      <ul>
        {entries.map(e => (
          <li key={e.id}>{e.text}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;