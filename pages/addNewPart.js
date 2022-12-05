import React from "react";
import { Header, Icon } from "semantic-ui-react";

import NewPartForm from "../components/NewPartForm";

const addNewPart = () => {
  return (
    <>
      <Header as="h2">
        <Icon name="plus circle" />
        <Header.Content>Add New Part</Header.Content>
      </Header>
      <hr />
      <NewPartForm />
    </>
  );
};

export default addNewPart;
