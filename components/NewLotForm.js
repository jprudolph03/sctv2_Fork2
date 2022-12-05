import Router from "next/router";
import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";

const NewLotForm = () => {
  const [parts, setParts] = useState([]);
  const [formSubSuccess, setFormSubSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const router = Router;

  //grab parts list, put in state
  useEffect(() => {
    setLoading(true);
    fetch("https://scraptrackbe.onrender.com/api/part")
      .then((res) => res.json())
      .then((data) => {
        setParts(data.data);
        setLoading(false);
      });
  }, []);

  //after finding the parts, find part, set part
  const lookUpPrefix = (e) => {
    e.preventDefault();
    let lotPFix = e.target.value.slice(0, 2);
    const lookup = parts.find((el) => el.lotPrefix == lotPFix);
    setSelectedPart(lookup);
  };

  const handleNewLotSubmit = async (e) => {
    e.preventDefault();

    const data = {
      num: e.target[0].value,
      partName: e.target[1].value,
      singlePartWeight: e.target[2].value,
      totalCoilWeight: e.target[3].value,
      lotLoss: e.target[4].value,
      eXt: parseInt(
        ((e.target[3].value - e.target[4].value) / e.target[2].value) * 1000
      ),
    };

    const JSONdata = JSON.stringify(data);

    // console.log(JSONdata);

    const endpoint = "https://scraptrackbe.onrender.com/api/lot";
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
    <Form onSubmit={handleNewLotSubmit}>
      <Form.Field>
        <label>New Lot Number</label>
        <input placeholder="part name" onChange={lookUpPrefix} />
      </Form.Field>
      <Form.Field>
        <label>Part Name</label>
        <input
          value={selectedPart ? selectedPart.name : "null"}
          type="text"
          step={"0.01"}
        />
      </Form.Field>
      <Form.Field>
        <label>Single Part Weight</label>
        <input placeholder="Single Part Weight" type="number" step={"0.01"} />
      </Form.Field>
      <Form.Field>
        <label>Total Coil Weight</label>
        <input placeholder="Total Coil Weight" type="number" step={"0.01"} />
      </Form.Field>
      <Form.Field>
        <label>Standard Loss</label>
        <input
          value={selectedPart ? selectedPart.STDLoss : 0}
          type="number"
          step={"0.01"}
        />
      </Form.Field>
      <Button type="submit" color="green">
        Submit
      </Button>
    </Form>
  );
};

export default NewLotForm;
