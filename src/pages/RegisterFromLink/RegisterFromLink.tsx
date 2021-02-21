import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import RegistrationLinkController from 'pages/Register/components/RegisterUser/RegistrationLinkController';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import { Spinner } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { validateRegistrationToken } from 'ducks/auth/link-registration/link-registration-creators';

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
  const { isValidateLoading } = useSelector((state: AppState) => state.auth.linkRegistration);

  const [response, setResponse] = useState<RegistrationVerifyTokenResponse | null>(null);

  useEffect(() => {
    dispatch(validateRegistrationToken({ token: match.params.token, setResponse }));
  }, [match.params]);

  return (
    <LoginTemplate page={TemplatePage.Register} companyName={response?.companyName}>
      {isValidateLoading ? (
        <Spinner />
      ) : (
        !!response && <RegistrationLinkController response={response} token={match.params.token} />
      )}
    </LoginTemplate>
  );
};

export default RegisterFromLink;
