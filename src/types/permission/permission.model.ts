export type PermissionId = 1 | 2 | 3 | 4 | 5;

/**
 * @permissionID
 * @id: 1 - admin
 * @id: 2 - editor
 * @id: 3 - viewer
 * @id: 4 - limited viewer
 * @id: 5 - own data viewer
 */

export interface PermissionModel {
  _id: string;
  companyId: string;
  userId: string;
  roleId: PermissionId
}
