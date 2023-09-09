import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Auth,
  Home,
  Profile,
  Search,
  Setting,
  SinglePost,
  UploadBlog,
} from "./pages";
import { NavBar, ProtectedRoute, AuthRoute, Loading } from "./components";
import { useEffect } from "react";
import { fetchBlogPosts } from "./store/reducres/blogReducer";
import { useDispatch, useSelector } from "react-redux";
export const url = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();
  const { successMessage } = useSelector((state) => state.blogPosts);
  useEffect(() => {
    dispatch(fetchBlogPosts(url));
  }, [successMessage]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full overflow-hidden">
              <NavBar />
              <Home />
            </div>
          }
        />
        <Route
          path="/blogPost"
          element={
            <div className="w-full min-h-[93vh] overflow-hidden">
              <NavBar />
              <Suspense fallback={<Loading />}>
                <SinglePost />
              </Suspense>
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="w-full min-h-[93vh] overflow-hidden">
              <NavBar />
              <Suspense fallback={<Loading />}>
                <Search />
              </Suspense>
            </div>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute setting>
              <Suspense fallback={<Loading />}>
                <Setting />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadBlog"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <UploadBlog />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
