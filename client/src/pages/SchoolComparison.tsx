/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Página de comparação lado a lado de escolas
 */

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { School } from "@/types";
import { Loader2, ArrowLeft, Plus, X } from "lucide-react";
import { formatNumber } from "@/lib/statsUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function SchoolComparison() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

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

  const handleAddSchool = () => {
    if (!selectedId) return;
    const school = schools.find((s) => s.id === selectedId);
    if (school && !selectedSchools.find((s) => s.id === selectedId)) {
      setSelectedSchools([...selectedSchools, school]);
      setSelectedId("");
    }
  };

  const handleRemoveSchool = (id: string) => {
    setSelectedSchools(selectedSchools.filter((s) => s.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando escolas...</p>
        </div>
      </div>
    );
  }

  const comparisonData =
    selectedSchools.length > 0
      ? [
          {
            competencia: "C1",
            ...Object.fromEntries(selectedSchools.map((s) => [s.nome, s.comp1])),
          },
          {
            competencia: "C2",
            ...Object.fromEntries(selectedSchools.map((s) => [s.nome, s.comp2])),
          },
          {
            competencia: "C3",
            ...Object.fromEntries(selectedSchools.map((s) => [s.nome, s.comp3])),
          },
          {
            competencia: "C4",
            ...Object.fromEntries(selectedSchools.map((s) => [s.nome, s.comp4])),
          },
          {
            competencia: "C5",
            ...Object.fromEntries(selectedSchools.map((s) => [s.nome, s.comp5])),
          },
        ]
      : [];

  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "#8B5CF6",
    "#EC4899",
  ];

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
            Comparação de Escolas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Compare o desempenho de até 5 escolas lado a lado. Analise as diferenças nas
            competências e identifique pontos fortes e fracos.
          </p>
        </div>

        {/* Seletor de Escolas */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Adicionar Escolas</h2>
          <div className="flex gap-3">
            <div className="flex-1">
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma escola..." />
                </SelectTrigger>
                <SelectContent>
                  {schools
                    .filter((s) => !selectedSchools.find((sel) => sel.id === s.id))
                    .map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.nome} - {school.cidade}/{school.uf}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddSchool}
              disabled={!selectedId || selectedSchools.length >= 5}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
          {selectedSchools.length >= 5 && (
            <p className="text-sm text-muted-foreground mt-2">
              Limite de 5 escolas atingido. Remova uma escola para adicionar outra.
            </p>
          )}
        </div>

        {/* Escolas Selecionadas */}
        {selectedSchools.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {selectedSchools.map((school, index) => (
                <div
                  key={school.id}
                  className="bg-card border border-border rounded-lg p-6 relative"
                >
                  <button
                    onClick={() => handleRemoveSchool(school.id)}
                    className="absolute top-3 right-3 p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <div
                    className="w-3 h-3 rounded-full mb-3"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <h3 className="font-semibold text-foreground mb-2">{school.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {school.cidade} - {school.uf}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ranking:</span>
                      <span className="font-semibold text-foreground">#{school.ranking}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Média Geral:</span>
                      <span className="font-bold text-data text-primary">
                        {formatNumber(school.media_geral)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Alunos:</span>
                      <span className="font-semibold text-foreground">{school.qtd_redacoes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico de Comparação */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-display text-foreground mb-6">
                Comparação por Competência
              </h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="competencia"
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
                    {selectedSchools.map((school, index) => (
                      <Bar
                        key={school.id}
                        dataKey={school.nome}
                        fill={colors[index]}
                        radius={[8, 8, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabela Comparativa */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm text-muted-foreground">
                        Métrica
                      </th>
                      {selectedSchools.map((school) => (
                        <th
                          key={school.id}
                          className="text-center p-4 font-semibold text-sm text-muted-foreground"
                        >
                          {school.nome}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">Média Geral</td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center">
                          <span className="text-lg font-bold text-data text-foreground">
                            {formatNumber(school.media_geral)}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">C1 - Domínio da Norma</td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center text-data">
                          {school.comp1}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">
                        C2 - Compreensão do Tema
                      </td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center text-data">
                          {school.comp2}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">C3 - Argumentação</td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center text-data">
                          {school.comp3}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">C4 - Coesão</td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center text-data">
                          {school.comp4}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">
                        C5 - Proposta de Intervenção
                      </td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center text-data">
                          {school.comp5}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">Alunos Avaliados</td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center text-data">
                          {school.qtd_redacoes}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-foreground">Ranking Nacional</td>
                      {selectedSchools.map((school) => (
                        <td key={school.id} className="p-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 rounded bg-primary/10 text-primary font-medium text-sm">
                            #{school.ranking}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {selectedSchools.length === 0 && (
          <div className="bg-muted/30 rounded-lg p-12 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhuma escola selecionada. Adicione escolas acima para começar a comparação.
            </p>
          </div>
        )}
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
