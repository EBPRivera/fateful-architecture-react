import _ from "lodash";
import { Card } from "react-bootstrap";

const SACard = ({ title = null, children }) => {
  return (
    <Card body className="sa-card">
      {!_.isNull(title) && <Card.Title as="h2">{title}</Card.Title>}
      {children}
    </Card>
  );
};

export default SACard;
