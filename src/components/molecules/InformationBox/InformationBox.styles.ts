import styled, { css } from 'styled-components';

interface WrapperProps {
  areaName: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 48%;
  height: 120px;
  align-self: center;
  border-radius: 30px;
  border: 1px solid #E6E6E6;
  padding: 2rem;
  position: relative;

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

const TitleParagraph = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.descriptionGray};
  margin-left: 2rem;
`;

const Value = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-top: 2rem;
`;

export { Wrapper, RowWrapper, TitleParagraph, Value };
