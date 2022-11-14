

import { useState,useEffect } from "react";
import {
  Button,
 Input
} from "antd";
import styled from "@emotion/styled";
const { TextArea } = Input;
export const StyleWrapper = styled.div
 `
 .ant-input {
  padding:0px;
  font-size: 12px;
  width:300px;
}
`

export default function Tablelist(props) {
  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];
   
  const deletebtn = [
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        fill="#111827"
        className="fill-danger"
      ></path>
    </svg>,
  ];
  
    const [emps, setEmps] = useState([]);
    const [supps, setSupps] = useState([]);
    const [users, setUsers] = useState([]);
    const [value,setValue] = useState(false);
    const [role,setRole] = useState();
    const [id,setId] = useState('');
    const [firstname,setFirstname] = useState('');
    const [name,setName] = useState('');
    const [subject,setSubject] = useState('');
    const [issue_status,setIssue] = useState('');
    const [description,setDescription] = useState('');
    const [created_on,setCreated] = useState('');
    const [closed_on,setClosed] = useState('');
    let idData= JSON.parse(localStorage.getItem('key'));
    useEffect(() => {
      getEms()
        },[props.id])
    function getEms() {
        fetch('https://localhost:44314/api/Table/'+props.userid+'&'+props.id)
         .then(res => res.json())
         .then(res => {
           setEmps(res)
           setId(res[0].id)
           setFirstname(res[0].firstname)
           setName(res[0].name)
           setSubject(res[0].subject)
           setIssue(res[0].issue_status)
           setDescription(res[0].description)
           setCreated(res[0].created_on)
           setClosed(res[0].closed_on)
         })
         .catch(e => {
           console.log(e)
         })
       }
       
       function updateEm (id) { 
     
        fetch
        (`https://localhost:44314/api/Table/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
          credentials: 'include',
          body: JSON.stringify({
            id:id,
            firstname:firstname,
            name:name,
            subject:subject,
            issue_status:issue_status,
            description:description,
            created_on:created_on,
            closed_on:closed_on,
          })
        })
        .then((res) => {
          alert("Profil modifié avec succés!");
          getEms();
        }) 
      }



       useEffect(() => {
        getSupps()
          },[props.id])
      function getSupps() {
          fetch('https://localhost:44314/api/Test/'+props.id)
           .then(res => res.json())
           .then(res => {
             setSupps(res)
           })
           .catch(e => {
             console.log(e)
           })
         }
          useEffect(() => {
           getUsers()
           },[]);
            const getUsers = () => {
             fetch(`https://localhost:44314/api/User/${idData}`)
             .then(res => res.json())
             .then(res => {
               setUsers(res)
               res.forEach(element => {
                setRole(element.Role)
                 });
               setValue(true)
             })
            }
       function deleteEm(id){
        fetch(`https://localhost:44314/api/Table/${id}`,{
          method:'DELETE'
        }).then((res)=>{
          getSupps()
        })
      }
  
  return (
    <>
    <StyleWrapper>
              <div className="table-responsive">
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      {role == "Support"? 
                      <><th>TACHE</th><th>RESP</th><th>Status</th><th>DEBUT</th><th>FIN</th><th>DERNIER COMMENTAIRE</th></>:
                      <><th>TACHE</th><th>Status</th><th>DEBUT</th><th>FIN</th><th>DERNIER COMMENTAIRE</th></>
                      }
                    </tr>
                  </thead>
                        {role == "Support"? 
                        (supps.map(supp=>
                        <tbody>
                        <tr>
                        <td> 
                        <Button type="link" danger onClick={()=>deleteEm(supp.id)}>
                        {deletebtn}
                        </Button>
                      {supp.subject}</td>
                      <td>{supp.firstname}</td>
                        {supp.issue_status=='À Faire'?(
                        <td style={{color:"rgb(255, 77, 79)"}}>{supp.issue_status}</td>
                        ):supp.issue_status=='En Cours'?(
                          <td style={{color:"rgb(254, 176, 25)"}}>{supp.issue_status}</td>
                        ):supp.issue_status=='En Attente'?(
                          <td style={{color:"rgb(0, 143, 251)"}}>{supp.issue_status}</td>
                        ):(
                          <td style={{color:"rgb(0, 227, 150)"}}>{supp.issue_status}</td>
                        )}
                        <td>
                          <div className="percent-progress">{supp.created_on}</div>
                        </td>
                        <td>
                          <div className="percent-progress">{supp.closed_on}</div>
                        </td>
                        <td>
                        <TextArea bordered={false} defaultValue={supp.description}  onChange={(e) => setDescription(e.target.value)} autoSize/>
                        </td>
                        <Button type="link" className="ant-edit-link"  onClick={()=>updateEm(supp.id)}>
                        {pencil}
                      </Button>
                      </tr>
                  </tbody>))
                      : 
                 (emps.map(emp=>
                  <tbody>
                      <tr>
                        <td> 
                      {emp.subject}</td>
                        {emp.issue_status=='À Faire'?(
                        <td style={{color:"rgb(255, 77, 79)"}}>{emp.issue_status}</td>
                        ):emp.issue_status=='En Cours'?(
                          <td style={{color:"rgb(254, 176, 25)"}}>{emp.issue_status}</td>
                        ):emp.issue_status=='En Attente'?(
                          <td style={{color:"rgb(0, 143, 251)"}}>{emp.issue_status}</td>
                        ):(
                          <td style={{color:"rgb(0, 227, 150)"}}>{emp.issue_status}</td>
                        )}
                        <td>
                          <div className="percent-progress">{emp.created_on}</div>
                        </td>
                        <td>
                          <div className="percent-progress">{emp.closed_on}</div>
                        </td>
                        <td>
                        <TextArea bordered={false} defaultValue={emp.description}  onChange={(e) => setDescription(e.target.value)} autoSize  />
                        </td>
                        <Button type="link" className="ant-edit-link"  onClick={()=>updateEm(emp.id)}>
                        {pencil}
                      </Button>
                      </tr>
                  </tbody>
                  ))}
                </table>
              </div>
              </div>
              </StyleWrapper>
    </>
  );
}