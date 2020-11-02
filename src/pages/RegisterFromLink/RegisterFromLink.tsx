import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import RegistrationLinkController from '../../components/compound/RegisterUser/RegistrationLinkController';
import Spinner from '../../components/atoms/Spinner/Spinner';

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

type RegistrationVerifyTokenResponse = RegistrationTokenHourPrice | RegistrationTokenMonthlyPrice;

interface Props {}

const RegisterFromLink: React.FC<Props & RouteComponentProps> = ({ match }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<RegistrationVerifyTokenResponse | null>(null);
  console.log(match.params);
  return <LoginTemplate page={TemplatePage.Register}>{isLoading ? <Spinner /> : <RegistrationLinkController />}</LoginTemplate>;
};

export default RegisterFromLink;
