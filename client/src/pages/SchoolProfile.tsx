/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Página de perfil detalhado com gráficos e análise de competências
 */

import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { School } from "@/types";
import { Loader2, ArrowLeft, MapPin, Users, Award, TrendingUp } from "lucide-react";
import { formatNumber, getRankingBadge } from "@/lib/statsUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SchoolProfile() {
  const [, params] = useRoute("/escola/:id");
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/escolas.json")
      .then((res) => res.json())
      .then((data: School[]) => {
        const found = data.find((s) => s.id === params?.id);
        setSchool(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando perfil da escola...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Escola não encontrada</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Ranking
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const competenciasData = [
    { nome: "C1", valor: school.comp1, label: "Domínio da Norma" },
    { nome: "C2", valor: school.comp2, label: "Compreensão do Tema" },
    { nome: "C3", valor: school.comp3, label: "Argumentação" },
    { nome: "C4", valor: school.comp4, label: "Coesão" },
    { nome: "C5", valor: school.comp5, label: "Proposta de Intervenção" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Ranking
            </Button>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {school.ranking <= 3 && (
                  <span className="text-5xl">{getRankingBadge(school.ranking)}</span>
                )}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-display text-foreground">
                    {school.nome}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {school.cidade} - {school.uf}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    school.dependencia === "Privada"
                      ? "bg-accent/20 text-accent-foreground"
                      : "bg-secondary/20 text-secondary-foreground"
                  }`}
                >
                  {school.dependencia}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  #{school.ranking} no Ranking Nacional
                </span>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 text-center min-w-[200px]">
              <p className="text-sm text-muted-foreground mb-2">Média Geral</p>
              <p className="text-5xl font-bold text-data text-primary">
                {formatNumber(school.media_geral)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">pontos</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-secondary/10 text-secondary p-3 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alunos Avaliados</p>
                <p className="text-2xl font-bold text-data text-foreground">
                  {school.qtd_redacoes}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent/10 text-accent-foreground p-3 rounded-lg">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Posição Nacional</p>
                <p className="text-2xl font-bold text-data text-foreground">#{school.ranking}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">NSE (Índice Socioeconômico)</p>
                <p className="text-2xl font-bold text-data text-foreground">
                  {school.nse ? formatNumber(school.nse, 1) : "N/D"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Competências */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-display text-foreground mb-6">
            Desempenho por Competência
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competenciasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="nome"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  domain={[0, 1000]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Bar
                  dataKey="valor"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                  name="Pontuação"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detalhes das Competências */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {competenciasData.map((comp) => (
              <div key={comp.nome} className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{comp.label}</p>
                <p className="text-2xl font-bold text-data text-foreground">{comp.valor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Análise Contextual */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-display text-foreground mb-4">
            Análise Contextual
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              A escola <strong className="text-foreground">{school.nome}</strong> está posicionada
              no <strong className="text-foreground">#{school.ranking}</strong> lugar do ranking
              nacional, com uma média geral de{" "}
              <strong className="text-foreground">{formatNumber(school.media_geral)}</strong>{" "}
              pontos na redação do ENEM 2024.
            </p>
            <p className="mt-3">
              Com <strong className="text-foreground">{school.qtd_redacoes}</strong> alunos
              avaliados, a instituição demonstra {school.dependencia === "Privada" ? "um" : "uma"}{" "}
              desempenho consistente em todas as competências avaliadas, destacando-se
              especialmente em{" "}
              <strong className="text-foreground">
                {competenciasData.reduce((max, comp) =>
                  comp.valor > max.valor ? comp : max
                ).label}
              </strong>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Ranking ENEM Redação. Dados baseados nos microdados oficiais do INEP.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
