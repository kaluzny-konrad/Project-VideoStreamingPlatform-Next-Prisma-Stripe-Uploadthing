import { atom, useRecoilState } from "recoil";

export type Category = {
  id: string;
  isActive: boolean;
};

interface CategoriesState {
  categories: Category[];
  anyActive: boolean;
}

const defaultCategoriesState: CategoriesState = {
  categories: [],
  anyActive: false,
};

export const categoriesState = atom<CategoriesState>({
  key: "categoriesState",
  default: defaultCategoriesState,
});

export function useCategories() {
  const [categoriesStateValue, setCategoriesStateValue] =
    useRecoilState(categoriesState);

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

  const setActive = (id: string | null) => {
    if (id === null) {
      setCategoriesStateValue((oldValue) => {
        return {
          ...oldValue,
          anyActive: false,
          categories: oldValue.categories.map((category) => {
            return {
              ...category,
              isActive: false,
            };
          }),
        };
      });
      return;
    }

    setCategoriesStateValue((oldValue) => {
      return {
        ...oldValue,
        anyActive: true,
        categories: oldValue.categories.map((category) => {
          return {
            ...category,
            isActive: category.id === id,
          };
        }),
      };
    });
  };

  const isActive = (id: string | null) => {
    return categoriesStateValue.categories.find(
      (category) => category.id === id
    )?.isActive;
  };

  return {
    categoriesStateValue,
    initCategoryIds,
    setActive,
    isActive,
  };
}
