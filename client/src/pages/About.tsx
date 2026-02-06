/* Design Philosophy: Jornalismo Digital Contemporâneo
 * Página informativa sobre o projeto
 */

import Header from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Target, Users, Shield } from "lucide-react";

export default function About() {
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
            Sobre o Projeto
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Uma plataforma de análise educacional baseada em dados públicos do ENEM, desenvolvida
            para promover transparência e auxiliar na tomada de decisões informadas sobre educação
            no Brasil.
          </p>
        </div>

        {/* Missão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-display text-foreground mb-4">Nossa Missão</h2>
            <p className="text-muted-foreground leading-relaxed">
              Democratizar o acesso a informações educacionais de qualidade, permitindo que
              estudantes, famílias e educadores tomem decisões baseadas em dados concretos sobre o
              desempenho escolar no Brasil.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="bg-secondary/10 text-secondary p-3 rounded-lg w-fit mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-display text-foreground mb-4">
              Para Quem é Este Projeto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Estudantes buscando escolas de excelência, famílias avaliando opções educacionais,
              educadores comparando metodologias, pesquisadores analisando tendências e gestores
              públicos planejando políticas educacionais.
            </p>
          </div>
        </div>

        {/* Metodologia */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent/10 text-accent-foreground p-3 rounded-lg">
              <Database className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-display text-foreground">
              Metodologia e Fonte de Dados
            </h2>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              Os dados apresentados nesta plataforma são baseados nos{" "}
              <strong className="text-foreground">microdados oficiais do ENEM</strong>, fornecidos
              pelo Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (INEP),
              órgão vinculado ao Ministério da Educação.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Critérios de Classificação
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Média Geral:</strong> Calculada com base nas
                cinco competências avaliadas na redação do ENEM
              </li>
              <li>
                <strong className="text-foreground">Número Mínimo de Alunos:</strong> Escolas com
                menos de 30 redações avaliadas são excluídas por padrão para garantir
                representatividade estatística
              </li>
              <li>
                <strong className="text-foreground">Competências Avaliadas:</strong> C1 (Domínio da
                Norma), C2 (Compreensão do Tema), C3 (Argumentação), C4 (Coesão), C5 (Proposta de
                Intervenção)
              </li>
              <li>
                <strong className="text-foreground">Índice Socioeconômico (NSE):</strong>{" "}
                Considerado nas análises de eficiência para contextualizar o desempenho
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Limitações e Considerações
            </h3>
            <p>
              Este ranking reflete exclusivamente o desempenho em redação do ENEM e não deve ser
              interpretado como uma avaliação completa da qualidade educacional de uma instituição.
              Outros fatores importantes como infraestrutura, corpo docente, metodologia pedagógica
              e desenvolvimento socioemocional não são contemplados nesta análise.
            </p>
          </div>
        </div>

        {/* Transparência */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-display text-foreground">
              Compromisso com a Transparência
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Todos os dados utilizados nesta plataforma são de domínio público e podem ser
            verificados diretamente no portal do INEP. Nosso compromisso é apresentar informações
            precisas, atualizadas e contextualizadas para auxiliar na compreensão do cenário
            educacional brasileiro.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Fonte oficial:</strong> INEP - Instituto Nacional
            de Estudos e Pesquisas Educacionais Anísio Teixeira
          </p>
        </div>
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
