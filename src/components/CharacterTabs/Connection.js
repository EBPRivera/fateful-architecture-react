import { useState } from "react";
import { BsBookHalf, BsEye } from "react-icons/bs";

const Connection = ({ connection, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span>
      <span
        className="connection-name"
        value={connection.name}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {isHovered ? <BsEye /> : <BsBookHalf />}
        <b className="ms-1">{connection.name}</b>
      </span>
    </span>
  );
};

export default Connection;
