import { db } from "@/db";
import { publicProcedure, router } from "./trpc";

export const categoryRouter = router({
  getCategories: publicProcedure.query(async () => {
    const categories = await db.category.findMany({});
    return categories;
  }),
});
