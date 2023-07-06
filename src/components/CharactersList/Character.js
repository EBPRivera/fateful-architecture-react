const Character = ({ character }) => {
  const { name, description } = character;

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
    </tr>
  );
};

export default Character;
