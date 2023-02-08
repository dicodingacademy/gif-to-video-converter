import React from 'react';
import PropTypes from 'prop-types';
import OptionsSizeContainerStyled from './styled/OptionsSizeContainerStyled';
import SelectStyled from './styled/SelectStyled';
import OptionsSizeLabelStyled from './styled/OptionsSizeLabelStyled';
import OptionStyled from './styled/OptionStyled';

function OptionsSize({ sizeChange, size }) {
  const handleChange = (event) => {
    sizeChange(event.target.value);
  };

  return (
    <OptionsSizeContainerStyled>
      <OptionsSizeLabelStyled>Maximal Size</OptionsSizeLabelStyled>
      <SelectStyled onChange={handleChange}>
        <OptionStyled value="480" selected={size === '480'}>480p</OptionStyled>
        <OptionStyled value="720" selected={size === '720'}>720p</OptionStyled>
        <OptionStyled value="1080" selected={size === '1080'}>1080p</OptionStyled>
        <OptionStyled value="original" selected={size === 'original'}>Original</OptionStyled>
      </SelectStyled>
    </OptionsSizeContainerStyled>
  );
}

OptionsSize.propTypes = {
  sizeChange: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

export default OptionsSize;
