import { useParams, Link } from "react-router-dom";
import ImageCarousel from "../../components/ImageCarousel";
import Comment from "../../components/Comment";

export default function ReportDetail() {
  const { id } = useParams();

  // depois vamos buscar do backend
  const report = {
    id,
    title: "Golpe do Falso Suporte do Banco X",
    author: "@usuario123",
    date: "10/08/2024",
    tags: ["Pix", "WhatsApp", "Falso Empréstimo"],
    description:
      "Descrição detalhada de como o golpe funciona, passo a passo. Os criminosos entram em contato via WhatsApp se passando por funcionários do banco...",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhp9pmv0I9laNFaoCvc06F0toFKBLkhGpPpwUiysuirFWHxy1QjD-x87_m5cUrNVCnC_5n7Fb-GEghNq2kq6WsqVLUx7N5dNGLEY5ntjPJoatYHHx67zvqhOFDc5kclFv9x1CDhUySlRnDFvcsr8UdCRGqk3ITCxE0ZB6juf7-K8lAnUaHhOdU_doHVbprMP5rhDF5Kh1ykEu1QXfx_V4_-IXcyfbsN1OSZ06hCoy3UzQfrsnTdADD-Obsn6wz_7CQQm510HQxS8Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCrmZ4dKPFNTT0hKqRKnmhXg4FC8bZMTLJbWZksxnuAnUiUURMU8a3w8KnQlzxeJz4GJmeUh3HQHXF2gzPK_6Qh-2Q7v9ZUca1PTZK80jLbJivdvSGdAmSg6Nroz-eJCAPgShtpb4BvbTeupAEXsswJgzlQvps4Z4yZ9nERjyxZcBtuPzvQhlaOGDKDJXfzG7x_S2vowVwgzSu4WhQsc2zJk2cCO4O1IX_bP1K_qlq-iCWb8fc5gh_HZrpRPQau6JIac_pKYGSyII",
    ],
    comments: [
      {
        id: 1,
        user: "@maria_s",
        time: "2h atrás",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWUqgDoIpfBGhZiDzUvA4KJimHiVqXLdy76olbQTAWhr2hkw9Cwiuq2XOhAUSLn23nsYVhXdqldlE_dsE_eYtcRH45nDKQPRWdpGr4gLvAO1cdK4q6E6qj3-Rrog9oGq5x6GhzVG9KspUb9GvaOcl-ebhMhzWLnSgUggVXG28Bm9Ez30mZKSpHPjU9KoxQ8kXJ1lqBWRaO4lRMbXjtAFeu36yk-bX8yNx6M7CAGWMTpJvfzBzS1bxEbLK3LIKdFlXk9A3IVCzTJ_A",
        text: "Quase caí nesse! A abordagem é muito convincente.",
      },
      {
        id: 2,
        user: "@joao_p",
        time: "5h atrás",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBSyvODnx-oEnrKAAH5Qs1YfY24qHs3Z2PKKo_fcJvjSnl49V17lE9-e_uJ60-TgzsnLxc_tEptq0_J3Yj4AeMW-F_M9Zr7EHyR8Ktr8tjh70iGbyq0x7dDO3Bz4JnLuXn5CkdD2BMCfjUuHYF04Qt3me7XPOITkzL2zwYpW8zs1YYypwENTlmweCrhUkBs_Rp8gddvtbopdVHyqlEb1jwtRIHaJ2XrpPxbiXdla59cM85_xEF7Sm0DYrtPAqiJ69P-_m33AV7t2h8",
        text: "Obrigado por compartilhar. Muito útil!",
      },
    ],
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen p-4 max-w-xl mx-auto">
      {/* Top Bar */}
      <header className="sticky top-0 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-white/10">
        <Link to="/" className="text-black dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold text-black dark:text-white">Detalhes</h1>
        <button className="text-black dark:text-white">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      {/* Title */}
      <main className="flex flex-col gap-6 p-2 pb-24">
        <section>
          <h2 className="text-3xl font-bold text-black dark:text-white">
            {report.title}
          </h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Postado por {report.author} em {report.date}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {report.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 text-sm font-medium bg-primary/20 rounded-lg text-amber-800 dark:text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-4 text-black/80 dark:text-white/80 leading-relaxed">
            {report.description}
          </p>
        </section>

        {/* Images */}
        <section>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2">
            Evidências Visuais
          </h3>
          <ImageCarousel images={report.images} />
        </section>

        {/* Buttons */}
        <section className="flex gap-4 border-t border-white/10 pt-4">
          <button className="w-full h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">thumb_up</span>
            Achei útil
          </button>

          <button className="w-full h-12 bg-red-500/20 text-red-600 rounded-lg flex items-center justify-center gap-2 dark:text-red-400">
            <span className="material-symbols-outlined">flag</span>
            Reportar
          </button>
        </section>

        {/* Comments */}
        <section className="border-t border-white/10 pt-4">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">
            Comentários
          </h3>

          <div className="flex flex-col gap-4">
            {report.comments.map((c) => (
              <Comment key={c.id} comment={c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
