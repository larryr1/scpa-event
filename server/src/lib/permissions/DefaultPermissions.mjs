/**
 * Default permissions that are used in place of any unset permissions on users.
 */
export const defaultPermissions = {
  admin: false,
  editMessages: false,
  editEvents: false,
  editUsers: false,
  points: {
    manageEvents: false,
    scanEvents: false,
    managePoints: false
  }
}