import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Header, Form, Container } from "semantic-ui-react";

import PressingReportForm from "../components/PressingReportForm";

const PressingScrap = () => {
  const [currentPressingLots, setCurrentPressingLots] = useState([]);
  useEffect(() => {
    axios
      .get("https://scraptrackbe.onrender.com/api/lot")
      .then(function (res) {
        setCurrentPressingLots(res.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const PressingReady = currentPressingLots?.filter(
    (l) => l.PressingCounterTotal == undefined
  );
  const pCards = PressingReady?.map((lot) => (
    <Card key={lot._id}>
      <Card.Content>
        <Card.Header>{lot.num}</Card.Header>
        <Card.Meta>{lot.partName}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <PressingReportForm lotID={lot._id} />
      </Card.Content>
    </Card>
  ));
  return (
    <Container fluid>
      <Header as="h1">Active Pressing</Header>
      <Card.Group>{pCards}</Card.Group>
    </Container>
  );
};

export default PressingScrap;
