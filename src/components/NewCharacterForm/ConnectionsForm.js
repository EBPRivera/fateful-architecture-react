import _ from "lodash";
import { Button, Container, Row, Col, InputGroup } from "react-bootstrap";

import CTextInput from "../Custom/CTextInput";
import CTextArea from "../Custom/CTextArea";
import CInputErrors from "../Custom/CInputErrors";

const FATE_LIMIT = 5;

const ConnectionsForm = ({ connections, errors, onChange }) => {
  const handleAddConnection = () => {
    onChange([
      ...connections,
      {
        name: "",
        description: "",
      },
    ]);
  };

  const handleDeleteConnection = (index) => {
    const newConnections = _.filter(
      connections,
      (val, key) => !_.isEqual(key, index)
    );

    onChange(newConnections);
  };

  const handleChangeConnection = (val, index, field) => {
    let newConnections = _.cloneDeep(connections);

    const newConnection = {
      ...connections[index],
      [field]: val,
    };

    newConnections[index] = newConnection;

    onChange(newConnections);
  };

  const renderErrors = () => {
    if (_.isEmpty(errors)) return;

    return (
      <Row>
        <Container>
          <CInputErrors errors={errors} />
        </Container>
      </Row>
    );
  };

  const renderConnections = () => {
    if (_.isEmpty(connections)) return;

    return (
      <Row className="mb-3">
        <Container className="connections-form-list">
          {_.map(connections, (connection, index) => {
            return (
              <Row key={index}>
                <Container>
                  <Row>
                    <InputGroup>
                      <CTextInput
                        value={connection.name}
                        onChange={(val) =>
                          handleChangeConnection(val, index, "name")
                        }
                      />
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteConnection(index)}
                      >
                        Delete
                      </Button>
                    </InputGroup>
                  </Row>
                  <Row>
                    <CTextArea
                      value={connection.description}
                      onChange={(val) =>
                        handleChangeConnection(val, index, "description")
                      }
                    />
                  </Row>
                </Container>
              </Row>
            );
          })}
        </Container>
      </Row>
    );
  };

  return (
    <Container className="ps-0">
      <Row>
        <p>Remaining Architecture Points: {FATE_LIMIT - _.size(connections)}</p>
      </Row>
      {renderConnections()}
      <Row className="mb-3">
        <Col>
          <Button
            disabled={_.size(connections) >= FATE_LIMIT}
            onClick={handleAddConnection}
          >
            Add Connection
          </Button>
        </Col>
      </Row>
      {renderErrors()}
    </Container>
  );
};

export default ConnectionsForm;
