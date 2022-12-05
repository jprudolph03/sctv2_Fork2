import React from "react";
import { Message } from "semantic-ui-react";

const LotLeaderNotes = ({ id }) => {
  return (
    <div>
      <Message floating compact>
        <Message.Header>Notes: </Message.Header>
        <Message.List>
          <Message.Item>Forging: {id.ForgingNote}</Message.Item>
          <Message.Item>Pressing: {id.PressingNote}</Message.Item>
          <Message.Item>Tapping: {id.TappingNote}</Message.Item>
          <Message.Item>VS / Pack: {id.VSPackNote}</Message.Item>
        </Message.List>
      </Message>
    </div>
  );
};

export default LotLeaderNotes;
