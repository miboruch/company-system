import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import RegistrationLinkController from '../../components/compound/RegisterUser/RegistrationLinkController';
import Spinner from '../../components/atoms/Spinner/Spinner';
import { validateRegistrationToken } from '../../ducks/auth/link-registration/link-registration-creators';
import { AppState, useAppDispatch } from '../../store/store';

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

interface MatchProps {
  token: string;
}

type ConnectedProps = RouteComponentProps<MatchProps>;

const RegisterFromLink: React.FC<ConnectedProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { isValidateLoading, isValidateError } = useSelector((state: AppState) => state.auth.linkRegistration);

  const [response, setResponse] = useState<RegistrationVerifyTokenResponse | null>(null);

  useEffect(() => {
    dispatch(validateRegistrationToken({ token: match.params.token, setResponse }));
  }, [match.params]);

  return (
    <LoginTemplate page={TemplatePage.Register} companyName={response?.companyName}>
      {isValidateLoading ? <Spinner /> : !!response && <RegistrationLinkController response={response} token={match.params.token} />}
    </LoginTemplate>
  );
};

export default RegisterFromLink;
