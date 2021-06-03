import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';

import RegistrationLinkController from 'pages/Register/components/RegisterUser/RegistrationLinkController';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import { useCall } from 'components/hooks';
import { verifyRegistrationToken } from 'api';
import { Spinner, notifications } from 'components';

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
  const { token } = useParams<{ token: string }>();

  const [response, setResponse] = useState<RegistrationVerifyTokenResponse | null>(null);

  const { submit: verifyToken, onCallSuccess, onCallError, isSubmitting } = useCall(verifyRegistrationToken);
  onCallSuccess((payload) => setResponse(payload));
  onCallError(() => notifications.error('Niepoprawny token'));

  useEffect(() => {
    (async () => {
      await verifyToken({ token });
    })();
  }, [match.params]);

  return (
    <LoginTemplate page={TemplatePage.Register} companyName={response?.companyName}>
      {isSubmitting && <Spinner />}
      {!isSubmitting && !!response && <RegistrationLinkController response={response} token={match.params.token} />}
    </LoginTemplate>
  );
};

export default RegisterFromLink;
