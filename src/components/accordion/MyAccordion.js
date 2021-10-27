import React from "react";
import Accordion from "react-bootstrap/Accordion";
import '../../App.css'

export const MyAccordion = ({ children, direction, title }) => {
  console.log(direction);
  let style
  if(direction === 'top'){
    style = {position: "fixed", bottom: "20px", right: "20px", boxShadow: "2px 2px 5px lightgrey"}
  } else if (direction === "bottom") {
    style = { marginBottom: '20px', borderRadius: "20px", boxShadow: "2px 2px 5px lightgrey"}
  }
  return (
    <Accordion style={style}>
      <Accordion.Item eventKey="0">
        {direction === "top" && (
          <Accordion.Body style={{ padding: "0px" }}>{children}</Accordion.Body>
        )}
        <Accordion.Header>{title}</Accordion.Header>
        {direction === "bottom" && (
          <Accordion.Body style={{ padding: "0px" }}>{children}</Accordion.Body>
        )}
      </Accordion.Item>
    </Accordion>
  );
};
