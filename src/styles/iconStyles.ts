import styled, { css } from 'styled-components';
import { ReactComponent as Checked } from '../assets/icons/checked.svg';
import { ReactComponent as NotChecked } from '../assets/icons/not-checked.svg';
import { ReactComponent as Empty } from '../assets/icons/empty.svg';
import { ReactComponent as Delete } from '../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../assets/icons/edit.svg';

const iconStyles = css`
  width: 32px;
  height: 32px;
  margin-right: 2rem;
  border-radius: 50%;
`;

const contentIconStyles = css`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colors.textGray};
  cursor: pointer;
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

const DeleteIcon = styled(Delete)`
  ${contentIconStyles};
  margin-left: 2rem;
`;

const EditIcon = styled(Edit)`
  ${contentIconStyles}
`;

export { CheckedIcon, NotCheckedIcon, EmptyIcon, DeleteIcon, EditIcon };
