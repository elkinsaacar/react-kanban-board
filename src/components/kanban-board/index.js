import React, { useState } from "react"; 
import "./index.css";

const KanbanBoard = (props) => {

  const { tasks } = props;
  // console.log(props);
  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  const IDsStages = [0, 1, 2, 3];
  const [tasksList, SetTasksList] = useState(tasks);

  let stagesTasks = [];
  console.log(tasks);
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasksList) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  const taskBack = (name) => {
    // console.log(`taskBack ${name}`);
    let newtaskList = [];
    for (let task of tasksList) {
      if( task.name === name ){
        newtaskList.push( {...task, stage: (task.stage-1)} );
      } else {
        newtaskList.push( {...task} );
      }
    }
    /* console.log("-----");
    console.log(newtaskList);
    console.log("-----"); */
    SetTasksList(newtaskList);
  }

  const taskNext = (name) => {
    // console.log(`taskNext ${name}`);
    let newtaskList = [];
    for (let task of tasksList) {
      if( task.name === name ){
        newtaskList.push( {...task, stage: (task.stage+1)} );
      } else {
        newtaskList.push( {...task} );
      }
    }
    /* console.log("-----");
    console.log(newtaskList);
    console.log("-----"); */
    SetTasksList(newtaskList);
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
              let showButtonBack = (i == IDsStages[0]) ? false : true;
              let showButtonNext = (i == IDsStages[ (IDsStages.length)-1 ]) ? false : true;

              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{stagesNames[i]}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {tasks.map((task, index) => {
                                  return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                    <div className="li-content layout-row justify-content-between align-items-center">
                                      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                      <div className="icons">
                                        <button className={`icon-only x-small mx-2 ${(showButtonBack) ? `` : `disabled`} `} data-testid={`${task.name.split(' ').join('-')}-back`} onClick={()=>taskBack(task.name)}>
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button className={`icon-only x-small mx-2 ${(showButtonNext) ? `` : `disabled`} `} data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={()=>taskNext(task.name)}>
                                          <i className="material-icons">arrow_forward</i>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );
  
};

export default KanbanBoard;