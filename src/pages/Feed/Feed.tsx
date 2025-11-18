import PostCard from "../../components/PostCard";
import { Link } from "react-router-dom";

export default function Feed() {
  const posts = [
    {
      id: 1,
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCKDLf1maC94nBRKKM-8vbl5rt0NMmICcseVSwRcq-L-62MeZ96i4lfx-uHc8ll8_wAMIDsVIkoTp6-l8r-N5nypSdeMoz-PdMLVhjVcemvB28hkRw7l96jvkWfOxfE-4I_hlmsXTL9cWrbDhQoz2rsLr9MeDIuCaxs5qrlZOTpd6qe76gGg8zeuL1SAx6BWUe6HdZLg0VuyOpCjbxJ3Ek4zsTgWuvZrSZXF-IzV_zJnBqqY-T01IArkX8yKw_4zvinllcQQww6NZQ",
      userName: "Usuário Anônimo",
      time: "2 horas atrás",
      title: "Golpe do Falso PIX Agendado",
      description:
        "Recebi uma mensagem dizendo que ganhei um prêmio e me pediram para fazer um PIX...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBHMO_mrN5lvU-IpHi-fkmpFX7Dvj4Z1CZ5AqSoOu45RyTqKAoRPb_MX6juREESYUmgB_OhxtG5xH4ny6ccxd1YhtpIqwSOj_Y7kSPxc-TnXNB5_oNALagBLxfJBl9SdHqOyuMZERsfBa7--AKp8YeaWENg02kRzleWggvGZb1xsOZz1sdCR8B6KDJEolZep1BmLSmzu11dkUK4Ost___Ow1TDoZnSjzZsu0dECaqEahr2ghOovDUWFE3jSzH_VqX5fJZCSbQH-Yhk",
      likes: 12,
      comments: 5,
      shares: 3,
    },
    {
      id: 2,
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDK7g7BDVQ7LW5ozgb-ynzc3Ed8_KuWTzJwna9VU6R5L9uzqMBMLbh2TdGdbcmc4nf_cZHcQ8wT5uuZFHY9CPpLcCwhlmlNtvG7QSWv6Wkl_KruqzZTnCec1_ZRtnex0uDGpELu75IRR-tj0SMEkQBlV_-PKIGMjmVmNG8gWTrBgpONcNXeLwHXRXYNmRG4s80LKZ85B2IyxqJR0oXjFXcGNasZoPq_ZePF_ho7pJNOymSLfKhprWqDYtTV_eGrKGbNxp6rLI9VK_Y",
      userName: "Maria S.",
      time: "5 horas atrás",
      title: "Golpe do Empréstimo Consignado",
      description:
        "Ligaram se passando pelo banco e ofereceram um empréstimo com juros baixos...",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9UtWoDKskVTK_Pe-EO2u6rYBQbsNQLhGKQbTif0VGuQaQNav_HyR8R7K9Wk-JwQ_Ip_Ccls1tfTWKuYdQX-qP0N-VO6rWZ5WGYZV1B25fCJv23kdewfI6vLiaJqo6yxAHJaIP6wOM1sfY6nV825hwoiWGvRNrXCjprnAoWoYO1hC0mJMJtKsYVasqT_fii8D1lGkD4VNxlp53mSXh47Y7h4STmWcbbjSnBJ-7VqMj-qouPpbmRqCuM9LzlTYu3XpuWCqM98ORMJk",
      likes: 34,
      comments: 12,
      shares: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">

      <div className="sticky top-16 px-4 py-5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b borderc-light dark:borderc-dark">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary-500">
              🔍︎
          </span>

          <input
            type="text"
            placeholder="Pesquisar por palavra chave..."
            className="w-full rounded-full border borderc-light dark:borderc-dark bg-surface-light dark:bg-surface-dark py-2 pl-10 pr-4 text-black dark:text-white focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <main className="flex flex-col gap-5 p-4 pb-24">
        {posts.map((p) => (
          <PostCard key={p.id} {...p} />
        ))}
      </main>

    </div>
  );
}
