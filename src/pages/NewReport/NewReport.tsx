import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewReport() {
  const navigate = useNavigate();

  // Campos do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [images, setImages] = useState<File[]>([]);

  // Para pré-visualização
  const previewImages = images.map((img) => URL.createObjectURL(img));

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Depois trocamos para envio real ao backend
    console.log({
      title,
      description,
      company,
      images,
    });

    // Volta ao feed após enviar
    navigate("/");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen p-4 max-w-xl mx-auto">

      {/* Top Bar */}
      <header className="sticky top-0 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-white/10">
        <Link to="/" className="text-black dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold text-black dark:text-white">Novo Relato</h1>
        <span className="w-6"></span>
      </header>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2 pb-24">

        {/* Título */}
        <div>
          <label className="block font-semibold mb-1 text-black dark:text-white">
            Título do Relato *
          </label>
          <input
            type="text"
            className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-black dark:text-white"
            placeholder="Ex: Golpe do falso atendente do Banco"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Empresa */}
        <div>
          <label className="block font-semibold mb-1 text-black dark:text-white">
            Empresa Relacionada (opcional)
          </label>
          <input
            type="text"
            className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-black dark:text-white"
            placeholder="Ex: Banco X, Loja Y..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block font-semibold mb-1 text-black dark:text-white">
            Descrição Detalhada *
          </label>
          <textarea
            className="w-full rounded-lg bg-white/10 border border-white/20 p-3 h-32 resize-none text-black dark:text-white"
            placeholder="Explique o que aconteceu, como o golpe funciona..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Upload de imagens */}
        <div>
          <label className="block font-semibold mb-2 text-black dark:text-white">
            Evidências Visuais (imagens)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="text-black dark:text-white"
          />

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="rounded-lg w-full aspect-video object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Botão enviar */}
        <button
          type="submit"
          className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">send</span>
          Enviar Relato
        </button>

      </form>
    </div>
  );
}
