import _ from "lodash";
import { useState, useContext } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import { CharacterContext } from "../../containers/Character";
import Connection from "./Connection";
import ConnectionModal from "./ConnectionModal";
import ConnectionForm from "./ConnectionForm";
import CNumberInput from "../Custom/CNumberInput";

const FateConnectionsTab = () => {
  const { character, setCharacter, handleUpdateCharacter } =
    useContext(CharacterContext);
  const { connections, fate } = character;
  const [modalData, setModalData] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const handleAddConnection = async (newConnection) => {
    const newCharacter = {
      ...character,
      fate: character.fate - 1,
      connections: [...connections, newConnection],
    };

    await handleUpdateCharacter(newCharacter);
    setCharacter(newCharacter);
    setIsAdding(false);
  };

  const handleChangeFate = (value) => {
    setCharacter({
      ...character,
      fate: value,
    });
  };

  const handleToggleForm = () => {
    setIsAdding((isAdding) => !isAdding);
  };

  const showModal = (connection, index) => {
    setModalData({ ...connection, index });
  };

  const hideModal = () => {
    setModalData({});
  };

  const renderModal = () => {
    return (
      <ConnectionModal
        modalData={modalData}
        onHide={hideModal}
        show={!_.isEmpty(modalData)}
      />
    );
  };

  const renderConnections = () => {
    if (_.isEmpty(connections)) return;

    return (
      <Row className="connections-list">
        <Container>
          {_.map(connections, (connection, key) => {
            return (
              <Row key={key}>
                <Connection
                  connection={connection}
                  onClick={() => showModal(connection, key)}
                />
              </Row>
            );
          })}
        </Container>
      </Row>
    );
  };

  return (
    <>
      {renderModal()}
      <Card className="p-3 character-tabs">
        <Container>
          <Row sm={4}>
            <CNumberInput
              label="Fate Points"
              onChange={handleChangeFate}
              min={0}
              value={fate}
            />
          </Row>
          {renderConnections()}
          {isAdding && (
            <ConnectionForm className="pb-3" onSubmit={handleAddConnection} />
          )}
          <Row>
            <Col>
              <Button
                disabled={fate <= 0}
                onClick={handleToggleForm}
                variant={isAdding ? "warning" : "primary"}
              >
                {isAdding ? "Cancel" : "Add Connection"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default FateConnectionsTab;
