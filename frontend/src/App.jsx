import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoader from './public/components/GlobalLoader';

function App() {

  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <GlobalLoader/>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </QueryClientProvider>

  )
}

export default App
