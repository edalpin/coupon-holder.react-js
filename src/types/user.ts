// User related types and enums
export const Roles = {
  admin: 'admin',
  user: 'user',
} as const;

export type RolesType = keyof typeof Roles;

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: RolesType;
}
