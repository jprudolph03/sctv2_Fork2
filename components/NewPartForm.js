import Router from "next/router";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const NewPartForm = () => {
  const [formSubSuccess, setFormSubSuccess] = useState(null);
  const router = Router;

  const handleNewPartSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target[0].value,
      lotPrefix: e.target[1].value,
      STDLoss: e.target[2].value,
    };

    const JSONdata = JSON.stringify(data);
    console.log(JSONdata);

    const endpoint = "https://scraptrackbe.onrender.com/api/part";

    const options = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    setFormSubSuccess(result);
    router.push("/");
  };

  return (
    <Form onSubmit={handleNewPartSubmit}>
      <Form.Field>
        <label>New Part Name</label>
        <input placeholder="part name" />
      </Form.Field>
      <Form.Field>
        <label>Part Prefix</label>
        <input placeholder="part prefix" type="number" step={"0.01"} />
      </Form.Field>
      <Form.Field>
        <label>Coil Loss</label>
        <input placeholder="coil loss" type="number" step={"0.01"} />
      </Form.Field>
      <Button type="submit" color="green">
        Submit
      </Button>
    </Form>
  );
};

export default NewPartForm;
