function Task({ task, showHelp, showResult, showExplainer, toggleShowHelp }) {
    const { text, help, answer, explainer } = task;
    return (
    <div className="Task">
        <h3>{text}</h3>
        {showHelp && <div dangerouslySetInnerHTML={{ __html: help }} />}
        {showResult && <h3>{answer}</h3>}
        {showExplainer && <div dangerouslySetInnerHTML={{ __html: explainer }} />}
    </div>
    );
    }
    
    export default Task;