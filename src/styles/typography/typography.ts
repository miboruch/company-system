import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 13px;
  color: #d3d3d4;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 1rem;
  line-height: 2.2;
  transition: color 0.3s ease;
`;

const SubParagraph = styled(Paragraph)`
  color: #78787f;
  margin: 0;
`;

const TextParagraph = styled(Paragraph)`
  color: #454545;
`;

const InfoParagraph = styled(Paragraph)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
  text-align: center;
`;

export { Paragraph, SubParagraph, TextParagraph, InfoParagraph };
