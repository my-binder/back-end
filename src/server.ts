import app from './app';

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'production';
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}, ${ENV} environment.`);
});