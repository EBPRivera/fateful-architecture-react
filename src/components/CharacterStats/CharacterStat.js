import Die from "../Custom/Die";

const CharacterStat = ({ title, value }) => {
  const renderDie = () => {
    return (
      <div className="d-flex justify-content-center">
        <Die size={value} />
      </div>
    );
  };

  return (
    <div className="character-stat">
      <h5>{title}</h5>
      <hr />
      {renderDie()}
    </div>
  );
};

export default CharacterStat;
