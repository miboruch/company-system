import React, { useContext, useEffect, useState } from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';

import { Input } from 'components';
import { EmployeeModel } from 'types';
import { TaskDataContext } from 'pages/Task/components/AddTask/context/TaskDataContext';

import { Menu, Item, Form } from 'styles/dropdownStyles';
import { Paragraph, StyledLabel } from 'styles';
import { StyledFlexWrapper, UserBox } from './MultipleDropdown.styles';

const changeHandler = (
  selectedItems: EmployeeModel[],
  setSelectedItems: React.Dispatch<React.SetStateAction<EmployeeModel[]>>,
  onSelectionItemsChange: (selectedItems: EmployeeModel[]) => void
) => {
  return (selectedItem: EmployeeModel | null, stateAndHelpers: ControllerStateAndHelpers<EmployeeModel>) => {
    if (!selectedItem) return;
    const i = selectedItems.findIndex((item) => item._id === selectedItem._id);
    if (i === -1) setSelectedItems([...selectedItems, selectedItem]);
    onSelectionItemsChange([...selectedItems, selectedItem]);
    stateAndHelpers.clearSelection();
  };
};

const removeSelectedItemByIndex = (
  index: number,
  selectedItems: any,
  setSelectedItems: any,
  onSelectionItemsChange: any
) => () => {
  const temp = [...selectedItems];
  temp.splice(index, 1);
  setSelectedItems(temp);
  onSelectionItemsChange(temp);
};

interface Props {
  items: EmployeeModel[];
  labelText: string;
  onSelectionItemsChange: (selectedItems: EmployeeModel[]) => void;
}

const MultipleDropdown: React.FC<Props> = ({ items, labelText, onSelectionItemsChange, ...rest }) => {
  const { mainData } = useContext(TaskDataContext);
  const [selectedItems, setSelectedItems] = useState<EmployeeModel[]>([]);

  useEffect(() => {
    const result = items.filter((employee) => mainData?.employees.includes(employee._id));
    mainData?.employees ? setSelectedItems(result) : setSelectedItems([]);
  }, []);

  return (
    <Downshift {...rest} onChange={changeHandler(selectedItems, setSelectedItems, onSelectionItemsChange)}>
      {({
        getLabelProps,
        getInputProps,
        getRootProps,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
        clearSelection,
        highlightedIndex,
        isOpen,
        selectedItem,
        inputValue
      }) => {
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
                    <p onClick={removeSelectedItemByIndex(index, selectedItems, setSelectedItems, onSelectionItemsChange)}>X</p>
                  </UserBox>
                );
              })}
            </StyledFlexWrapper>
            <StyledLabel {...getLabelProps()}>{labelText}</StyledLabel>
            <Input {...getInputProps()} type='text' />
            <Menu {...getMenuProps()} isOpen={isOpen}>
              {items
                .filter(
                  (item) =>
                    !selectedItems.find(({ _id }) => _id === item._id) &&
                    inputValue &&
                    `${item.userId.name} ${item.userId.lastName}`.includes(inputValue)
                )
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
