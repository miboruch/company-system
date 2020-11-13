import React from 'react';
import styled from 'styled-components';
import Downshift from 'downshift';
import { ClientInterface } from '../../../types/modelsTypes';
import { StyledLabel } from '../../../styles/shared';
import Input from '../Input/Input';

interface Props {
  options: ClientInterface[];
  onChange: (selectedItem: string | null) => void;
  labelText: string;
}

interface IDropdownProps {
  onChange?: (selectedItem: string) => void; // this is for later
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

// const Input = styled.input`
//   width: 100%;
//   border: 1px solid black;
// `;

interface MenuProps {
  isOpen: boolean;
}

const Menu = styled.ul<MenuProps>`
  width: 100%;
  padding: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  z-index: 10;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.4s ease, visibility 0.4s ease;
`;

interface ItemInterface {
  isActive: boolean;
}

const Item = styled.li<ItemInterface>`
  list-style-type: none;
  height: 50px;
  padding: 1rem;
  width: 100%;
  transition: background-color 0.4s ease;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.backgroundHover : theme.colors.white)};
  display: flex;
  align-items: center;
`;

const Dropdown: React.FC<Props> = ({ onChange, options, labelText }) => {
  return (
    <Downshift onChange={onChange} itemToString={(item) => (item ? item : '')}>
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
                  {...getItemProps({
                    key: item._id,
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
