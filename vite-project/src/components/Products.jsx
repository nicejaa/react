import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
export default function Products() {
  const [products, setProducts] = useState([]);

  const [carts, setCarts] = useState([]);

  const addToCart = (obj) => {
    const isFoundItem = carts.some((x) => x.id === obj.id);

    if (!isFoundItem) {
      setCarts([...carts, obj]);
    } else {
      alert("มีสินค้าในตะกร้าแล้ว");
    }
  };
  const loadApi = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=5");

    setProducts(res.data.products);
  };
  useEffect(() => {
    loadApi();
  }, []);
  return (
    <div>
      <div className="d-flex gap-1">
        <div className="col-6">
          <h4>Product</h4>
          <Card className="mt-2">
            <Card.Body>
              {/* Loop Product */}
              {products?.map((item) => {
                return (
                  <div key={item.id}>
                    <Card style={{ width: "18rem" }} className="p-2 m-2">
                      <Card.Img
                        variant="top"
                        src={item.images[0]}
                        style={{ width: 150, height: 150 }}
                      />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>Price : {item.price}</Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => addToCart(item)}
                        >
                          Add to cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}

              {/* End Loop */}
            </Card.Body>
          </Card>
        </div>
        {/* Cart */}
        {carts.length > 0 && (
          <div className="col-6">
            <h4>Carts</h4>
            <Card className="mt-2">
              <Card.Body>
                {carts?.map((item) => {
                  return (
                    <>
                      <div className="d-flex w-full">
                        <div className="col-6">
                          <p>{item.title}</p>
                        </div>
                        <div className="col-6">
                          <p>{item.price}</p>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
              </Card.Body>
              <Button className="m-2">Checkout</Button>
            </Card>
          </div>
        )}
        {/* end Cart */}
      </div>
    </div>
  );
}
