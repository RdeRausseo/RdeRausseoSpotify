import React, { useEffect, useState, useRef } from "react";
import Song from "./Song";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiArrowLeftCircle,
  BiArrowRightCircle,
} from "react-icons/bi";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [songs, setSongs] = useState([]);
  const refAudio = useRef(null);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetch(
          "https://itunes.apple.com/search?term=reggaeton&entity=song&limit=20",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!data.ok) {
          throw new Error(
            `Error al hacer la solicitud para obtener la lista de canciones: ${data.status}`
          );
        }
        const dataJson = await data.json();
        setSongs(dataJson.results);
      } catch (error) {
        console.error("Ocurrio un error: ", error);
      }
    };
    getSongs();
  }, []);

  useEffect(() => {
    console.log("Canciones cargadas: ", songs);
  }, [songs]);

  return (
    <div className="position-relative p-3">
      <ul className="mx-auto list-group w-50">
        {songs?.map((song, index) => {
          return (
            <li className="list-group-item bg-body-tertiary" key={index}>
              <Song index={index} nombre={song.artistName} />
            </li>
          );
        })}
      </ul>

      <div className=" text-center fixed-bottom">
        <button className="btn border-0 bg-transparent p-0">
          <BiPlayCircle size={80} />
        </button>
        <button className="btn p-0 border-0 bg-transparent">
          <BiPauseCircle className="" size={80} />
        </button>
        <button>
          <BiArrowLeftCircle className="" size={80} />
        </button>
        <button>
          <BiArrowRightCircle size={80} />
        </button>
        <audio ref={refAudio} />
      </div>
    </div>
  );
};

export default Home;
