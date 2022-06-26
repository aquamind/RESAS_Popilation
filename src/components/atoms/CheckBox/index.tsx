import React, { FC } from 'react';
import shortid from 'shortid';

type Props = {
  label: string;
  checked: boolean;
  handleClick: () => void;
};

const CheckBox: FC<Props> = ({ label, checked, handleClick }) => {
  const id = shortid.generate();

  return (
    <>
      <input
        type="checkbox"
        id={id}
        defaultChecked={checked}
        onClick={handleClick}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default CheckBox;
