import React, { useRef, useState } from "react";
import './popup.css'

import {
  Form,
  Button,
  Modal,
} from 'antd';
const task = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
    ></path>
  </svg>,
];
export function Popup() {
  const login = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const numtel = useRef(null);
  const Role = useRef(null);
  const [postResult, setPostResult] = useState(null);
  const [resMessage,setMessage] = useState('');
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  
  async function postData() {
    const postData = {
      login: login.current.value,
      email: email.current.value,
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      password: password.current.value,
      numtel: numtel.current.value,
      Role: Role.current.value,
    };
    try {
      const res = await fetch(`https://localhost:44314/api/Users`, {
        method: "post",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured`;
        throw new Error(message);
      }
     setMessage(await res.json());
     console.log(resMessage);
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
      };
      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(err.message);
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <div>
       <Button type="primary" htmlType="submit"  onClick={showModal}>Ajouter compte</Button>
       <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
       footer={null}>
       <div class="container">
      <div class="top-header">
        <h3>Bienvenue!</h3>
        <p>Ajouter un utilisateur</p>
      </div>
      <form action="">
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input placeholder="Login" ref={login} type="text" required />
        </div>
        <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input  placeholder="Email" ref={email} type="email" required />
        </div>
        <div class="pass">
          <i class="bx bxs-lock-alt"></i>
          <input  placeholder="Mot de passe" ref={password} type="password" required/>
        </div>
        <div class="user">
          <i class="bx bxs-lock-alt"></i>
          <input  placeholder="Prénom" ref={firstname} type="text" required/>
        </div>
        <div class="user">
          <i class="bx bxs-lock-alt"></i>
          <input  placeholder="Nom" ref={lastname} type="text" required/>
        </div>
        <div class="user">
          <i class="bx bxs-lock-alt"></i>
          <input  placeholder="Numéro téléphone" ref={numtel}  required/>
        </div>
        <div class="user">
          <i class="bx bxs-lock-alt"></i>
          <input  placeholder="Role" defaultValue="User" ref={Role}  type="text" required/>
      </div>
      <div class="btn">
        <button onClick={postData}>Enregistré</button>
      </div>
      </form>
       </div>
      </Modal>
    </div>
  );
}
