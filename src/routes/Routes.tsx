import React from 'react';
import { useAbility } from '@casl/react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'routes/company.routes';

import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';

const Routes: React.FC = () => {
  const ability = useAbility(CompanyPermissionsContext);

  return (
    <Switch>
      {routes(ability)
        .filter((route) => route.isVisible)
        .map((route) => (
          <Route key={route.path} {...route} />
        ))}
    </Switch>
  );
};

export default Routes;
