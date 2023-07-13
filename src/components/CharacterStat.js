const CharacterStat = ({ title, value }) => {
  return (
    <>
      <h5>{title}</h5>
      <hr />
      <div>
        <b>{value}</b>
      </div>
    </>
  );
};

export default CharacterStat;
