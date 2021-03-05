import { useEffect, useState } from "react";
import DigipetActions from "./components/DigipetActions";
import DigipetData from "./components/DigipetData";

export interface Digipet {
  happiness: number;
  nutrition: number;
  discipline: number;
}

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [message, setMessage] = useState<string>();
  const [digipetStats, setDigipetStats] = useState<Digipet>();
  // console.log(message);

  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    const res = await fetch(`https://boiling-river-71009.herokuapp.com${endpoint}`);
    const body = await res.json();
    setMessage(body.message);
    setDigipetStats(body.digipet);
    // try... catch documentation:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
    } catch (err) {
      console.log(err);
      setMessage(`${err.name}: ${err.message}`);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    if (isFirstLoad) {
      // populate data on first load
      loadDataFromEndpoint("/digipet");
      setIsFirstLoad(false);
    }
  });

  return (
    <main>
      <h1>Digipet</h1>
      {isFirstLoad && <p>Loading...</p> /*while isFirstLoad is true, show the loading message */}
      {message && <p>{message}</p> /*when the message is true (so not undefined) then show the message*/}
      <hr />
      <DigipetData digipet={digipetStats} />
      <hr />
      <DigipetActions
        actions={[
          {
            name: "Hatch",
            handler: () => loadDataFromEndpoint("/digipet/hatch"),
          },
          {
            name: "Walk",
            handler: () => loadDataFromEndpoint("/digipet/walk"),
          },
          { 
            name: "Feed",
            handler: () => loadDataFromEndpoint("/digipet/feed"),
          },
          {
            name: "Train",
            handler: () => loadDataFromEndpoint("/digipet/train")
          },
          {
            name: "Ignore",
            handler: () => loadDataFromEndpoint("/digipet/ignore")
          },
          {
            name: "Rehome",
            handler: () => loadDataFromEndpoint("/digipet/rehome")
          },
        ]}
      />
    </main>
  );
}

export default App;
