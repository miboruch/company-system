import styled, { css } from 'styled-components';
import { ReactComponent as Checked } from '../assets/icons/checked.svg';
import { ReactComponent as NotChecked } from '../assets/icons/not-checked.svg';
import { ReactComponent as Empty } from '../assets/icons/empty.svg';
import { ReactComponent as Delete } from '../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../assets/icons/edit.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { ReactComponent as Task } from '../assets/icons/list.svg';
import { ReactComponent as Notification } from '../assets/icons/notification.svg';
import { ReactComponent as Logout } from '../assets/icons/logout.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import { ReactComponent as ShowPassword } from '../assets/icons/show.svg';
import { ReactComponent as Arrow } from '../assets/icons/arrow.svg';
import { ReactComponent as Location } from '../assets/icons/location.svg';

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

const SettingsIcon = styled(Settings)`
  ${iconStyles}
`;

const DeleteIcon = styled(Delete)`
  ${contentIconStyles};
  margin-left: 2rem;
`;

const EditIcon = styled(Edit)`
  ${contentIconStyles};
  margin-left: 2rem;
`;

const UserIcon = styled(User)`
  ${contentIconStyles};
`;

const TaskIcon = styled(Task)`
  ${contentIconStyles};
`;

const LocationIcon = styled(Location)`
  ${contentIconStyles};
  width: 25px;
  height: 25px;
`;

const headingStyles = css`
  width: 13px;
  height: 13px;
  fill: ${({ theme }) => theme.colors.textGray};
  cursor: pointer;
  margin-left: 2rem;
`;

const LogoutIcon = styled(Logout)`
  ${headingStyles}
`;

const NotificationIcon = styled(Notification)`
  width: 25px;
  height: 25px;
  fill: ${({ theme }) => theme.colors.textGray};
  cursor: pointer;
  position: relative;
`;

const ShowPasswordIcon = styled(ShowPassword)`
  width: 16px;
  height: 12px;
  position: absolute;
  top: 6px;
  right: 2rem;
  cursor: pointer;
`;

const ArrowIcon = styled(Arrow)`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

export { CheckedIcon, NotCheckedIcon, EmptyIcon, DeleteIcon, EditIcon, UserIcon, LocationIcon, TaskIcon, NotificationIcon, LogoutIcon, SettingsIcon, ShowPasswordIcon, ArrowIcon };
