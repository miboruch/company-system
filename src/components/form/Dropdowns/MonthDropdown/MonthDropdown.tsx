import React from 'react';
import Downshift from 'downshift';

import { Input } from 'components/index';
import { MonthInterface } from 'utils/staticData';
import { StyledLabel } from 'styles/shared';
import { Form, Menu, Item } from 'styles/dropdownStyles';

interface Props {
  options: MonthInterface[];
  onChange: (month: MonthInterface | null) => MonthInterface | void;
  labelText: string;
}

const MonthDropdown: React.FC<Props> = ({ options, onChange, labelText }) => {
  return (
    <Downshift onChange={onChange} itemToString={(item) => (item ? item.name : '')}>
      {({ getInputProps, getItemProps, getMenuProps, getLabelProps, isOpen, getRootProps, inputValue, highlightedIndex }) => (
        <Form {...getRootProps()}>
          <StyledLabel {...getLabelProps()}>{labelText}</StyledLabel>
          <div style={{ width: '100%' }} {...getRootProps()}>
            <Input {...getInputProps()} />
          </div>
          <Menu {...getMenuProps()} isOpen={isOpen} style={{ height: '300px', overflowY: 'scroll' }}>
            {options
              .filter((month) => inputValue && month.name.includes(inputValue))
              .map((item, index) => (
                <Item
                  key={item.index}
                  {...getItemProps({
                    key: index,
                    index,
                    item
                  })}
                  isActive={index === highlightedIndex}
                >
                  {item.name}
                </Item>
              ))}
          </Menu>
        </Form>
      )}
    </Downshift>
  );
};

export default MonthDropdown;
