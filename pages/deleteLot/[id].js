import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Image,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";

// https://scraptrackbe.onrender.com/api/lot/${router.query.id}

const DeleteLot = ({ lotId }) => {
  const [delLot, setDelLot] = useState(null);
  const router = useRouter();
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
          setDelLot(data.data);
        });
    };
    getLot();
  }, [router.query.id]);

  const handleDeleteLot = async (e) => {
    e.preventDefault();
    await fetch(
      "https://scraptrackbe.onrender.com/api/lot/${router.query.id}",
      {
        method: "DELETE",
      }
    )
      .then(function (res) {
        router.push("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const loadShow = delLot ? (
    <Card>
      <Card.Content>
        <Card.Header>{delLot.num}</Card.Header>
        <Card.Meta>{delLot.partName}</Card.Meta>
        <Card.Description>
          Delete Lot: <strong>{delLot.num}</strong> ?
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={handleDeleteLot}>
            Yes
          </Button>
          <Button basic color="red">
            No
          </Button>
        </div>
      </Card.Content>
    </Card>
  ) : (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>
  );

  return <div>{loadShow}</div>;
};

export default DeleteLot;
