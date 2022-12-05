import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Header, Form, Container } from "semantic-ui-react";
import TappingReportForm from "../components/TappingReportForm";

const TappingScrap = () => {
  const [currentTappingLots, setCurrentTappingLots] = useState([]);
  useEffect(() => {
    axios
      .get("https://scraptrackbe.onrender.com/api/lot")
      .then(function (res) {
        setCurrentTappingLots(res.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    // fetch("https://scraptrackbe.onrender.com/api/lot")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCurrentTappingLots(data.data);
    //   });
  }, []);
  const TappingReady = currentTappingLots?.filter(
    (l) => l.TappingCounterTotal == undefined
  );
  const tapCards = TappingReady?.map((lot) => (
    <Card key={lot._id}>
      <Card.Content>
        <Card.Header>{lot.num}</Card.Header>
        <Card.Meta>{lot.partName}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <TappingReportForm lotID={lot._id} />
      </Card.Content>
    </Card>
  ));
  return (
    <div>
      <Container fluid>
        <Header as="h1">Active Tapping</Header>
        <Card.Group>{tapCards}</Card.Group>
      </Container>
    </div>
  );
};

export default TappingScrap;
