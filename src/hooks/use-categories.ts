import { atom, useRecoilState } from "recoil";

interface CategoriesState {
  activeCategoryId: string | null;
}

const defaultCategoriesState: CategoriesState = {
  activeCategoryId: null,
};

export const categoriesState = atom<CategoriesState>({
  key: "categoriesState",
  default: defaultCategoriesState,
});

export function useCategories() {
  const [categoriesStateValue, setCategoriesStateValue] =
    useRecoilState(categoriesState);

  const setActive = (id: string | null) => {
    setCategoriesStateValue({
      ...categoriesStateValue,
      activeCategoryId: id,
    });
  };

  return {
    categoriesStateValue,
    setActive,
  };
}
