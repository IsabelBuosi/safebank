import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewReport() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [images, setImages] = useState<File[]>([]);

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

    console.log({ title, description, company, images });

    navigate("/");
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen max-w-xl mx-auto">

      <header className="sticky top-0 flex items-center justify-between px-4 py-3 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-white/10 z-50">
        <Link to="/" className="text-primary-dark dark:text-primary-light">
          <span className="material-symbols-outlined text-3xl">⭠</span>
        </Link>
        <h1 className="text-lg font-bold text-primary-dark dark:text-primary-light">
          Novo Relato
        </h1>
        <span className="w-6"></span>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 pb-24">

        <div>
          <label className="block font-semibold mb-1 text-primary-dark dark:text-primary-light">
            Título do Relato *
          </label>
          <input
            type="text"
            className="w-full rounded-xl bg-surface-light dark:bg-surface-dark border border-primary/30 p-3 text-black dark:text-white"
            placeholder="Ex: Golpe do falso atendente do banco"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-primary-dark dark:text-primary-light">
            Empresa Relacionada (opcional)
          </label>
          <input
            type="text"
            className="w-full rounded-xl bg-surface-light dark:bg-surface-dark border border-primary/30 p-3 text-black dark:text-white"
            placeholder="Ex: Banco X, Loja Y..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-primary-dark dark:text-primary-light">
            Descrição Detalhada *
          </label>
          <textarea
            className="w-full h-32 resize-none rounded-xl bg-surface-light dark:bg-surface-dark border border-primary/30 p-3 text-black dark:text-white"
            placeholder="Explique o que aconteceu, como o golpe funciona..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-primary-dark dark:text-primary-light">
            Evidências Visuais
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="text-black dark:text-white"
          />

          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full aspect-video object-cover rounded-xl"
                />
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
            className="
              mt-4 py-3 rounded-xl w-full font-semibold text-white
              bg-gradient-to-r from-primary-500 to-accent-500
              shadow-glow hover:scale-[1.03] active:scale-95
              transition-transform disabled:opacity-50
            "
          >
          <span className="material-symbols-outlined text-2xl">send</span>
          Enviar Relato
        </button>

      </form>
    </div>
  );
}
