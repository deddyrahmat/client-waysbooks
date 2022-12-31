import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Provider} from 'react-redux'
import { store } from 'store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer
        position="top-right"
        style={{
          margin: "auto",
          fontWeight: "bold",
          textAlign: "center",
        }}
      ></ToastContainer>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);