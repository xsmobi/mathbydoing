import { useState, useEffect } from "react";
import firebase from "./firebase";
import Task from "./Task";
import CreateTask from "./CreateTask";

import "./App.css";

function App() {
const [tasks, setTasks] = useState([]);
const [currentTask, setCurrentTask] = useState({});
const [showHelp, setShowHelp] = useState(false);
const [showResult, setShowResult] = useState(false);
const [showExplainer, setShowExplainer] = useState(false);
const [disabled, setDisabled] = useState(true);
const types = ['add', 'addsub', 'lin1','type1', 'type2', 'type3'];
const [selectedType, setSelectedType] = useState('addsub');

useEffect(() => {
  const tasksRef = firebase.firestore().collection("templates");
  let query = tasksRef;
  query.onSnapshot((snapshot) => {
    const tasksList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksList);
  });
}, [selectedType]);

const getRandomTask = () => {
  // let filteredTasks = tasks; // überflüssig
  //if (selectedType !== "addsub") { // von ChatGPT eingefügt, aber Ausschluss falsch
  const filteredTasks = tasks.filter((task) => task.type === selectedType);
  //}                                // von ChatGPT eingefügt, aber Aussschluss falsch
  if (filteredTasks.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredTasks.length);
    const task = filteredTasks[randomIndex];
    const processedTask = CreateTask(task);
    setCurrentTask(processedTask);
    setShowHelp(false);
    setShowResult(false);
    setShowExplainer(false);
    setDisabled(false);
  }
};

const toggleShowHelp = () => {
  setShowHelp(!showHelp);
  // console.log("Help: " + showHelp)
};

const toggleShowResult = () => {
  setShowResult(!showResult);
};

const toggleShowExplainer = () => {
  setShowExplainer(!showExplainer);
  setShowHelp(false);
  setShowResult(false);
  // console.log("Explainer: " + showExplainer)
};

const saveTask = () => {
const tasksRef = firebase.firestore().collection("savedTasks");
  tasksRef.add(currentTask);
  setDisabled(true);
};

const handleTypeSelection = (type) => {
  setSelectedType(type);
};

return (
  <div className="App">
    <header className="App-header">
        <img src="https://mathbydoing.app/apple-touch-icon.png" alt="logo" />
        <h1 className="App-title">MathByDoing</h1>
        <h2 className="App-subtitle">
        Practice Math and Boost Your Brainpower!
        </h2>
    </header>
    
    <main>
        <div className="buttons-container">
            <button onClick={getRandomTask}>Get New Task</button>
            <button onClick={toggleShowHelp}>Get Help</button>
            <button onClick={toggleShowResult}>Show Result</button>
            <button onClick={toggleShowExplainer}>Explainer</button>
            <button onClick={saveTask} disabled={disabled}>Save Task</button>
        </div>

        {currentTask && (
          <Task
            key={currentTask.id}
            task={currentTask}
            showHelp={showHelp}
            toggleShowHelp={toggleShowHelp}
            showResult={showResult}
            toggleShowResult={toggleShowResult}
            showExplainer={showExplainer}
            toggleShowExplainer={toggleShowExplainer}
          />
        )}
   


    </main>
  
    <footer className="App-footer">

        <div className="types">
            {types.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeSelection(type)}
                  disabled={selectedType === type}
                  style={{ backgroundColor: selectedType === type ? 'lightgreen' : '' }}
                >
                  {type}
                </button>
            ))}
        </div>

      <p>Practice math, it powers your success!</p>
    </footer>
  </div>
); // /return
}  // /function App

export default App;