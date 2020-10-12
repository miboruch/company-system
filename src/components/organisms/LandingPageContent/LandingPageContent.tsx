import React, { useState } from 'react';
import { connect } from 'react-redux';
import Input from '../../atoms/Input/Input';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, Title, List, Header, Test } from './LandingPageContent.styles';
import Button from '../../atoms/Button/Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/appActionTypes';
import { bindActionCreators } from 'redux';
import { userLogout } from '../../../actions/authenticationActions';
import { AppState } from '../../../reducers/rootReducer';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const LandingPageContent: React.FC<ConnectedProps> = ({ refreshToken, userLogout }) => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <GridWrapper>
      <Title>LandingPageContent</Title>
      <List>
        <p>eqwe</p>
      </List>
      {refreshToken && <Button type={'button'} text={'Wyloguj'} onClick={() => userLogout(refreshToken)} />}
      <Header />
      <Test>wdqwdqw</Test>
      <Content>
        <Input onChange={handleChange} name={'name'} labelText={'Imię'} type={'string'} value={text} required={true} />
      </Content>
    </GridWrapper>
  );
};

interface LinkStateProps {
  refreshToken: string | null;
}

interface LinkDispatchProps {
  userLogout: (refreshToken: string) => void;
}

const mapStateToProps = ({ authenticationReducer: { refreshToken } }: AppState): LinkStateProps => {
  return { refreshToken };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContent);
