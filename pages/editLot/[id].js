import React, { useEffect, useState } from "react";
import { Container, Header, Form, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

// const lotLookup = `https://scraptrackbe.onrender.com/api/lot/{lot._id}`

const EditLot = ({ lotID }) => {
  const router = useRouter();
  const [editLot, setEditLot] = useState([]);

  useEffect(() => {
    const getLot = async () => {
      const lot = await fetch(
        `https://scraptrackbe.onrender.com/api/lot/${router.query.id}`,
        {
          method: "GET",
          mode: "cors",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setEditLot(data.data);
        });
    };
    getLot();
  }, [router.query.id]);

  const handleLotUpdate = async (e) => {
    e.preventDefault();
    const data = {
      totalCoilWeight: e.target[0].value,
      singlePartWeight: e.target[1].value,
      ForgingCounterTotal: e.target[2].value,
      ForgingScrap: e.target[3].value,
      ForgingNote: e.target[4].value,
      PressingCounterTotal: e.target[5].value,
      PressingScrap: e.target[6].value,
      PressingNote: e.target[7].value,
      TappingCounterTotal: e.target[8].value,
      TappingScrap: e.target[9].value,
      TappingNote: e.target[10].value,
      VSPackCounterTotal: e.target[11].value,
      VSPackScrap: e.target[12].value,
      VSPackNote: e.target[13].value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = `https://scraptrackbe.onrender.com/api/lot/${router.query.id}`;

    const options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    console.log(response);
    const result = await response.json();

    if (result) {
      router.push("/");
    }
  };

  return (
    <Container fluid>
      <Header as="h1">
        {" "}
        Edit Lot: {editLot.num}
        <Header sub>{editLot.partName}</Header>
      </Header>

      <Form onSubmit={handleLotUpdate}>
        <Form.Field>
          <label>Coil Weight:</label>
          <input placeholder={editLot.totalCoilWeight} />
        </Form.Field>
        <Form.Field>
          <label>Single Part Weight:</label>
          <input placeholder={editLot.singlePartWeight} />
        </Form.Field>
        <hr />
        <Form.Field>
          <label>Forging Counter Total:</label>
          <input placeholder={editLot.ForgingCounterTotal} />
        </Form.Field>
        <Form.Field>
          <label>Forging Scrap Weight:</label>
          <input placeholder={editLot.ForgingScrap} />
        </Form.Field>
        <Form.Field>
          <label>*Forging Note:</label>
          <input placeholder="someting something darkside" />
        </Form.Field>
        <Form.Field>
          <label>Pressing Counter Total: </label>
          <input placeholder={editLot.PressingCounterTotal} />
        </Form.Field>
        <Form.Field>
          <label>Pressing Scrap Weight: </label>
          <input placeholder={editLot.PressingScrap} />
        </Form.Field>
        <Form.Field>
          <label>*Pressing Note:</label>
          <input />
        </Form.Field>
        <Form.Field>
          <label>Tapping Counter Total: </label>
          <input placeholder={editLot.TappingCounterTotal} />
        </Form.Field>
        <Form.Field>
          <label>Tapping Scrap Weight: </label>
          <input placeholder={editLot.TappingScrap} />
        </Form.Field>
        <Form.Field>
          <label>*Tapping Note:</label>
          <input />
        </Form.Field>
        <Form.Field>
          <label>VS / Pack Counter Total: </label>
          <input placeholder={editLot.VSPackCounterTotal} />
        </Form.Field>
        <Form.Field>
          <label>VS / Pack Scrap Weight: </label>
          <input placeholder={editLot.VSPackScrap} />
        </Form.Field>
        <Form.Field>
          <label>*VS / Pack Note:</label>
          <input />
        </Form.Field>
        <Button basic color="orange">
          Update Lot
        </Button>
      </Form>
    </Container>
  );
};

export default EditLot;
