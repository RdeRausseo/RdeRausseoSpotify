import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const { songs, setSongs } = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = fetch("/sound/songs", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (!data.ok) {
          throw new Error(
            `Error al obtener la lista de canciones ${data.status}`
          );
        }
        const dataJson = await data.json();
        setSongs(dataJson.songs);
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
    <div className="text-center">
      <h1 className="text-center mt-5">Hello Rigo!</h1>
      <p>
        <img src={rigoImage} />
      </p>
      <a href="#" className="btn btn-success">
        If you see this green button... bootstrap is working...
      </a>
      <p>
        Made by <a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
        love!
      </p>
    </div>
  );
};

export default Home;
