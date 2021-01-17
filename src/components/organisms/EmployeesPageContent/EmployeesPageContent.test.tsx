import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import axios from 'axios';
import EmployeesPageContent from './EmployeesPageContent';
import { Provider } from 'react-redux';
import store from 'store/store';
import { theme } from 'styles/theme';
import { API_URL } from 'utils/config';

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  </Router>
);

jest.mock('axios');
jest.setTimeout(15000);
const mockedAxios = axios as jest.Mocked<typeof axios>
afterEach(() => jest.resetAllMocks());

describe('employees view', () => {
  it('renders spinner', () => {
    const { getByTestId } = render(
      <ProviderWrapper>
        <EmployeesPageContent />
      </ProviderWrapper>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
  });
  it('fetch and display employee', async () => {
    const mockedEmployees = [
      {
        companyId: '5f79a8e665bf093c1f418ee9',
        monthlyPrice: 0,
        pricePerHour: 18,
        _id: '5fd4a4f276ea0d72a10d8ef4',
        userId: {
          address: 'ul. Krakowska 29/3, 33-100',
          city: 'Tarnów',
          country: 'Polska',
          createdDate: '2020-10-08T17:15:33.953Z',
          dateOfBirth: '1998-08-05T22:00:00.000Z',
          email: 'michal.boruch@gmail.com',
          lastName: 'Boruch',
          name: 'Michał',
          phoneNumber: '793033331',
          _id: '5f7f496c7978b737e4890c39'
        }
      }
    ];

    mockedAxios.get.mockResolvedValue(mockedEmployees);

    const { getByText, getByTestId } = render(
      <ProviderWrapper>
        <EmployeesPageContent />
      </ProviderWrapper>
    );
    // const userBox = await waitForElement(() => getByText('Dodaj'));

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/employee/get-company-employees`)
    // expect(getByTestId('list')).toBeInTheDocument();
    // expect(userBox).toBeInTheDocument();
    // expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
