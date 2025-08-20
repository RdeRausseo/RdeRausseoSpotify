import React, { useEffect, useState, useRef } from "react";
import Song from "./Song";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiLeftArrowCircle,
  BiRightArrowCircle,
} from "react-icons/bi";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const refAudio = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState([]);

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
  }, []);

  useEffect(() => {
    if (refAudio.current) {
      refAudio.current.src = currentSong.previewUrl;
      refAudio.current.play();
    }
  }, [currentSong]);

  function next(url) {}

  return (
    <div className="position-relative p-3">
      <ul className="mx-auto list-group w-50">
        {songs?.map((song, index) => {
          return (
            <li
              onClick={() => {
                setCurrentSong(song);
                setisPlaying(true);
              }}
              className="list-group-item bg-body-tertiary"
              key={index}
            >
              <Song index={index} nombre={song.artistName} />
            </li>
          );
        })}
      </ul>

      <div className=" text-center fixed-bottom">
        <button className="btn border-0 bg-transparent p-0">
          <BiLeftArrowCircle className="" size={80} />
        </button>
        <button
          onClick={() => {
            setisPlaying(false);
            refAudio.current.pause();
          }}
          className={isPlaying ? "btn p-0 border-0 bg-transparent" : "d-none"}
        >
          <BiPauseCircle size={80} />
        </button>
        <button
          onClick={() => {
            setisPlaying(true);
            refAudio.current.play();
          }}
          className={isPlaying ? "d-none" : "btn p-0 bg-transparent border-0"}
        >
          <BiPlayCircle size={80} />
        </button>
        <button className="btn p-0 bg-transparent border-0">
          <BiRightArrowCircle size={80} />
        </button>
        
        <audio ref={refAudio} src={songs[0]?.previewUrl} />
      </div>
    </div>
  );
};

export default Home;
