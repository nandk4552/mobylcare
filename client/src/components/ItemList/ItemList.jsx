import { Button, Card } from "antd";
import React, { useState } from "react";
import "./ItemList.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Skeleton, Switch } from "antd";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.rootReducer);
  const { Meta } = Card;

  const handleAddToCart = () => {
    dispatch({
      type: "rootReducer/addItemToCart",
      payload: { ...item, quantity: 1 },
    });
  };
  return (
    <div>
      <Card
        loading={loading}
        hoverable={true}
        style={{
          width: 240,
          margin: "1rem !important",
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          // marginTop: 16,
        }}
        cover={
          <img
            alt={item?.name + "image"}
            src={item?.image}
            style={{
              height: 220,
              width: "100%",
              objectFit: "cover",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            }}
          />
        }
      >
        <Meta title={item?.name} />
        <div className="item-btn">
          <Button
            onClick={() => handleAddToCart()}
            icon={<PlusCircleOutlined />}
          >
            Add to Card
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
