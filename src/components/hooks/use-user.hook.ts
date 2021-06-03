import { AppState, useAppDispatch } from 'store/store';
import { useSelector } from 'react-redux';
import { setUser } from 'ducks/user/user';
import { UserModel } from 'types';

interface HookReturnData {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

const useUser = (): HookReturnData => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.user);

  const setUserData = (data: UserModel | null) => {
    dispatch(setUser(data));
  };

  return {
    user,
    setUser: setUserData
  };
};

export default useUser;
