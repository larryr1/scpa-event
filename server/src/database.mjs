import nedb from 'nedb';

export const UsersDatabase = new nedb({ filename: "users.nedb"});