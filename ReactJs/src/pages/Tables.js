import { useState,useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Button,
  Typography,
} from "antd";
import TableList from "./Tablelist";
import Kanban from "./Kanban";
import {Pop} from "./Pop";



const { Title } = Typography;





function Tables(props) {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
 
  const[active, setActive]= useState("FirstComponent");
  let userData =JSON.parse(localStorage.getItem('theme'));
  let idData= JSON.parse(localStorage.getItem('key'));
  const [users, setUsers] = useState([]);
  const [value,setValue] = useState(false);
  const [role,setRole] = useState();
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

  return (
    <> 
    {role == "Support"? 
         <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">{props.name}</h6>]}
            bodyStyle={{ paddingTop: "0" }}
            extra={
              <Pop/>
            }
          >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Taches"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a" 
                    onClick={()=> setActive("FirstComponent")}>Tableau</Radio.Button>
                    <Radio.Button value="b"
                    onClick={()=> setActive("SecondComponent")}>Kanban</Radio.Button>
                  </Radio.Group>
                </>
              }
             
            >
     <div>
     {active==="FirstComponent" && <TableList id={userData} userid={idData}/>}
    {active==="SecondComponent" && <Kanban id={userData} userid={idData}/>}
      </div>
                  
            </Card>

          </Col>
        </Row>
      </div>
      </Card>
      : 
      <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Taches"
            extra={
              <>
                <Radio.Group onChange={onChange} defaultValue="a">
                  <Radio.Button value="a" 
                  onClick={()=> setActive("FirstComponent")}>Tableau</Radio.Button>
                  <Radio.Button value="b"
                  onClick={()=> setActive("SecondComponent")}>Kanban</Radio.Button>
                </Radio.Group>
              </>
            }
           
          >
   <div>
   {active==="FirstComponent" && <TableList id={userData} userid={idData}/>}
    {active==="SecondComponent" && <Kanban id={userData} userid={idData}/>}
           </div>
                
          </Card>

        </Col>
      </Row>
    </div>}
    </>
  );
}

export default Tables;
