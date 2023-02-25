module.export = {
  name: 'error',
  execute(err) {
    console.log(`An error ocurred with the database connection:\n${err}`);
  },
};
