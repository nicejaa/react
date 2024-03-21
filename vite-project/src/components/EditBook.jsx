import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function EditBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (title !== "" && price !== "") {
      //   console.log("ok");
      try {
        const payload = {
          id,
          title,
          price,
        };
        await axios
          .put("https://apiaru.vercel.app/api/update", payload)
          .then((res) => {
            // console.log(res);
            if (res.data.msg === "OK") {
              Swal.fire({
                title: "อัพเดทสำเร็จ",
                text: "อัพเดทสำเร็จ",
                icon: "success",
              });
              navigate("/");
            } else {
              Swal.fire({
                title: "อัพเดทไม่สำเร็จ",
                text: "อัพเดทไม่สำเร็จ",
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

  const getBookDetail = async () => {
    try {
      await axios
        .get(`https://apiaru.vercel.app/api/detail/${id}`)
        .then((res) => {
          setTitle(res.data.data[0].title);
          setPrice(res.data.data[0].price);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBookDetail();
  }, []);
  return (
    <>
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
      <div className="d-flex gap-1">
        <Button variant="primary" onClick={handleSave}>
          อัพเดท
        </Button>

        <Link to={`/`}>
          {" "}
          <Button variant="danger">กลับ</Button>
        </Link>
      </div>
    </>
  );
}
