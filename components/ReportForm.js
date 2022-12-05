import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "semantic-ui-react";

const ReportForm = ({ lotID }) => {
  const router = useRouter();
  const handleForgingScrapReport = async (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    const data = {
      ForgingCounterTotal: e.target[0].value,
      ForgingScrap: e.target[1].value,
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
    <Form onSubmit={handleForgingScrapReport}>
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

export default ReportForm;
