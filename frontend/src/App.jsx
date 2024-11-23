import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Admin/Home/index';
import AppLayout from './Layout/AppLayout';
import Signin from './pages/Auth/Signin';
import AdminProtectedRoute from './routes/admin/AdminProtectedRoute';
import './app.css';
import UserProtectedRoute from './routes/user/UserProtectedRoute';
import UsersHome from './pages/Users/Home/index';
import AddPost from './pages/Posts/AddPost';
import MyPosts from './pages/Posts/MyPosts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={<Navigate to='/auth' />}
      />
      <Route
        element={
          <AdminProtectedRoute>
            <AppLayout />
          </AdminProtectedRoute>
        }
        path='/admin'
      >
        <Route
          index
          element={<Home />}
        />
      </Route>
      <Route
        element={
          <UserProtectedRoute>
            <AppLayout />
          </UserProtectedRoute>
        }
        path='/users'
      >
        <Route
          index
          element={<UsersHome />}
        />
        <Route
          path='posts/:post'
          element={<AddPost />}
        />
        <Route
          path='posts/:post/:postId'
          element={<AddPost />}
        />
        <Route
          path='my-posts'
          element={<MyPosts />}
        />
      </Route>
      <Route path='/auth'>
        <Route
          index
          element={<Signin />}
        />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
