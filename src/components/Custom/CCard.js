import _ from "lodash";
import classNames from "classnames";
import { Card } from "react-bootstrap";

const CCard = ({ className, title = null, children }) => {
  return (
    <Card body className={classNames("c-card", className)}>
      {!_.isNull(title) && <Card.Title as="h2">{title}</Card.Title>}
      {children}
    </Card>
  );
};

export default CCard;
