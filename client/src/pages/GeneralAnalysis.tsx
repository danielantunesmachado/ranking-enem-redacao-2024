/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Página de análise geral com visualizações de dados agregados
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { School } from "@/types";
import { Loader2, ArrowLeft, TrendingUp, Award } from "lucide-react";
import { calculateAverages } from "@/lib/statsUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function GeneralAnalysis() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/escolas.json")
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando análise geral...</p>
        </div>
      </div>
    );
  }

  const averages = calculateAverages(schools);
  const publicSchools = schools.filter((s) => s.dependencia === "Publica");
  const privateSchools = schools.filter((s) => s.dependencia === "Privada");

  const publicAvg = calculateAverages(publicSchools);
  const privateAvg = calculateAverages(privateSchools);

  const comparisonData = [
    {
      categoria: "Escolas Públicas",
      media: publicAvg.media_geral,
      quantidade: publicSchools.length,
    },
    {
      categoria: "Escolas Privadas",
      media: privateAvg.media_geral,
      quantidade: privateSchools.length,
    },
  ];

  const distributionData = [
    { name: "Públicas", value: publicSchools.length, color: "hsl(var(--secondary))" },
    { name: "Privadas", value: privateSchools.length, color: "hsl(var(--accent))" },
  ];

  const competenciasData = [
    { nome: "C1", publica: publicAvg.comp1, privada: privateAvg.comp1 },
    { nome: "C2", publica: publicAvg.comp2, privada: privateAvg.comp2 },
    { nome: "C3", publica: publicAvg.comp3, privada: privateAvg.comp3 },
    { nome: "C4", publica: publicAvg.comp4, privada: privateAvg.comp4 },
    { nome: "C5", publica: publicAvg.comp5, privada: privateAvg.comp5 },
  ];

  const topPerformers = schools.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Ranking
            </Button>
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-display text-foreground mb-6">
            Análise Geral do ENEM 2024
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Visão panorâmica do desempenho das escolas brasileiras na redação do ENEM, com
            comparações entre redes pública e privada e análise por competências.
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média Nacional</p>
                <p className="text-3xl font-bold text-data text-foreground">
                  {averages.media_geral.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary/10 text-secondary p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média Escolas Públicas</p>
                <p className="text-3xl font-bold text-data text-foreground">
                  {publicAvg.media_geral.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/10 text-accent-foreground p-3 rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média Escolas Privadas</p>
                <p className="text-3xl font-bold text-data text-foreground">
                  {privateAvg.media_geral.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Comparação */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-display text-foreground mb-6">
            Comparação: Pública vs Privada
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Média Geral</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="categoria"
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
                    />
                    <Bar dataKey="media" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Distribuição de Escolas
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Análise por Competências */}
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
                />
                <Legend />
                <Bar
                  dataKey="publica"
                  fill="hsl(var(--secondary))"
                  radius={[8, 8, 0, 0]}
                  name="Pública"
                />
                <Bar
                  dataKey="privada"
                  fill="hsl(var(--accent))"
                  radius={[8, 8, 0, 0]}
                  name="Privada"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 10 */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-display text-foreground mb-6">
            Top 10 Escolas do Brasil
          </h2>
          <div className="space-y-4">
            {topPerformers.map((school, index) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-data text-muted-foreground w-8">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{school.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {school.cidade} - {school.uf}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-data text-primary">
                    {school.media_geral.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">{school.qtd_redacoes} alunos</p>
                </div>
              </div>
            ))}
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
