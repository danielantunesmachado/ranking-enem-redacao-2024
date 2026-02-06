/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Cards de estatísticas com tipografia de dados e badges visuais
 */

import { TrendingUp, Users, Award, Target } from "lucide-react";
import { School } from "@/types";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  trend?: string;
}

function StatCard({ icon, label, value, subtitle, trend }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">{icon}</div>
        {trend && (
          <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-3xl font-bold text-data text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

interface StatsOverviewProps {
  schools: School[];
}

export default function StatsOverview({ schools }: StatsOverviewProps) {
  // Calcular estatísticas reais dos dados
  const totalEscolas = schools.length;
  const mediaNacional =
    schools.length > 0
      ? (schools.reduce((sum, s) => sum + s.media_geral, 0) / schools.length).toFixed(1)
      : "0";
  const melhorEscola = schools.length > 0 ? schools[0] : null;
  const totalAlunos = schools.reduce((sum, s) => sum + s.qtd_redacoes, 0);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Award className="h-5 w-5" />}
          label="Média Nacional"
          value={mediaNacional}
          subtitle="Pontos na redação"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Escolas Avaliadas"
          value={totalEscolas.toLocaleString("pt-BR")}
          subtitle="Em todo o Brasil"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Melhor Desempenho"
          value={melhorEscola ? melhorEscola.media_geral.toFixed(1) : "0"}
          subtitle={
            melhorEscola
              ? `${melhorEscola.nome.length > 35 ? melhorEscola.nome.substring(0, 32) + "..." : melhorEscola.nome}`
              : "N/A"
          }
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Total de Alunos"
          value={totalAlunos.toLocaleString("pt-BR")}
          subtitle="Redações avaliadas"
        />
      </div>
    </div>
  );
}
