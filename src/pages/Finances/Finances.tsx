import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { MenuTemplate } from 'components';
import { financesRoutes } from './config/finances.routes';

const Finances: React.FC = () => {
  const { path: routePath } = useRouteMatch();

  const handlePreparePath = (path: string, routePath: string): string => `${path}${routePath}`;

  return (
    <MenuTemplate>
      <Switch>
        {financesRoutes.map(({ path, component, exact }) => (
          <Route key={path} path={handlePreparePath(routePath, path)} component={component} exact={exact} />
        ))}
      </Switch>
    </MenuTemplate>
  );
};

export default Finances;
