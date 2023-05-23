import add from './components/add';
import addsub from './components/addsub';
import lin1 from './components/lin1';

function CreateTask(task) {
    // const { id, type, val1, val2, explainer } = task;
    const { id, type, val1, val2 } = task;
    let aufgabeDaten = []
    //aufgabeDaten = add(val1,val2)
 
    switch(type){
        case "add":
            aufgabeDaten = add(val1,val2)
        break;
        case "addsub":
            //aufgabeDaten = addsub(val1,val2,explainer)  
            aufgabeDaten = addsub(val1,val2)
        break;
        case "lin1": 
            aufgabeDaten = lin1(val1,val2)
        break;
        default: 
            aufgabeDaten = add(val1,val2)
    }
    
    const processedTask = {
    id: id,
    templateid: id,
    text: `${aufgabeDaten[0]}`,
    help: `${aufgabeDaten[2]}`,
    answer: `${aufgabeDaten[1]}`,
    explainer: `${aufgabeDaten[3]}`
    };
 
    return processedTask;
}
    
export default CreateTask;



    