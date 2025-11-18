import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import ReportDetail from "./pages/ReportDetail/ReportDetail";
import NewReport from "./pages/NewReport/NewReport";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export default function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto w-full max-w-[480px] min-h-screen bg-background-light dark:bg-background-dark text-black dark:text-white relative">

        <header className="fixed top-0 left-0 right-0 mx-auto max-w-[480px] bg-surface-light dark:bg-surface-dark border-b borderc-light dark:borderc-dark shadow-soft z-50">
  <div className="flex items-center justify-between px-4 py-3">
    <Link to="/">
      <img 
        src="/logo.png" 
        alt="logo" 
        className="w-10 h-10 rounded-full object-cover"
      />
    </Link>

    <h1 className="text-xl font-bold tracking-tight text-primary-600 dark:text-primary-300">
      SafeBank
    </h1>

    <button
      onClick={() => {
        const html = document.documentElement;
        html.classList.toggle("dark");
        localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
      }}
      className="p-2 rounded-full hover:bg-primary/10 transition"
    >
      <span className="material-symbols-outlined text-3xl text-primary-600 dark:text-primary-300">
        ❂
      </span>
    </button>
  </div>
</header>

        <div className="pt-16 pb-20">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/relato/:id" element={<ReportDetail />} />
            <Route path="/novo-relato" element={<NewReport />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-surface-light dark:bg-surface-dark border-t borderc-light dark:borderc-dark shadow-soft z-50">
          <div className="flex justify-around py-3">
            <Link to="/" className="flex flex-col items-center">
              <span className="material-symbols-outlined text-3xl text-primary-500">
                🏠︎
              </span>
            </Link>

            <Link to="/novo-relato" className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary-500">
                𖤂
              </span>
            </Link>

            <Link to="/perfil" className="flex flex-col items-center">
              <span className="material-symbols-outlined text-3xl text-primary-500">
                𖨆
              </span>
            </Link>
          </div>
        </nav>

      </div>
    </BrowserRouter>
  );
}
