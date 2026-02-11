//import { useState } from 'react'
import AppRouter from "./router/AppRouter";
//import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// NOTE Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
