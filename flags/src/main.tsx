import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './redux/store.ts';
import NavBar from './components/common/NavBar.tsx';
import Home from './components/common/Home.tsx';
import Score from './components/common/Score.tsx';
import Loading from './components/common/Spinner.tsx';
import NotFound from './components/common/NotFound.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'scores',
        element: <Score />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
