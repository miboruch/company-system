import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, AppState } from 'store/store';
import { currencyTypes, getCurrencyValue } from 'ducks/currency/currency-creators';
import { appCurrencies } from 'utils/config';

import { Heading } from 'styles';
import { CurrencyBox, InfoBoxWrapper } from '../../Finances.styles';

const Currency: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currency } = useSelector((state: AppState) => state.currency);

  const prepareCurrencyValue = (currencyName: currencyTypes) => () => dispatch(getCurrencyValue(currencyName));

  return (
    <InfoBoxWrapper noPadding={true}>
      {appCurrencies.map((currencyName) => (
        <CurrencyBox key={currencyName} isActive={currencyName === currency.name} onClick={prepareCurrencyValue(currencyName)}>
          <Heading>{currencyName}</Heading>
        </CurrencyBox>
      ))}
    </InfoBoxWrapper>
  );
};

export default Currency;
