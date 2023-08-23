import { Container } from "react-bootstrap";

const CPageHeader = ({ children }) => {
  return (
    <div className="c-page-header pt-2 pb-1">
      <Container className="d-flex align-items-start">{children}</Container>
    </div>
  );
};

export default CPageHeader;
