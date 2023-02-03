import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function InputFile({ inputFileChange }) {
  const inputFile = useRef(null);

  const onInputFileChange = () => {
    inputFileChange(inputFile.current.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/gif" ref={inputFile} onChange={onInputFileChange} />
    </div>
  );
}

InputFile.propTypes = {
  inputFileChange: PropTypes.func.isRequired,
};

export default InputFile;
