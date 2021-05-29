import { AbilityBuilder, Ability, AnyMongoAbility } from '@casl/ability';
import { PermissionModel } from 'types';

export const updateCompanyPermissions = (ability: AnyMongoAbility, permission: PermissionModel) => {
  const { can, cannot, rules } = new AbilityBuilder(Ability);
  const { roleId } = permission;

  if (roleId === 1) {
    can('manage', 'all');
  }
  if (roleId === 2) {
    can('edit', 'all');
    cannot('edit', 'Company');
    cannot('edit', 'Owners');
    can('read', 'all');
  }
  if (roleId === 3) {
    cannot('edit', 'all');
    can('read', 'all');
    cannot('read', 'Budget');
    cannot('add', 'all');
  }
  if (roleId === 4) {
    can('read', 'all');
    cannot('read', 'Budget');
    cannot('read', 'Client');
    cannot('edit', 'all');
    cannot('add', 'all');
  }
  if (roleId === 5) {
    can('read', 'own');
    can('read', 'Task');
    can('read', 'Company');
    cannot('read', 'all');
    cannot('edit', 'all');
    cannot('add', 'all');
  }

  ability.update(rules);
};
