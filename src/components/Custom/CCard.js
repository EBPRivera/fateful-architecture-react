import _ from "lodash";
import { Card } from "react-bootstrap";

const CCard = ({ title = null, children }) => {
  return (
    <Card body className="c-card">
      {!_.isNull(title) && <Card.Title as="h2">{title}</Card.Title>}
      {children}
    </Card>
  );
};

export default CCard;
