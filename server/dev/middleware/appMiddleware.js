export default (app, express) => {
  app.use(express.json());
  app.use(express.static('public'));
};


