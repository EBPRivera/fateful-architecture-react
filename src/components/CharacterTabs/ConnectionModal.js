import _ from "lodash";
import { useState, useContext } from "react";
import { Button, Container, Modal } from "react-bootstrap";

import { parseParagraphs } from "../../helpers/input";
import { CharacterContext } from "../../containers/Character";
import ConnectionForm from "./ConnectionForm";

const ConnectionModal = ({ modalData, onEdit, onHide, ...props }) => {
  const { character, setCharacter, handleUpdateCharacter } =
    useContext(CharacterContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async (connection) => {
    const { name, description, index } = connection;

    let newConnections = _.cloneDeep(character.connections);
    const editedConnection = { name, description };
    newConnections[index] = editedConnection;

    const editedCharacter = {
      ...character,
      connections: newConnections,
    };

    await handleUpdateCharacter(editedCharacter);
    setCharacter(editedCharacter);
    handleHide();
  };

  const handleDelete = async () => {
    const { index } = modalData;
    const { connections } = character;

    const newCharacter = {
      ...character,
      connections: _.filter(connections, (val, key) => !_.isEqual(key, index)),
    };

    await handleUpdateCharacter(newCharacter);
    setCharacter(newCharacter);
    handleHide();
  };

  const handleHide = () => {
    setIsEditing(false);
    onHide();
  };

  const renderForm = () => {
    return (
      <>
        <ConnectionForm
          className="m-3"
          defaultValue={modalData}
          editing
          onSubmit={handleEdit}
        />
        <Container className="mb-3">
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </Container>
      </>
    );
  };

  const renderDisplay = () => {
    return (
      <Modal.Body>
        {_.map(parseParagraphs(modalData.description), (paragraph, key) => {
          return <p key={key}>{paragraph}</p>;
        })}
      </Modal.Body>
    );
  };

  return (
    <Modal onHide={handleHide} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalData.name}
          <Button
            className="ms-2"
            onClick={() => setIsEditing((isEditing) => !isEditing)}
            size="sm"
            variant={isEditing ? "warning" : "outline-success"}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </Modal.Title>
      </Modal.Header>
      {isEditing ? renderForm() : renderDisplay()}
    </Modal>
  );
};

export default ConnectionModal;
