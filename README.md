# Ranking de Escolas - Redação ENEM 2024

Plataforma web para visualização e análise do ranking de escolas brasileiras com base no desempenho na redação do ENEM 2024.

## 📊 Sobre o Projeto

Este projeto processa os **microdados oficiais do ENEM 2024** fornecidos pelo INEP e apresenta um ranking interativo de **12.734 escolas** brasileiras, com análises estatísticas e comparações detalhadas.

### Estatísticas Gerais

- **12.734 escolas** avaliadas
- **954.249 redações** processadas
- **Média nacional:** 657,8 pontos
- **Melhor desempenho:** 931,9 pontos

## 🚀 Funcionalidades

- **Ranking Nacional** com filtros por UF, cidade e tipo de escola
- **Análise Geral** com comparações entre escolas públicas e privadas
- **Comparação de Escolas** lado a lado
- **Perfis Detalhados** de cada escola com gráficos de competências
- **Busca Avançada** por nome, localização ou tipo

## 🛠️ Tecnologias

- **Frontend:** React 19 + TypeScript + Vite
- **Estilo:** TailwindCSS 4
- **Componentes:** shadcn/ui + Radix UI
- **Gráficos:** Recharts
- **Roteamento:** Wouter

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/danielantunesmachado/ranking-enem-redacao-2024.git

# Entre no diretório
cd ranking-enem-redacao-2024

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

## 📁 Estrutura do Projeto

```
ranking-enem-redacao-2024/
├── client/
│   ├── public/
│   │   └── data/
│   │       └── escolas.json      # Dados processados do ranking
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── pages/                # Páginas da aplicação
│   │   ├── types/                # Definições TypeScript
│   │   └── lib/                  # Utilitários
│   └── index.html
├── server/                       # Servidor Express (produção)
├── package.json
└── README.md
```

## 📊 Fonte dos Dados

Os dados utilizados neste projeto são os **microdados oficiais do ENEM 2024** disponibilizados pelo INEP (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira).

- **Fonte:** [INEP - Microdados ENEM](https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem)
- **Processamento:** Python com pandas
- **Critério:** Escolas com pelo menos 30 alunos avaliados

## 🎨 Design

O projeto utiliza a filosofia de design **Jornalismo Digital Contemporâneo**, combinando:

- Tipografia robusta (Merriweather + Inter)
- Paleta de cores institucional (azul petróleo, verde esmeralda, amarelo âmbar)
- Layout editorial assimétrico
- Visualizações de dados sofisticadas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através das issues do GitHub.

---

**Desenvolvido com ❤️ para democratizar o acesso à informação educacional brasileira.**
