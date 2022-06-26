import React, { FC } from 'react';
import CheckBox from '../../atoms/CheckBox';

type Props = {
  items: {
    id: string;
    label: string;
    checked: boolean;
    handleClick: () => void;
  }[];
};

const SelectList: FC<Props> = ({ items }) => (
  <div>
    {items.map((p) => (
      <CheckBox
        key={p.id}
        label={p.label}
        checked={p.checked}
        handleClick={p.handleClick}
      />
    ))}
  </div>
);

export default SelectList;
