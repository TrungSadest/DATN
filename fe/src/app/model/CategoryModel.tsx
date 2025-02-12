export class CategoryModel {
  categoryId: string;
  categoryName: string;
  isDel: boolean;
  constructor(categoryId: string, categoryName: string, isDel: boolean) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.isDel = isDel;
  }

  static fromJSON(categoryModelObject: any): CategoryModel | null {
    let categoryModel: CategoryModel | null = null;
    if (categoryModelObject) {
      categoryModel = new CategoryModel("", "", false);
      categoryModel.categoryId = categoryModelObject.categoryId
        ? categoryModelObject.categoryId
        : "";
      categoryModel.categoryName = categoryModelObject.categoryName
        ? categoryModelObject.categoryName
        : "";
      categoryModel.isDel = categoryModelObject.isDel
        ? categoryModelObject.isDel
        : false;
    }
    return categoryModel;
  }
}
