import React from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

const PressingReportForm = ({ lotID }) => {
  const router = useRouter();
  const handlePressingScrapReport = async (e) => {
    e.preventDefault();

    const data = {
      PressingCounterTotal: e.target[0].value,
      PressingScrap: e.target[1].value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = `https://scraptrackbe.onrender.com/api/lot/${lotID}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result) {
      router.push("/");
    }
  };
  return (
    <Form onSubmit={handlePressingScrapReport}>
      <Form.Field>
        <label>Counter Total:</label>
        <input placeholder="Counter Total..." />
      </Form.Field>
      <Form.Field>
        <label>Scrap Weight:</label>
        <input placeholder="Scrap Weight..." />
      </Form.Field>
      <Button basic color="green" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PressingReportForm;
