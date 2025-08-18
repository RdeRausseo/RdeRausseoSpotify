import React from "react";
import PropTypes from "prop-types";

const Song = ({ index, nombre }) => {
  return (
    <div className="p-3">
      <p>
        <span className="me-4">{index}</span> {nombre}
      </p>
    </div>
  );
};

Song.propTypes = {
  index: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
};

export default Song;
