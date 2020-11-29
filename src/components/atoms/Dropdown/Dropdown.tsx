import React from 'react';
import Downshift from 'downshift';
import { ClientInterface } from '../../../types/modelsTypes';
import { StyledLabel } from '../../../styles/shared';
import Input from '../Input/Input';
import { Menu, Item, Form } from '../../../styles/dropdownStyles';

interface Props {
  options: ClientInterface[];
  onChange: (selectedItem: string | null) => ClientInterface | void;
  labelText: string;
}

const Dropdown: React.FC<Props> = ({ onChange, options, labelText }) => {
  return (
    <Downshift onChange={onChange}>
      {({ getInputProps, getItemProps, getMenuProps, getLabelProps, getRootProps, isOpen, inputValue, highlightedIndex }) => (
        <Form {...getRootProps()}>
          <StyledLabel {...getLabelProps()}>{labelText}</StyledLabel>
          <div style={{ width: '100%' }} {...getRootProps()}>
            <Input {...getInputProps()} />
          </div>
          <Menu {...getMenuProps()} isOpen={isOpen}>
            {options
              .filter((item) => !inputValue || item.name.includes(inputValue))
              .map((item, index) => (
                <Item
                  key={index}
                  {...getItemProps({
                    key: item.name,
                    index,
                    item: item.name
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

export default Dropdown;
