import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import{AiFillFolder} from "react-icons/ai";
import { Container } from "react-bootstrap";

function Kanban(props) {
  const [emps, setEmps] = useState([])
  const [value,setValue] = useState(false)
  let itemsFromBackend1 = [];
  let itemsFromBackend2 = [];
  let itemsFromBackend3 = [];
  let itemsFromBackend4 = [];

  useEffect(() => {
  getEms()
  },[]);
   const getEms = () => {
    fetch('https://localhost:44314/api/Table/'+props.userid+'&'+props.id)
    .then(res => res.json())
    .then(res => {
      setEmps(res)
      res.forEach(element => {
        if(element.issue_status=='À Faire'){
        itemsFromBackend1.push({ id: uuid(), content1: element.name,  content2: element.subject, content3: element.created_on}) 
        
      }});
      res.forEach(element => {
        if(element.issue_status=='En Cours' ){
        itemsFromBackend2.push({ id: uuid(), content1: element.name,  content2: element.subject, content3: element.created_on}) 
        
      }});
      res.forEach(element => {
        if(element.issue_status=='En Attente' ){
        itemsFromBackend3.push({ id: uuid(), content1: element.name,  content2: element.subject, content3: element.created_on}) 
        
      }});
      res.forEach(element => {
        if(element.issue_status=='Terminé' ){
        itemsFromBackend4.push({ id: uuid(), content1: element.name,  content2: element.subject, content3: element.created_on}) 
        
      }});
      setValue(true)
    })
   }
    



const columnsFromBackend = {
  [uuid()]: {
    backgroundColor: 'rgb(255, 77, 79)',
    name: "À Faire",
    items: itemsFromBackend1
  },
  [uuid()]: {
    backgroundColor: 'rgb(254, 176, 25)',
    name: "En Cours",
    items: itemsFromBackend2
  },
  [uuid()]: {
    backgroundColor: 'rgb(0, 143, 251)',
    name: "En Attente",
    items: itemsFromBackend3
  },
  [uuid()]: {
    backgroundColor: 'rgb(0, 227, 150)',
    name: "Terminé",
    items: itemsFromBackend4
  }
};
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

  





  const [columns, setColumns] = useState(columnsFromBackend);
 
  return (
    <>
    {value && <Container fluid style={{ display: "flex",  height: "100%"}} id="wrapper">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <span className="drag-column-header" 
              style={{backgroundColor:column.backgroundColor, 
                      width:"85px",
                      width:"275px",
                    height: "50px",
                    alignContent:"center",
                   justifyContent:"space-between",
                    marginTop:"10px",
                      }}>
              <h3 style={{fontSize: "0.85rem",
                           textTransform:"uppercase",
                            color:"white",
                            marginLeft:"37%",
                            marginTop:"6%"}} >{column.name}</h3>
              </span>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                      className="body"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 3,
                          width: "275px"
                      
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      
                                      userSelect: "none",
                                      padding:16,
                                      margin: "0 0 9px 0",
                                      minHeight: "80px",
                                      backgroundColor: "white",
                                     boxShadow:"0 0 30px 0 rgba(90, 116, 148, 0.2)", 
                                      ...provided.draggableProps.style
                                    }}
                                  >

                                    <div
                                    style={{borderBottom:"2px solid #DCDCDC ",
                                    paddingBottom:"5px",
                                   }}>
                                  
                                  <div
                                   style={{
                                  backgroundColor: column.backgroundColor,
                                  
                                   float:"right",
                                   color:"white",
                                   borderRadius:"5px",
                                   fontSize:"13px"
                                          
                                   }}>
                                  {item.content3}
                                   </div>
                                  
                                     <AiFillFolder style={{
                                       marginRight:"8px",
                                     }}/>

                                    {item.content1}

                                    </div>
                                    

                                     <div
                                     style={{
                                      
                                      fontWeight:"500",
                                       paddingTop: "10px",
                                       fontSize:"14px"
                                     }}>
                                    {item.content2}
                                   </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </Container>}
    </>
  );
}

export default Kanban;