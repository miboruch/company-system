import React from 'react';
import { Switch, useParams, useRouteMatch } from 'react-router-dom';

import AdminRoute from 'hoc/AdminRoute';
import UserRoute from 'hoc/UserRoute';
import { UserRole } from 'ducks/auth/roles/roles';
import { useSelector } from 'react-redux';
import { AppState } from 'store/store';
import { adminRoutes, userRoutes } from 'routes/company.routes';

const CompanyRoutes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { path: routePath } = useRouteMatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  /*
    useFetch<typeof fetchProjectUserPermission>(fetchProjectUserPermission(id), {
    dependencies: [id],
    onSuccess: (user) => updateProjectPermissions(projectPermissions, user)
  });
   */

  const handlePreparePath = (path: string, routePath: string): string => `${path}${routePath}`;
  // const isAdmin = role === UserRole.Admin;
  const isAdmin = true;

  return (
    <Switch>
      {isAdmin
        ? adminRoutes.map(({ path, component, exact }) => (
            <AdminRoute key={path} path={handlePreparePath(routePath, path)} exact={exact} component={component} />
          ))
        : userRoutes.map(({ path, component, exact }) => (
            <UserRoute key={path} path={handlePreparePath(routePath, path)} exact={exact} component={component} />
          ))}
    </Switch>
  );
};

export default CompanyRoutes;
