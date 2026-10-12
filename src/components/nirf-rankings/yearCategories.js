import { rankingCategories2025 } from "./rankingCategories2025";
import { rankingCategories2024 } from "./rankingCategories2024";
import { rankingCategories2023 } from "./rankingCategories2023";
import { rankingCategories2022 } from "./rankingCategories2022";
import { rankingCategories2021 } from "./rankingCategories2021";
import { rankingCategories2020 } from "./rankingCategories2020";
import { rankingCategories2019 } from "./rankingCategories2019";
import { rankingCategories2018 } from "./rankingCategories2018";
import { rankingCategories2017 } from "./rankingCategories2017";
import { rankingCategories2016 } from "./rankingCategories2016";

export const YEARS = Array.from(
  { length: 2025 - 2016 + 1 },
  (_, i) => 2025 - i
);

export const yearCategories = {
  2025: rankingCategories2025,
  2024: rankingCategories2024,
  2023: rankingCategories2023,
  2022: rankingCategories2022,
  2021: rankingCategories2021,
  2020: rankingCategories2020,
  2019: rankingCategories2019,
  2018: rankingCategories2018,
  2017: rankingCategories2017,
  2016: rankingCategories2016,
};

export function getCategoryMeta(year, slug) {
  const categories = yearCategories[year] || yearCategories[Number(year)] || [];
  return categories.find((item) => item.slug === slug) || null;
}
