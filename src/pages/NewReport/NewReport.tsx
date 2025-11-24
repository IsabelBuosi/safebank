import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewReport() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const previewImages = images.map((img) => URL.createObjectURL(img));

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Título e descrição são obrigatórios!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado!");
      navigate("/login");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    if (company.trim()) formData.append("company", company.trim());

    images.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:8080/reports/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // NÃO coloca Content-Type aqui! O navegador faz automaticamente com o boundary
        },
        body: formData,
      });

      if (response.ok) {
        alert("Relato criado com sucesso!");
        navigate("/");
      } else {
        const errorText = await response.text();
        alert("Erro ao enviar relato: " + errorText);
      }
    } catch (err) {
      console.error("Erro ao enviar:", err);
      alert("Erro de conexão. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <header className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-200 dark:border-purple-700 z-50">
        <Link to="/" className="text-purple-700 dark:text-purple-300">
          <span className="material-symbols-outlined text-3xl">⭠</span>
        </Link>
        <h1 className="text-lg font-bold text-purple-900 dark:text-white">
          Novo Relato
        </h1>
        <span className="w-8"></span>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 max-w-xl mx-auto pb-32">
        {/* Título */}
        <div>
          <label className="block font-bold mb-2 text-purple-900 dark:text-purple-200">
            Título do Relato *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-800 px-4 py-3 text-black dark:text-white focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600 outline-none"
            placeholder="Ex: Golpe do falso atendente do banco"
            required
            disabled={loading}
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block font-bold mb-2 text-purple-900 dark:text-purple-200">
            Descrição Detalhada *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 resize-none rounded-xl border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-800 px-4 py-3 text-black dark:text-white focus:ring-4 focus:ring-purple-300 outline-none"
            placeholder="Conte tudo que aconteceu, passo a passo..."
            required
            disabled={loading}
          />
        </div>

        {/* Imagens */}
        <div>
          <label className="block font-bold mb-2 text-purple-900 dark:text-purple-200">
            Evidências Visuais (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-purple-600 file:to-blue-600 file:text-white hover:file:from-purple-700 hover:file:to-blue-700 cursor-pointer"
            disabled={loading}
          />
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-full aspect-square object-cover rounded-xl shadow-lg border-2 border-purple-200 dark:border-purple-700"
                />
              ))}
            </div>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 py-4 rounded-xl font-bold text-white text-lg shadow-xl transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Enviando relato..." : "Enviar Relato"}
        </button>
      </form>
    </div>
  );
}