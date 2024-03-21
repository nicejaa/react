import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";

function CreateModal({ reloadList }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    if (title !== "" && price !== "") {
      //   console.log("ok");
      try {
        const payload = {
          title,
          price,
        };
        await axios
          .post("https://apiaru.vercel.app/api/add", payload)
          .then((res) => {
            // console.log(res);
            if (res.data.msg === "OK") {
              Swal.fire({
                title: "บันทึกสำเร็จ",
                text: "บันทึกสำเร็จ",
                icon: "success",
              });
              setShow(false);
              reloadList();
            } else {
              Swal.fire({
                title: "บันทึกไม่สำเร็จ",
                text: "บันทึกไม่สำเร็จ",
                icon: "error",
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      Swal.fire({
        title: "โปรดเช็คเงื่อนไข?",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน ?",
        icon: "question",
      });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        เพิ่มข้อมูล
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
