import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import CreateModal from "./CreateModal";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function List() {
  const [bookList, setBookList] = useState([]);

  const getAllBook = async () => {
    try {
      await axios
        .get("https://apiaru.vercel.app/api/getAll")
        .then((res) => {
          //   console.log(res);
          setBookList(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    //   console.log("ok");
    try {
      await axios
        .delete(`https://apiaru.vercel.app/api/delete/${id}`)
        .then((res) => {
          // console.log(res);
          if (res.data.msg === "OK") {
            Swal.fire({
              title: "ลบสำเร็จ",
              text: "ลบสำเร็จ",
              icon: "success",
            });

            getAllBook();
          } else {
            Swal.fire({
              title: "ลบไม่สำเร็จ",
              text: "ลบไม่สำเร็จ",
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
  };

  useEffect(() => {
    getAllBook();
  }, []);
  return (
    <>
      <h3>Books List</h3>
      <CreateModal reloadList={getAllBook} />

      {bookList.length > 0 ? (
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link to={`/edit/${item.id}`}>
                      {" "}
                      <Button variant="primary">แก้ไข</Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      ลบ
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        "Loading"
      )}
    </>
  );
}
