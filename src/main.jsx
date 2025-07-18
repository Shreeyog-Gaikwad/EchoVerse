import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from './pages/SignUp'
import AllBlogs from "./pages/AllBlogs"
import AddBlog from "./pages/AddBlog"
import EditBlog from "./pages/EditBlog"
import Blog from "./pages/Blog"
import { AuthLayout } from "./components/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/all-blogs",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllBlogs />
          </AuthLayout>
        ),
      },
      {
        path: "/add-blog",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-blog/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/blog/:slug",
        element: <Blog />,
      },
    ],
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
