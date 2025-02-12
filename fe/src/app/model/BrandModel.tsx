export class BrandModel {
  brandId: number;
  brandName: string;
  logo: string;
  constructor(brandId: number, brandName: string, logo: string) {
    this.brandId = brandId;
    this.brandName = brandName;
    this.logo = logo;
  }

  static fromJSON(brandModelObject: any): BrandModel | null {
    let brandModel: BrandModel | null = null;
    if (brandModelObject) {
      brandModel = new BrandModel(0, "", "");
      brandModel.brandId = brandModelObject.brandId
        ? brandModelObject.brandId
        : 0;
      brandModel.brandName = brandModelObject.brandName
        ? brandModelObject.brandName
        : "";
      brandModel.logo = brandModelObject.logo ? brandModelObject.logo : "";
    }
    return brandModel;
  }
}
