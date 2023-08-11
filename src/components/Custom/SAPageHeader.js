import { Container } from "react-bootstrap";

const SAPageHeader = ({ children }) => {
  return (
    <div className="sa-page-header p-3">
      <Container>{children}</Container>
    </div>
  );
};

export default SAPageHeader;
