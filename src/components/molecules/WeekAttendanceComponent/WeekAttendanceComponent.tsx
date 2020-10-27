import React from 'react';
import styled from 'styled-components';
import {EmptyIcon, CheckedIcon, NotCheckedIcon} from '../../../styles/iconStyles';

const StyledWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 50px auto;
`;

const DateParagraph = styled.p`
  color: ${({theme}) => theme.colors.emptyText};
  font-size: 13px;
`;

interface Props{

}

const WeekAttendanceComponent: React.FC<Props> = () => {
 return (
  <StyledWrapper>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
    <DateParagraph>test</DateParagraph>
  </StyledWrapper>
 );
};

export default WeekAttendanceComponent;
