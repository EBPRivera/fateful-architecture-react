const Die = ({ size }) => {
  return (
    <div className={`die ${size}`}>
      <h5>{size}</h5>
    </div>
  );
};

export default Die;
