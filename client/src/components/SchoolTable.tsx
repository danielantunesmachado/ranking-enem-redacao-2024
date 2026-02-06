/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Tabela de ranking com badges de medalha e tipografia de dados
 */

import { School } from "@/types";
import { Link } from "wouter";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRankingBadge, formatNumber } from "@/lib/statsUtils";

interface SchoolTableProps {
  schools: School[];
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: "asc" | "desc" };
}

export default function SchoolTable({ schools, onSort, sortConfig }: SchoolTableProps) {
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 opacity-30" />;
    }
    return <ArrowUpDown className={`h-4 w-4 ${sortConfig.direction === "asc" ? "rotate-180" : ""}`} />;
  };

  const getRankingBadgeClass = (ranking: number) => {
    if (ranking === 1) return "badge-gold";
    if (ranking === 2) return "badge-silver";
    if (ranking === 3) return "badge-bronze";
    return "";
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-left p-4 font-semibold text-sm text-muted-foreground">
              <button
                onClick={() => onSort("ranking")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                Ranking {getSortIcon("ranking")}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-sm text-muted-foreground">
              <button
                onClick={() => onSort("nome")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                Escola {getSortIcon("nome")}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-sm text-muted-foreground hidden md:table-cell">
              <button
                onClick={() => onSort("uf")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                UF {getSortIcon("uf")}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-sm text-muted-foreground hidden lg:table-cell">
              <button
                onClick={() => onSort("cidade")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                Cidade {getSortIcon("cidade")}
              </button>
            </th>
            <th className="text-center p-4 font-semibold text-sm text-muted-foreground">
              <button
                onClick={() => onSort("dependencia")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                Tipo {getSortIcon("dependencia")}
              </button>
            </th>
            <th className="text-center p-4 font-semibold text-sm text-muted-foreground hidden sm:table-cell">
              <button
                onClick={() => onSort("qtd_redacoes")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                Alunos {getSortIcon("qtd_redacoes")}
              </button>
            </th>
            <th className="text-center p-4 font-semibold text-sm text-muted-foreground">
              <button
                onClick={() => onSort("media_geral")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                Média {getSortIcon("media_geral")}
              </button>
            </th>
            <th className="text-center p-4 font-semibold text-sm text-muted-foreground">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school, index) => (
            <tr
              key={school.id}
              className="border-b border-border hover:bg-muted/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {school.ranking <= 3 && (
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${getRankingBadgeClass(school.ranking)}`}
                    >
                      {school.ranking}
                    </span>
                  )}
                  {school.ranking > 3 && (
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground font-semibold text-sm">
                      {school.ranking}
                    </span>
                  )}
                  <span className="text-xl">{getRankingBadge(school.ranking)}</span>
                </div>
              </td>
              <td className="p-4">
                <div>
                  <p className="font-semibold text-foreground hover:text-primary transition-colors">
                    {school.nome}
                  </p>
                  <p className="text-xs text-muted-foreground md:hidden">
                    {school.cidade} - {school.uf}
                  </p>
                </div>
              </td>
              <td className="p-4 hidden md:table-cell">
                <span className="inline-flex items-center px-2 py-1 rounded bg-primary/10 text-primary font-medium text-xs">
                  {school.uf}
                </span>
              </td>
              <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">
                {school.cidade}
              </td>
              <td className="p-4 text-center">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    school.dependencia === "Privada"
                      ? "bg-accent/20 text-accent-foreground"
                      : "bg-secondary/20 text-secondary-foreground"
                  }`}
                >
                  {school.dependencia}
                </span>
              </td>
              <td className="p-4 text-center text-sm text-data hidden sm:table-cell">
                {school.qtd_redacoes}
              </td>
              <td className="p-4 text-center">
                <span className="text-lg font-bold text-data text-foreground">
                  {formatNumber(school.media_geral)}
                </span>
              </td>
              <td className="p-4 text-center">
                <Link href={`/escola/${school.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">Ver</span>
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
