import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

const VSPackReportForm = ({ lotID }) => {
  const router = useRouter();
  const handleVSPackScrapReport = async (e) => {
    e.preventDefault();

    const data = {
      VSPackCounterTotal: e.target[0].value,
      VSPackScrap: e.target[1].value,
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
    <div>
      <Form onSubmit={handleVSPackScrapReport}>
        <Form.Field>
          <label>Counter Total:</label>
          <input placeholder="Counter Total..." />
        </Form.Field>
        <Form.Field>
          <label>Scrap Weight:</label>
          <input placeholder="If None, Enter 0" />
        </Form.Field>
        <Button basic color="green" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VSPackReportForm;
