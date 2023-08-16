import { Container } from "react-bootstrap";

const CPageHeader = ({ children }) => {
  return (
    <div className="c-page-header p-3">
      <Container className="d-flex align-items-start">{children}</Container>
    </div>
  );
};

export default CPageHeader;
