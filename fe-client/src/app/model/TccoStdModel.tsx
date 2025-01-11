export class TccoStdModel {
    commCd: string;
    commNm: string;
    commNmEn: string;
    lev: number;
    upCommCd: string;
    valueConfig: string;
    userYn: string;
    constructor(commCd: string, commNm: string, commNmEn: string, lev: number, upCommCd: string, valueConfig: string, userYn: string) {
        this.commCd = commCd;
        this.commNm = commNm;
        this.commNmEn = commNmEn;
        this.lev = lev;
        this.upCommCd = upCommCd;
        this.valueConfig = valueConfig;
        this.userYn = userYn;
    };

    static fromJSON(tccoStdModelObject: any): TccoStdModel | null {
        let tccoStdModel: TccoStdModel | null = null;
        if (tccoStdModelObject) {
            tccoStdModel = new TccoStdModel("", "", "", 0, "", "", "");
            tccoStdModel.commCd = tccoStdModelObject.commCd ? tccoStdModelObject.commCd : "";
            tccoStdModel.commNm = tccoStdModelObject.commNm ? tccoStdModelObject.commNm : "";
            tccoStdModel.commNmEn = tccoStdModelObject.CommNmEn ? tccoStdModelObject.commNmEn : "";
            tccoStdModel.lev = tccoStdModelObject.lev ? tccoStdModelObject.lev : 0;
            tccoStdModel.upCommCd = tccoStdModelObject.upCommCd ? tccoStdModelObject.upCommCd : "";
            tccoStdModel.valueConfig = tccoStdModelObject.valueConfig ? tccoStdModelObject.valueConfig : "";
            tccoStdModel.userYn = tccoStdModelObject.userYn ? tccoStdModelObject.userYn : "";
        }
        return tccoStdModel;
    }
}