import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Header, Form, Container } from "semantic-ui-react";

import ReportForm from "../components/ReportForm";

const ForgingScrap = () => {
  const [currentForgingLots, setCurrentForgingLots] = useState([]);
  useEffect(() => {
    axios
      .get("https://scraptrackbe.onrender.com/api/lot")
      .then(function (res) {
        setCurrentForgingLots(res.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const forgingReady = currentForgingLots?.filter(
    (l) => l.ForgingCounterTotal == undefined
  );

  const fCards = forgingReady?.map((lot) => (
    <Card key={lot._id}>
      <Card.Content>
        <Card.Header>{lot.num}</Card.Header>
        <Card.Meta>{lot.partName}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <ReportForm lotID={lot._id} />
      </Card.Content>
    </Card>
  ));
  return (
    <Container fluid>
      <Header as="h1">Active Forging</Header>
      <Card.Group>{fCards}</Card.Group>
    </Container>
  );
};

export default ForgingScrap;
