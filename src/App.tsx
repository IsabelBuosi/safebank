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
      {/* CONTAINER MOBILE */}
      <div className="mx-auto w-full max-w-[480px] min-h-screen bg-background-light dark:bg-background-dark relative">

        {/* HEADER FIXO - estilo Instagram */}
        <header className="fixed top-0 left-0 right-0 mx-auto max-w-[480px] bg-white dark:bg-black shadow-sm z-50">
          <div className="flex items-center justify-between px-4 py-3">
            
            {/* Logo esquerda */}
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>

            {/* Título */}
            <h1 className="text-xl font-bold text-black dark:text-white tracking-tight">
              SafeBank
            </h1>

            {/* Ícone notificações */}
            <button>
              <span className="material-symbols-outlined text-3xl text-black dark:text-white">
                notifications
              </span>
            </button>
          </div>
        </header>


        {/* CONTEÚDO COM MARGEM PARA O HEADER */}
        <div className="pt-16 pb-16">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/relato/:id" element={<ReportDetail />} />
            <Route path="/novo-relato" element={<NewReport />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </div>


        {/* BOTTOM NAVIGATION - estilo Instagram */}
        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 shadow-lg z-50">
          <div className="flex justify-around py-3">

            <Link to="/" className="flex flex-col items-center">
              <span className="material-symbols-outlined text-3xl text-primary">
                home
              </span>
            </Link>

            <Link to="/novo-relato" className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary">
                add_circle
              </span>
            </Link>

            <Link to="/perfil" className="flex flex-col items-center">
              <span className="material-symbols-outlined text-3xl text-primary">
                person
              </span>
            </Link>
            
          </div>
        </nav>

      </div>
    </BrowserRouter>
  );
}
