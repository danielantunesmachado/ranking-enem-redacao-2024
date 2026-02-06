/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Página principal com hero editorial e tabela de ranking interativa
 */

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import SchoolTable from "@/components/SchoolTable";
import StatsOverview from "@/components/StatsOverview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { School } from "@/types";
import { getUniqueValues } from "@/lib/statsUtils";

export default function Home() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUF, setSelectedUF] = useState("todos");
  const [selectedCidade, setSelectedCidade] = useState("todos");
  const [minStudents, setMinStudents] = useState("30");
  const [selectedSegment, setSelectedSegment] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "ranking",
    direction: "asc",
  });

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

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredSchools = useMemo(() => {
    let result = schools.filter((school) => {
      const matchesSearch = school.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUF = selectedUF === "todos" || school.uf === selectedUF;
      const matchesCidade = selectedCidade === "todos" || school.cidade === selectedCidade;
      const matchesMinStudents = school.qtd_redacoes >= parseInt(minStudents);
      const matchesSegment =
        selectedSegment === "todos" ||
        (selectedSegment === "publica" && school.dependencia === "Publica") ||
        (selectedSegment === "privada" && school.dependencia === "Privada");

      return matchesSearch && matchesUF && matchesCidade && matchesMinStudents && matchesSegment;
    });

    result.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof School];
      const bValue = b[sortConfig.key as keyof School];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [schools, searchTerm, selectedUF, selectedCidade, sortConfig, minStudents, selectedSegment]);

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const currentSchools = filteredSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const ufs = getUniqueValues(schools, "uf");
  const cidades = useMemo(() => {
    if (selectedUF === "todos") return [];
    return getUniqueValues(
      schools.filter((s) => s.uf === selectedUF),
      "cidade"
    );
  }, [schools, selectedUF]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando Ranking Nacional...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section with Background */}
      <div className="relative mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <div 
          className="relative h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 77, 104, 0.85), rgba(10, 77, 104, 0.75)), url('https://private-us-east-1.manuscdn.com/sessionFile/tgozn5f5w7Zy4Yl1W2AESl/sandbox/aLT5B3BMzY5QgMuBnxPIrM-img-1_1770222864000_na1fn_aGVyby1lZHVjYXRpb24tZGF0YQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdGdvem41ZjV3N1p5NFlsMVcyQUVTbC9zYW5kYm94L2FMVDVCM0JNelk1UWdNdUJueFBJck0taW1nLTFfMTc3MDIyMjg2NDAwMF9uYTFmbl9hR1Z5YnkxbFpIVmpZWFJwYjI0dFpHRjBZUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=udtg71XjevUjb25WIIKB72uhXU2ewab5IcYYmGzs7n8cGZ3121uwIW7tG5GukJoacr5ERM2AN8zLN-4QcDGl5ykc5OwRJkKahVnUW6NLIcQlFqMSUtSsqpd~B626XhgzKSQNR59ALnQR0mG0AsdR-A5yD5S8YtPNqBl3Deui2t3cZFEPqRIEJ81oITfu4NS-oChItzguXRrcJvVwi47S1JZ8QYfDqRVeg4D21cXYe~tmC6TDypPYwie1RtX-0JG8NUb29NTrRbH2gMGLp6Fyer-g4s7yYu2XJrHNN-RWgQPCBd31sDb1tfSiMSeoWz~4wRsUiqrEtMFRgp7MyTSQeA__')`
          }}
        >
          <div className="container h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-display text-white mb-6 tracking-tight animate-fade-in">
              Ranking Nacional de Escolas 2024
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Confira a classificação completa das escolas brasileiras com base no desempenho na
              redação do ENEM. Utilize os filtros abaixo para refinar sua busca por região e tipo de
              instituição.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 container py-8">

        <StatsOverview schools={filteredSchools} />

        {/* Filtros */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filtros de Busca</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca por Nome */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar escola..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            {/* Filtro UF */}
            <Select
              value={selectedUF}
              onValueChange={(value) => {
                setSelectedUF(value);
                setSelectedCidade("todos");
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os Estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Estados</SelectItem>
                {ufs.map((uf) => (
                  <SelectItem key={uf} value={uf}>
                    {uf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro Cidade */}
            <Select
              value={selectedCidade}
              onValueChange={(value) => {
                setSelectedCidade(value);
                setCurrentPage(1);
              }}
              disabled={selectedUF === "todos"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as Cidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Cidades</SelectItem>
                {cidades.map((cidade) => (
                  <SelectItem key={cidade} value={cidade}>
                    {cidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro Tipo */}
            <Select
              value={selectedSegment}
              onValueChange={(value) => {
                setSelectedSegment(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Escola" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="privada">Privadas</SelectItem>
                <SelectItem value="publica">Públicas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Mostrando <span className="font-semibold text-foreground">{filteredSchools.length}</span>{" "}
              escolas
            </p>
            {(searchTerm || selectedUF !== "todos" || selectedSegment !== "todos") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedUF("todos");
                  setSelectedCidade("todos");
                  setSelectedSegment("todos");
                  setCurrentPage(1);
                }}
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Tabela */}
        <SchoolTable schools={currentSchools} onSort={handleSort} sortConfig={sortConfig} />

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Próxima
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Ranking ENEM Redação. Dados baseados nos microdados oficiais do INEP.</p>
            <p className="mt-2">
              Desenvolvido para análise educacional e transparência de dados públicos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
