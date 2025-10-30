import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/pages/App.tsx'
import { LoginPage } from './components/pages/LoginPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { RegisterPage } from './components/pages/RegisterPage.tsx'
import { TaskRow } from './components/TaskRow.tsx'
import ErrorPage from './components/pages/ErrorPage.tsx'

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "register",
    element: <RegisterPage /> 
  }
]

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <TaskRow task={{id: 1, description: "Aller au terrain de foot"}}/>
//   </StrictMode>,
// )
