import { atom, useRecoilState } from "recoil";

interface CategoriesState {
  activeCategoryIds: string[];
}

const defaultCategoriesState: CategoriesState = {
  activeCategoryIds: [],
};

export const categoriesState = atom<CategoriesState>({
  key: "categoriesState",
  default: defaultCategoriesState,
});

export function useCategories() {
  const [categoriesStateValue, setCategoriesStateValue] =
    useRecoilState(categoriesState);

  const toggleActive = (id: string) => {
    setCategoriesStateValue((prev) => {
      const isActive = prev.activeCategoryIds.includes(id);
      if (isActive) {
        return {
          activeCategoryIds: prev.activeCategoryIds.filter((c) => c !== id),
        };
      } else {
        return {
          activeCategoryIds: [...prev.activeCategoryIds, id],
        };
      }
    });
  };

  return {
    categoriesStateValue,
    toggleActive,
  };
}
