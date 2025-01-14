export class SizeModel {
    sizeId: number;
    sizeName: string;
    constructor(sizeId: number, sizeName: string) {
        this.sizeId = sizeId;
        this.sizeName = sizeName;
    };

    static fromJSON(sizeModelObject: any): SizeModel | null {
        let sizeModel: SizeModel | null = null;
        if (sizeModelObject) {
            sizeModel = new SizeModel(0, "");
            sizeModel.sizeId = sizeModelObject.sizeId ? sizeModelObject.sizeId : 0;
            sizeModel.sizeName = sizeModelObject.sizeName ? sizeModelObject.sizeName : "";
        }
        return sizeModel;
    }
}