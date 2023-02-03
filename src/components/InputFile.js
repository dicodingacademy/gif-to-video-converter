import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import FileInputStyled from './styled/FileInputStyled';
import FileInputContainer from './styled/FileInputContainer';
import FileInputLabelStyled from './styled/FileInputLabelStyled';

function InputFile({ inputFileChange, disabled }) {
  const inputFile = useRef(null);

  const onInputFileChange = () => {
    inputFileChange(inputFile.current.files[0]);
  };

  return (
    <FileInputContainer>
      <FileInputLabelStyled htmlFor="inputFile">
        Drop or select GIF
      </FileInputLabelStyled>
      <FileInputStyled disabled={disabled} id="inputFile" type="file" accept="image/gif" ref={inputFile} onChange={onInputFileChange} />

    </FileInputContainer>
  );
}

InputFile.propTypes = {
  inputFileChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

InputFile.defaultProps = {
  disabled: false,
};

export default InputFile;
