import { db } from "../lib/db";

export class CategoryService {
  static async getAllCategories() {
    return db.getCategories();
  }

  static async getCategoryBySlug(slug: string) {
    return db.getCategoryBySlug(slug);
  }
}
