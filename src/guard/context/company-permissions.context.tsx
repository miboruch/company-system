import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import companyPermissions from '../company.permission';

export const CompanyPermissionsContext = createContext(companyPermissions);
export const Can = createContextualCan(CompanyPermissionsContext.Consumer);
