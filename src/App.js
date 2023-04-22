import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { OperationModal } from './components/OperationModal';

function App() {
  const [isBlackTheme, setIsBlackTheme] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [operationType, setOperationType] = React.useState('');
  const [operations, setOperations] = React.useState([]);
  const { palette } = createTheme();
  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          h1: {
            fontSize: 50,
            fontWeight: 400,
            lineHeight: '75px',
          },
          h2: {
            fontSize: 48,
            fontWeight: 500,
            lineHeight: '56px',
          },
          h3: {
            fontSize: 40,
            fontWeight: 400,
            lineHeight: '47px',
          },
          h4: {
            fontSize: 32,
            fontWeight: 400,
            lineHeight: '38px',
          },
          h5: {
            fontSize: 24,
            fontWeight: 400,
            lineHeight: '28px',
          },
          h6: {
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '21px',
          },
        },
        palette: {
          primary: {
            main: '#111',
          },
          headerColor: palette.augmentColor({
            color: {
              main: '#ffdd2d',
            },
          }),
          background: {
            default: isBlackTheme ? '#121212' : '#ededed',
          },
          mode: isBlackTheme ? 'dark' : 'light',
        },
      }),
    [isBlackTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Content
          operations={operations}
          setModalOpen={setModalOpen}
          setOperationType={setOperationType}
        />
        {modalOpen && (
          <OperationModal
            operationType={operationType}
            operations={operations}
            setOperations={setOperations}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
