import React from "react";
import { Header, Icon } from "semantic-ui-react";
import NewLotForm from "../components/NewLotForm";

const addNewLot = () => {
  return (
    <>
      <Header as="h2">
        <Icon name="plus circle" color="green" />
        <Header.Content>Add New Lot</Header.Content>
      </Header>
      <hr />
      <NewLotForm />
    </>
  );
};

export default addNewLot;
