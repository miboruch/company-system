import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as User } from '../../../assets/icons/user.svg';
import { ReactComponent as Task } from '../../../assets/icons/list.svg';

const iconStyles = css`
  width: 20px;
  height: 20px;
  margin-right: 2rem;

  path {
    fill: ${({ theme }) => theme.colors.dark};
  }
`;

interface WrapperProps {
  areaName: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 46%;
  //height: 100%;
  height: 120px;
  align-self: center;
  border-radius: 30px;
  border: 1px solid #E6E6E6;
  padding: 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    grid-area: '${({ areaName }) => areaName}';
    background-color: ${({ theme }) => theme.colors.menuBackground};
    border:none;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserIcon = styled(User)`
  ${iconStyles};
`;

const TaskIcon = styled(Task)`
  ${iconStyles};
`;

const TitleParagraph = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.descriptionGray};
`;

const Value = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-top: 2rem;
`;

interface Props {
  title: string;
  value: string | number;
  areaName: string;
}

const InformationBox: React.FC<Props> = ({ title, value, areaName }) => {
  return (
    <Wrapper areaName={areaName}>
      <RowWrapper>
        <UserIcon />
        <TitleParagraph>{title}</TitleParagraph>
      </RowWrapper>
      <Value>{value}</Value>
    </Wrapper>
  );
};

export default InformationBox;
