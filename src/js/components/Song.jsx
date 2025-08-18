import React from "react";
import Proptype from "prop-types";

const Song = ({ id, nombre }) => {
  return (
    <div className="border border-light-subtle">
      <p>
        <span className="me-4">{id}</span> {nombre}
      </p>
    </div>
  );
};

Song.propTypes = {
  id: Proptypes.number.isRequired,
  nombre: Proptypes.string.isRequired,
};

export default Song;
