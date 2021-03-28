import React from 'react';
import Downshift from 'downshift';

import { Input } from 'components';
import { ClientModel } from 'types';
import { StyledLabel } from 'styles/shared';
import { Menu, Item, Form } from 'styles/dropdownStyles';

interface Props {
  options: ClientModel[];
  onChange: (selectedItem: string | null) => ClientModel | void;
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
