export const USERS_ROLES = {
  admin: ["admin"],
  agency: ["admin", "agency"],
  talent: ["admin", "agency", "talent"],
  client: ["admin", "agency", "talent", "client"],
};

export class userRoles {
  static getUserRole(userRole: string, roleRequired: string) {
    return USERS_ROLES[roleRequired]?.includes(userRole) || false;
  }
}
