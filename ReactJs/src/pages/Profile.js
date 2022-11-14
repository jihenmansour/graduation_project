
import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Input,
  Form,
  Select,

} from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import styled from "@emotion/styled";
const { Option } = Select;
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
  .ant-form-item-label {
    font-weight:600;
}
`
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function Profile() {
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




  let idData= JSON.parse(localStorage.getItem('key'));
  const [emps, setEmps] = useState([]);
  useEffect(() => {
    getEms()
    },[]);
    function getEms(){
      fetch(`https://localhost:44314/api/User/${idData}`)
      .then(res => res.json())
      .then(res => {
        setEmps(res)
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
        const [projects, setProjects] = useState([]);    
        useEffect(() => {
          getProjects()
          },[]);
           const getProjects = () => {
            fetch(`https://localhost:44314/api/Checkbox/${idData}`)
            .then(res => res.json())
            .then(res => {
              setProjects(res)
            })
           }
           const [email,setEmail] = useState('');
           const [firstname,setFirstname] = useState('');
           const [lastname,setLastname] = useState('');
           const [numtel,setNumtel] = useState('');
           const [Role,setRole] = useState('');
           const [password,setPassword] = useState('');
         
           function updateEm () { 
     
            fetch
            (`https://localhost:44314/api/Users/${idData}`, {
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
                password:password,
              })
            })
            .then((res) => {
              getEms()
            }) 
          }
          const [form] = Form.useForm();
          const loadProfile = () => {
            form.setFieldsValue({ Prénom: firstname, Nom:lastname, email: email, numtel: numtel});
          };
        
          useEffect(() => {
            loadProfile();
          });
        
  return (
    <>
    {emps.map((emp) => (
      <><div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>
      <StyleWrapper>
      <Form
      {...formItemLayout}
      form={form}
      name="register"
      scrollToFirstError
    >
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={<Row justify="space-between" align="middle" gutter={[24, 0]}>
          <Col span={24} md={12} className="col-info">
            <Avatar.Group>
              <Avatar size={74} shape="square" />

              <div className="avatar-info">
                <h4 className="font-semibold m-0">{emp.login}</h4>
                <p>{emp.Role}</p>
              </div>
            </Avatar.Group>
          </Col>
          <Col
            span={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
           <Form.Item><Button htmlType="submit" {...tailFormItemLayout} onClick={()=>{updateEm()}} type="primary" >Modifier profil</Button></Form.Item> 
          </Col>
        </Row>}
      ></Card><Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
          <Card
              bordered={false}
              title={<h6 className="font-semibold m-0">Mes informations</h6>}
              className="header-solid h-full card-profile-information"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              extra={<Button type="link">{pencil}</Button>}
            >
              
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
                </Form.Item >
                <Form.Item  rules={[{ 
          required: true, 
        message: "numéro de télephone est invalide!",
        pattern: new RegExp(/^[0-9]+$/)
         }]} name="numtel"  label="Numéro téléphone" span={3}>
                <Input onChange={(e) => setNumtel(e.target.value)} defaultValue= {emp.numtel} bordered={false}/>
                </Form.Item>
                <Form.Item rules={[{
            required: true,
            message: 'Ce champ est obligatoire!',
                   },
                ]} name="email" label="Email" span={3}>
                <Input onChange={(e) => setEmail(e.target.value)} defaultValue= {emp.email} bordered={false}/>
                </Form.Item>
                <Form.Item hasFeedback name="password" label="Nouveau mot de passe" span={3}>
                <Input.Password onChange={(e) => setPassword(e.target.value)}  bordered={false}/>
                </Form.Item>
                <Form.Item dependencies={['password']} 
        hasFeedback
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Les deux mots de passe ne correspondent pas!'));
            },
          }),
        ]} name="confirm" label="Confirmer mot de passe" span={3}>
                <Input.Password onChange={(e) => setPassword(e.target.value)}  bordered={false}/>
                </Form.Item>
              </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card
              bordered={false}
              title={<h6 className="font-semibold m-0">Mes projets</h6>}
              className="header-solid h-full"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <List
                itemLayout="horizontal"
                split={false}
                className="conversations-list">
                  {projects.map((project) => (
                  <List.Item>
                    <List.Item.Meta
                      title={project.project_name} />
                  </List.Item>
                ))}
                </List>
            </Card>
          </Col>
        </Row></Form></StyleWrapper></>
    ))}
    </>
  );
}

export default Profile;
