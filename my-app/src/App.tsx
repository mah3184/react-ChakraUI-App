import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import orgtheme from './theme/orgtheme';
import { Router } from './router/Router';

function App() {
  return (
    <ChakraProvider theme={orgtheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
