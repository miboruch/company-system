import React from 'react';
import { useAbility } from '@casl/react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import companyPermissions from 'guard/company.permission';
import { useFetch } from 'components/hooks';
import { updateCompanyPermissions } from 'guard/update/company-update.permission';
import { fetchPermission } from 'api/permission/api.permission';
import { routes } from 'routes/company.routes';
import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';

const CompanyRoutes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { path: routePath } = useRouteMatch();
  const ability = useAbility(CompanyPermissionsContext);

  useFetch(fetchPermission, {
    dependencies: [id],
    onSuccess: (permission) => updateCompanyPermissions(companyPermissions, permission)
  });

  const handlePreparePath = (path: string, routePath: string): string => `${path}${routePath}`;

  return (
    <Switch>
      {routes(ability)
        .filter((route) => route.isVisible)
        .map(({ path, component, exact }) => (
          <Route key={path} path={handlePreparePath(routePath, path)} component={component} exact={exact} />
        ))}
    </Switch>
  );
};

export default CompanyRoutes;
