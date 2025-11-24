// src/lib/api.ts
const API_URL = "http://localhost:8080";

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login falhou");
    const token = await res.text();
    localStorage.setItem("token", token);
    return token;
  },

  async getHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  },

  async getUser() {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error("Não autenticado");
    return res.json();
  },

  async getReports() {
    const res = await fetch(`${API_URL}/reports`, {
      headers: await this.getHeaders(),
    });
    return res.json();
  },

  async createReport(formData: FormData) {
    const res = await fetch(`${API_URL}/reports/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Erro ao criar relatório");
    return res.json();
  },

  async toggleLike(reportId: number): Promise<{ totalLikes: number; liked: boolean }> {
    const res = await fetch(`${API_URL}/likes/report/${reportId}`, {  // MUDEI AQUI
      method: "POST",
      headers: await this.getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Falha ao curtir o relato");
    }
    return res.json(); 
  },

  async getComments(reportId: number) {
    const res = await fetch(`${API_URL}/comments/report/${reportId}`, {
      headers: await this.getHeaders(),
    });
    return res.json();
  },

  async createComment(reportId: number, text: string) {
    const res = await fetch(`${API_URL}/comments/report/${reportId}`, {
      method: "POST",
      headers: await this.getHeaders(),
      body: JSON.stringify({ text }),
    });
    return res.json();
  },
};