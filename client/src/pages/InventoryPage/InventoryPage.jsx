import React, { memo } from "react";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import InventoryList from "../../components/InventoryForm/InventoryList";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";

const Inventory = () => {
  return (
    <DefaultLayout>
      <InventoryForm />
      <InventoryList />
    </DefaultLayout>
  );
};

export default memo(Inventory);
