db = db.getSiblingDB('temporal-api')


db.createUser({
    user: 'appUser',
    pwd: 'appPassword',
    roles: [
      {
        role: 'dbOwner',
      db: 'temporal-api',
    },
  ],
});