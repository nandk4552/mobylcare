// import React from "react";

// const ImageCard = ({ item }) => {
//   console.log("image", item);
//   return (
//     <div className="w-100 h-100 overflow-hidden ">
//       {/* accesing photo dynamically */}
//       <img
//         src={`${import.meta.env.VITE_SERVER}/api/v1/inventory/item-photo/${
//           item?._id
//         }`}
//         className="scale-on-hover card-img-top  border-bottom img-responsive img object-fit-center"
//         alt={item?.itemName}
//         height={"50px"}
//         width={"50px"}
//       />
//     </div>
//   );
// };

// export default ImageCard;
import React from "react";
import { Card } from "antd";

const ImageCard = ({ item }) => {
  return (
    <Card
      cover={
        <img
          alt={item?.itemName}
          src={`${import.meta.env.VITE_SERVER}/api/v1/inventory/item-photo/${
            item?._id
          }`}
          className="scale-on-hover border-bottom"
          style={{ objectFit: "cover" }}
          height={"100px"}
          width={"100px"}
        />
      }
      className="w-100 h-100"
    >
      {/* You can add additional content inside the card if needed */}
    </Card>
  );
};

export default ImageCard;
