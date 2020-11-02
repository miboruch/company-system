import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import RegistrationLinkController from '../../components/compound/RegisterUser/RegistrationLinkController';
import Spinner from '../../components/atoms/Spinner/Spinner';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { validateRegistrationToken } from '../../actions/authenticationActions';

interface RegistrationTokenResponse {
  companyId: string;
  companyName: string;
  email: string;
  iat: number;
  exp: number;
}

interface RegistrationTokenHourPrice extends RegistrationTokenResponse {
  pricePerHour: number;
  monthlyPrice?: never;
}

interface RegistrationTokenMonthlyPrice extends RegistrationTokenResponse {
  pricePerHour?: never;
  monthlyPrice: number;
}

export type RegistrationVerifyTokenResponse = RegistrationTokenHourPrice | RegistrationTokenMonthlyPrice;

interface Props {}

interface MatchProps {
  token: string;
}

type ConnectedProps = Props & LinkDispatchProps & RouteComponentProps<MatchProps>;

const RegisterFromLink: React.FC<ConnectedProps> = ({ match, validateRegistrationToken }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<RegistrationVerifyTokenResponse | null>(null);

  useEffect(() => {
    validateRegistrationToken(match.params.token, setLoading, setResponse);
  }, [match.params]);

  return (
    <LoginTemplate page={TemplatePage.Register} companyName={response?.companyName}>
      {isLoading ? <Spinner /> : !!response && <RegistrationLinkController response={response} token={match.params.token} />}
    </LoginTemplate>
  );
};

interface LinkDispatchProps {
  validateRegistrationToken: (token: string, setLoading: (isLoading: boolean) => void, setResponse: (response: RegistrationVerifyTokenResponse) => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    validateRegistrationToken: bindActionCreators(validateRegistrationToken, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(RegisterFromLink);
