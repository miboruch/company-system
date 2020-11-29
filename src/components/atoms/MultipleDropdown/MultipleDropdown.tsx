import React, { useContext, useEffect, useState } from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { Menu, Item, Form } from '../../../styles/dropdownStyles';
import Input from '../Input/Input';
import { StyledLabel } from '../../../styles/shared';
import { Paragraph } from '../../../styles/typography/typography';
import { FlexWrapper } from '../../../styles/shared';
import styled from 'styled-components';
import { TaskDataContext } from '../../compound/AddTask/context/TaskDataContext';

const StyledFlexWrapper = styled(FlexWrapper)`
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserBox = styled.div`
  border: 1px solid #aaa;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
`;

const changeHandler = (
  selectedItems: EmployeeDataInterface[],
  setSelectedItems: React.Dispatch<React.SetStateAction<EmployeeDataInterface[]>>,
  onSelectionItemsChange: (selectedItems: EmployeeDataInterface[]) => void
) => {
  return (selectedItem: EmployeeDataInterface | null, stateAndHelpers: ControllerStateAndHelpers<EmployeeDataInterface>) => {
    if (!selectedItem) return;
    const i = selectedItems.findIndex((item) => item._id === selectedItem._id);
    if (i === -1) setSelectedItems([...selectedItems, selectedItem]);
    onSelectionItemsChange([...selectedItems, selectedItem]);
    stateAndHelpers.clearSelection();
  };
};

function removeSelectedItemByIndex(index: number, selectedItems: any, setSelectedItems: any, onSelectionItemsChange: any) {
  const temp = [...selectedItems];
  temp.splice(index, 1);
  setSelectedItems(temp);
  onSelectionItemsChange(temp);
}

interface Props {
  items: EmployeeDataInterface[];
  labelText: string;
  onSelectionItemsChange: (selectedItems: EmployeeDataInterface[]) => void;
}

const MultipleDropdown: React.FC<Props> = ({ items, labelText, onSelectionItemsChange, ...rest }) => {
  const { data } = useContext(TaskDataContext);
  const [selectedItems, setSelectedItems] = useState<EmployeeDataInterface[]>([]);

  useEffect(() => {
    const result = items.filter((employee) => data.selectedEmployees?.includes(employee._id));
    data.selectedEmployees ? setSelectedItems(result) : setSelectedItems([]);
  }, []);

  return (
    <Downshift {...rest} onChange={changeHandler(selectedItems, setSelectedItems, onSelectionItemsChange)}>
      {({ getLabelProps, getInputProps, getRootProps, getMenuProps, getItemProps, getToggleButtonProps, clearSelection, highlightedIndex, isOpen, selectedItem, inputValue }) => {
        return (
          <Form {...getRootProps()}>
            <StyledFlexWrapper>
              <Paragraph style={{ marginBottom: 0 }} type={'text'}>
                Pracownicy:
              </Paragraph>
              {selectedItems.map((value, index) => {
                return (
                  <UserBox key={value._id}>
                    <Paragraph type={'text'} style={{ marginRight: '2rem', marginBottom: 0 }}>
                      {value.userId.name} {value.userId.lastName}
                    </Paragraph>
                    <p onClick={() => removeSelectedItemByIndex(index, selectedItems, setSelectedItems, onSelectionItemsChange)}>X</p>
                  </UserBox>
                );
              })}
            </StyledFlexWrapper>
            <StyledLabel {...getLabelProps()}>{labelText}</StyledLabel>
            <Input {...getInputProps()} type='text' />
            {/*{selectedItem || selectedItems.length > 0 ? (*/}
            {/*  <Paragraph*/}
            {/*    onClick={() => {*/}
            {/*      setSelectedItems([]);*/}
            {/*      clearSelection();*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Wyczyść*/}
            {/*  </Paragraph>*/}
            {/*) : null}*/}

            <Menu {...getMenuProps()} isOpen={isOpen}>
              {items
                .filter((item) => !selectedItems.find(({ _id }) => _id === item._id) && inputValue && `${item.userId.name} ${item.userId.lastName}`.includes(inputValue))
                .map((item, index) => {
                  return (
                    <Item
                      key={index}
                      {...getItemProps({
                        item,
                        key: item._id
                      })}
                      isActive={index === highlightedIndex}
                    >
                      {item.userId.name} {item.userId.lastName}
                    </Item>
                  );
                })}
            </Menu>
          </Form>
        );
      }}
    </Downshift>
  );
};

export default MultipleDropdown;
