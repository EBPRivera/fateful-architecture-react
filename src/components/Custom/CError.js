import { Alert } from "react-bootstrap";

const CError = ({
  children,
  heading = "Detected an Error",
  onClose = () => {},
  dismissible = false,
}) => {
  return (
    <Alert variant="danger" dismissible={dismissible} onClose={onClose}>
      <Alert.Heading>{heading}</Alert.Heading>
      {children}
    </Alert>
  );
};

export default CError;
