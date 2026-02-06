import { School, Averages } from "@/types";

export function calculateAverages(schools: School[]): Averages {
  if (schools.length === 0) {
    return {
      media_geral: 0,
      comp1: 0,
      comp2: 0,
      comp3: 0,
      comp4: 0,
      comp5: 0,
    };
  }

  const sum = schools.reduce(
    (acc, school) => ({
      media_geral: acc.media_geral + school.media_geral,
      comp1: acc.comp1 + school.comp1,
      comp2: acc.comp2 + school.comp2,
      comp3: acc.comp3 + school.comp3,
      comp4: acc.comp4 + school.comp4,
      comp5: acc.comp5 + school.comp5,
    }),
    { media_geral: 0, comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0 }
  );

  const count = schools.length;

  return {
    media_geral: parseFloat((sum.media_geral / count).toFixed(1)),
    comp1: parseFloat((sum.comp1 / count).toFixed(1)),
    comp2: parseFloat((sum.comp2 / count).toFixed(1)),
    comp3: parseFloat((sum.comp3 / count).toFixed(1)),
    comp4: parseFloat((sum.comp4 / count).toFixed(1)),
    comp5: parseFloat((sum.comp5 / count).toFixed(1)),
  };
}

export function getUniqueValues<T>(array: T[], key: keyof T): string[] {
  const unique = Array.from(new Set(array.map((item) => String(item[key]))));
  return unique.sort();
}

export function formatNumber(num: number, decimals: number = 1): string {
  return num.toFixed(decimals);
}

export function getRankingBadge(ranking: number): string {
  if (ranking === 1) return "🥇";
  if (ranking === 2) return "🥈";
  if (ranking === 3) return "🥉";
  return "";
}

export function getEfficiencyScore(school: School): number {
  const nse = school.nse || 4;
  return school.media_geral / nse;
}
