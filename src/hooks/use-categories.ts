import { atom, useRecoilState } from "recoil";

export type Category = {
  id: string;
  isActive: boolean;
};

interface CategoriesState {
  categories: Category[];
}

const defaultCategoriesState: CategoriesState = {
  categories: [],
};

export const categoriesState = atom<CategoriesState>({
  key: "categoriesState",
  default: defaultCategoriesState,
});

export function useCategories() {
  const [categoriesStateValue, setCategoriesStateValue] =
    useRecoilState(categoriesState);

  const isMounted = () => {
    return categoriesStateValue.categories.length > 0;
  };

  const initCategoryIds = (categoryIds: string[]) => {
    setCategoriesStateValue((oldValue) => {
      return {
        ...oldValue,
        categories: categoryIds.map((categoryId) => {
          return {
            id: categoryId,
            isActive: false,
          };
        }),
      };
    });
  };

  const setActive = (id: string) => {
    setCategoriesStateValue((oldValue) => {
      return {
        ...oldValue,
        categories: oldValue.categories.map((category) => {
          return {
            ...category,
            isActive: category.id === id,
          };
        }),
      };
    });
  };

  const isActive = (id: string) => {
    return categoriesStateValue.categories.find(
      (category) => category.id === id
    )?.isActive;
  };

  const anyActive = () => {
    return categoriesStateValue.categories.some(
      (category) => category.isActive
    );
  };

  const clearStates = () => {
    setCategoriesStateValue((oldValue) => {
      return {
        ...oldValue,
        categories: oldValue.categories.map((category) => {
          return {
            ...category,
            isActive: false,
          };
        }),
      };
    });
  };

  return {
    categoriesStateValue,
    isMounted,
    initCategoryIds,
    setActive,
    isActive,
    anyActive,
    clearStates,
  };
}
