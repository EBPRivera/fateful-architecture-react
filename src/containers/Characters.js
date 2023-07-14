import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import useAuthorized from "../hooks/useAuthorized";
import useAxiosInstance from "../hooks/useAxiosInstance";
import CharactersList from "../components/CharactersList";

const Characters = () => {
  const isAuthorized = useAuthorized();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { id } = useSelector((state) => state.user);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      axiosInstance
        .get(`http://localhost:8080/users/${id}/characters`)
        .then(({ data }) => {
          setCharacters(data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.message);
          setIsLoading(false);
        });
    };

    if (!isAuthorized) {
      navigate("/");
    } else {
      fetchCharacters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="characters">
      <h1>Characters Page</h1>
      {isLoading ? <Spinner /> : <CharactersList characters={characters} />}
    </div>
  );
};

export default Characters;
