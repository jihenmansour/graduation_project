
import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Modal
} from 'antd';


export function Pop() {
  const firstname = useRef(null);
  const name = useRef(null);
  const subject = useRef(null);
  const issue_status = useRef(null);
  const description = useRef(null);
  const created_on = useRef(null);
  const closed_on = useRef(null);
  const [postResult, setPostResult] = useState(null);
  async function postData() {
    const postData = {
        firstname: firstname.current.value,
        name: name.current.value,
        subject: subject.current.value,
        issue_status: issue_status.current.value,
        description: description.current.value,
        created_on: created_on.current.value,
        closed_on: closed_on.current.value,
    };
    try {
      const res = await fetch(`https://localhost:44314/api/Table`, {
        method: "post",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };
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

  let userData =JSON.parse(localStorage.getItem('theme'));

  return (
    <div>
       <Button type="primary" htmlType="submit"  onClick={showModal}>Ajouter tache</Button>
       <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
       footer={null}>
       <div class="container">
      <div class="top-header">
        <h3>Bienvenue!</h3>
        <p>Créez une tache</p>
      </div>
      <form action="">
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input placeholder="projet" ref={name} defaultValue={userData} required />
      </div>
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input placeholder="description" ref={description}  />
      </div>
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input placeholder="sujet" ref={subject} required />
      </div>
       
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input placeholder="responsable" ref={firstname} required />
      </div>
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input placeholder="status" ref={issue_status} defaultValue="À Faire" required />
      </div>
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input  ref={created_on} type ="datetime-local"/>
      </div>
      <div class="user">
          <i class="bx bxs-user-circle"></i>
          <input ref={closed_on} type="datetime-local" required />
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