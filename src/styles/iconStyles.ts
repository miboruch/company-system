import styled, { css } from 'styled-components';
import { ReactComponent as Checked } from '../assets/icons/checked.svg';
import { ReactComponent as NotChecked } from '../assets/icons/not-checked.svg';
import { ReactComponent as Empty } from '../assets/icons/empty.svg';

const iconStyles = css`
  width: 32px;
  height: 32px;
  margin-right: 2rem;
  border-radius: 50%;
`;

const CheckedIcon = styled(Checked)`
  ${iconStyles}
`;

const NotCheckedIcon = styled(NotChecked)`
  ${iconStyles}
`;

const EmptyIcon = styled(Empty)`
  ${iconStyles}
`;

export { CheckedIcon, NotCheckedIcon, EmptyIcon };
