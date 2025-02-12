export class ColorModel{
    colorId: number;
    colorName: string;
    colorCode: string;
    constructor(colorId : number, colorName : string, colorCode : string) {
    this.colorId = colorId;
this.colorName = colorName;
this.colorCode = colorCode;
    }; 

    static fromJSON(colorModelObject : any) : ColorModel | null{ 
      let colorModel : ColorModel | null = null;
      if(colorModelObject){ 
        colorModel = new ColorModel(0,"","");
        colorModel.colorId = colorModelObject.colorId ?  colorModelObject.colorId : 0 ; 
colorModel.colorName = colorModelObject.colorName ?  colorModelObject.colorName : "" ; 
colorModel.colorCode = colorModelObject.colorCode ?  colorModelObject.colorCode : "" ; 
      }
      return colorModel ;
    } 
}