import { combineReducers } from 'redux';
import companies from './companies/companies';
import companyOwners from './company-owners/company-owners';
import companyToggle from './company-toggle/company-toggle';
import currentCompany from './current-company/current-company';

export const company = combineReducers({ companies, companyOwners, companyToggle, currentCompany });
