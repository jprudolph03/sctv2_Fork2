import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Header, Form, Container } from "semantic-ui-react";
import VSPackReportForm from "../components/VSPackReportForm";

const VsPackScrap = () => {
  const [currentVSPackLots, setCurrentVSPackLots] = useState([]);
  useEffect(() => {
    axios
      .get("https://scraptrackbe.onrender.com/api/lot")
      .then(function (res) {
        setCurrentVSPackLots(res.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    // fetch("https://scraptrackbe.onrender.com/api/lot")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCurrentVSPackLots(data.data);
    //   });
  }, []);

  const VSPackReady = currentVSPackLots?.filter(
    (l) => l.VSPackCounterTotal == undefined && l.TappingCounterTotal >= 1
  );
  const vsPackCards = VSPackReady?.map((lot) => (
    <Card key={lot._id}>
      <Card.Content>
        <Card.Header>{lot.num}</Card.Header>
        <Card.Meta>{lot.partName}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <VSPackReportForm lotID={lot._id} />
      </Card.Content>
    </Card>
  ));

  return (
    <Container fluid>
      <Header as="h1">Active VS/Packing</Header>
      <Card.Group>{vsPackCards}</Card.Group>
    </Container>
  );
};

export default VsPackScrap;
