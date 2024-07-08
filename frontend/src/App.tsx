import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { QueryResult, useQuery } from "@apollo/client";
import GET_USER from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
export default function App() {
  const { loading, data }: QueryResult | undefined = useQuery(GET_USER);
  if (loading) return null;
  let authUser = data?.authUser;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
