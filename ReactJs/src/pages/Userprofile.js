import { useState,useEffect,useRef } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Checkbox, 
  Input,
  Modal,
  Form ,
  Typography
  
} from "antd";
import styled from "@emotion/styled";
const { Title } = Typography;

export const StyleWrapper = styled.div
 `
 .ant-input {
   padding:0px;
}
.ant-input-password{
 padding:0px;
}
.ant-form-item-label{
 text-align:left;
}
.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
 content:''}
 .ant-form-item-label > label {
   font-weight:600;
   color: #8c8c8c;
}
.ant-form-item-label > label::after {
  content: '';}
`

function Userprofile(props) {

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

  const success = () => {
    Modal.success({
      content: 'Profil modifier avec succés!',
    });
  };
     
/*getters*/
  const [emps, setEmps] = useState([]);
  const [checks, setChecks] = useState([]);
  const [projects,setProjects] = useState([]);

  useEffect(() => {
    getEms()
    },[]);
    function getEms(){
      fetch(`https://localhost:44314/api/User/${props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        setEmps(res)
        setLogin(res[0].login)
        setEmail(res[0].email)
        setFirstname(res[0].firstname)
        setLastname(res[0].lastname)
        setRole(res[0].Role)
        setNumtel(res[0].numtel)
        setPassword(res[0].password)
      })
      .catch(e => {
        console.log(e)
      })
    }
  useEffect(() => {
      getProjects()
      },[]);
  function getProjects(){
      fetch(`https://localhost:44314/api/Projects/${props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        setProjects(res)
      })
      .catch(e => {
        console.log(e)
      })
    }


    const [vals, setVals] = useState([]);
    useEffect(() => {
     getVals()
       },[])
      function getVals(){
        fetch('https://localhost:44314/api/Checkbox')
        .then(res => res.json())
        .then(res => {
          setVals(res)
        })
        .catch(e => {
          console.log(e)
        })
      }
  /*put*/
    const [login,setLogin] = useState('');
    const [email,setEmail] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [Role,setRole] = useState('');
    const [numtel,setNumtel] = useState('');
    const [password,setPassword] = useState('');
    const [arrayAchat,setarrayAchat] = useState([]);

    function updateEm () { 
     
      fetch
      (`https://localhost:44314/api/User/${props.match.params.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
        credentials: 'include',
        body: JSON.stringify({
          email:email,
          firstname:firstname,
          lastname:lastname,
          numtel:numtel,
          Role:Role,
        })
      })
      .then((res) => {
        getEms()
      }) 
      success()
    }
  
 const assigned_to_id=props.match.params.id;
  const change = (e) => {
    const project_name = e.target.value;
    if(e.target.checked)
    {
 
      arrayAchat.push({project_name,assigned_to_id})
    }
    else
    {
      arrayAchat.splice(arrayAchat.indexOf(project_name),1)
    }
    console.log(arrayAchat)
  }
  const [postResult, setPostResult] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
 /*post*/ 
  async function postData() {
    try {
      const res = await fetch(`https://localhost:44314/api/Checkbox`, {
        method: "post",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(arrayAchat),
      });
      if (!res.ok) {
        const message = `An error has occured`;
        throw new Error(message);
      }
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: JSON.stringify(arrayAchat),
      };
      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(err.message);
    }
  }
/*delete*/
 async function deleteEm(id){
    fetch(`https://localhost:44314/api/Checkbox/${id}`,{
      method:'DELETE'
    })
    .then((res)=>{
    })
  }
  function sendData () {
    deleteEm(props.match.params.id)
    .then(postData)
}



  useEffect(() => {
    getChecks()
    },[]);
     const getChecks = () => {
      fetch(`https://localhost:44314/api/Checkbox/${props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        setChecks(res)
        res.forEach(element => {
          });
      })
     }
     const [form] = Form.useForm();
     const loadProfile = () => {
       form.setFieldsValue({ Prénom: firstname, Nom:lastname, email: email, role:Role, numtel:numtel});
     };
   
     useEffect(() => {
       loadProfile();
     });
 
  return (

    <StyleWrapper>
         <Form
      form={form}
      name="register"
      scrollToFirstError
    >
     <Col span={24}  className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full card-profile-information"
            extra={<Form.Item><Button type="primary" htmlType="submit" onClick={()=>{updateEm();sendData()}}>Modifier compte</Button></Form.Item>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
           {emps.map((emp) => (
       <>
        <Form.Item span={3} label={pencil}>
        <Title level={4}> {emp.login}</Title>
                </Form.Item>
       <Form.Item
        name="Prénom"
        label="prénom"
        rules={[
          {
            required: true,
            message: 'Ce champ est obligatoire!',
          },
        ]}
      >
        <Input  onChange={(e) => setFirstname(e.target.value)}  bordered={false}/>
      </Form.Item>

      <Form.Item  rules={[{
            required: true,
            message: 'Ce champ est obligatoire!',
          },
        ]} name="Nom" label="Nom" span={3}>
                <Input  onChange={(e) => setLastname(e.target.value)} defaultValue= {emp.lastname} bordered={false}/>
                </Form.Item>
                <Form.Item rules={[{ 
          required: true, 
        message: "numéro de télephone est invalide!",
        pattern: new RegExp(/^[0-9]+$/)
         }]} label="Numéro téléphone" name="numtel" span={3}>
                <Input onChange={(e) => setNumtel(e.target.value)} defaultValue= {emp.numtel} bordered={false}/>
                </Form.Item>
                <Form.Item rules={[{
            required: true,
            message: 'Ce champ est obligatoire!',
                   },
                ]} name="email" label="Email" span={3}>
                <Input onChange={(e) => setEmail(e.target.value)} defaultValue= {emp.email} bordered={false}/>
                </Form.Item>
                <Form.Item rules={[{
            required: true,
            message: 'Ce champ est obligatoire!',
                   },
                ]} name="role" label="Role" span={3}>
                <Input onChange={(e) => setRole(e.target.value)} defaultValue= {emp.Role} bordered={false}/>
                </Form.Item>

              </>
           ))}
          </Card>
          </Col>
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Projets</h6>}
          >
           <Checkbox.Group style={{ width: "100%" }}>
      {projects.map((project,index) => (
      <><Col span={8}>
          <Checkbox value={project.name}
         onChange={change}>{project.name}</Checkbox>
        </Col><br /></>
      ))}
      </Checkbox.Group>  
             </Card>
             </Form>
    </StyleWrapper>

  );
}

export default Userprofile;