import { Route, Routes } from "react-router-dom";
import ShortenurlPage from "./components/ShortenurlPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage";
import DashBoardLayout from "./components/DashBoard/DashBoardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

function AppRouter() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-blue-500 selection:text-white">
      <div>
        <NavBar />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f172a',
              color: '#ffffff',
              borderRadius: '14px',
              fontSize: '13px',
              fontWeight: 500,
              padding: '10px 16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/register"
              element={
                <PrivateRoute publicPage={true}>
                  <RegisterPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute publicPage={true}>
                  <LoginPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute publicPage={false}>
                  <DashBoardLayout />
                </PrivateRoute>
              }
            />
            <Route
              path="/error"
              element={<ErrorPage />}
            />
            <Route
              path="*"
              element={
                <ErrorPage message="We can't seem to find the page that you're looking for." />
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenurlPage />} />
    </Routes>
  );
};
