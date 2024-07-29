import nedb from '@seald-io/nedb';

export const UsersDatabase = new nedb({ filename: "users.db", autoload: true });
export const SettingsDatabase = new nedb({ filename: "settings.db", autoload: true });