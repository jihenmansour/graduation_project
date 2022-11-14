import React, {  useState } from "react";

import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
} from "antd";
import { Redirect} from "react-router-dom";
const { Title, Text } = Typography;
const { Header,Content } = Layout;
  
const SignUp = () =>{

  const [login,setLogin] = useState();
  const [password,setPassword] = useState();
  const [redirect,setRedirect] = useState(false);
  const [message,setMessage] = useState();

  const submit = async (e) => {
    e.preventDefault();
    
    await fetch("https://localhost:44314/api/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        login,
        password
      })
    })
    .then(response => response.json())
    .then((res) => {
      if((res.message)!="Utlisateur n'existe pas" && (res.message)!="Mot de passe incorrect"){
        localStorage.setItem('key',JSON.stringify(res.message));
        setRedirect(true);
        window.location.reload();
      }else{
        setRedirect(false)
      }
      setMessage(JSON.stringify(res.message).replaceAll('"', ''));
    }) 
  }
  let idData= JSON.parse(localStorage.getItem('key'));
  let userData =JSON.parse(localStorage.getItem('theme'));
  const redirecting = () => {
    if (redirect){
       return <Redirect to={"/dashboard/"+`${idData}`+'&'+`${userData}`}/>
     }
  }
    return (
      <>
      {redirecting()}
        <div className="layout-default ant-layout layout-sign-up">
          <Header>

            <div className="header-col header-brand">
              <h5>Axia board</h5>
            </div>
            <div className="header-col header-nav">
            </div>
          </Header>

          <Content className="p-0">
            <div className="sign-up-header">
              <div className="content">
                <Title>Sign In</Title>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              bordered="false"
            >
              <Form 
                name="basic"
                initialValues={{ remember: true }}
               
                className="row-col"
              >
               
                <Form.Item
                  name="login"
                >
                  <Input type="login" placeholder="login" onChange={(e)=>setLogin(e.target.value)}/>
                </Form.Item>
                <Form.Item
                  name="password"
                >
                  <Input type="password" placeholder="Mot de passe" onChange={(e)=>setPassword(e.target.value)}/>
                  </Form.Item>
                  <Text type="danger">{message}</Text>
                  <Button onClick={(e) => {submit(e);redirecting()}}
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN IN
                  </Button>
              </Form>
            </Card>
          </Content>
          
        </div>
      </>
    );
  }

  export default SignUp;