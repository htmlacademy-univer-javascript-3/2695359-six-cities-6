import MainPage from '../MainPage/MainPage';

type AppProps = {
  placesCount: number;
}

function App({ placesCount }: AppProps): JSX.Element {
  return (
    <MainPage placesCount={placesCount} />
  );
}

export default App;
