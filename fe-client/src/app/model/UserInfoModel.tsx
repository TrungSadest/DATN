import { RoleModel } from "./RoleModel";

export class UserInfoModel {
    userUid: string;
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    referrerUid: string;
    bankNm: string;
    bankNum: string;
    bankOwner: string;
    blockYn: string;
    avatarImg: string;
    regtDt: Date;
    lastUpd: Date;
    faEnable: string;
    authProvider: string;
    role: RoleModel;

    constructor(
        userUid: string,
        userId: string,
        fullName: string,
        email: string,
        phone: string,
        referrerUid: string,
        bankNm: string,
        bankNum: string,
        bankOwner: string,
        blockYn: string,
        avatarImg: string,
        regtDt: Date,
        lastUpd: Date,
        faEnable: string,
        authProvider: string,
        role: RoleModel
    ) {
        this.userUid = userUid;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.referrerUid = referrerUid;
        this.bankNm = bankNm;
        this.bankNum = bankNum;
        this.bankOwner = bankOwner;
        this.blockYn = blockYn;
        this.avatarImg = avatarImg;
        this.regtDt = regtDt;
        this.lastUpd = lastUpd;
        this.faEnable = faEnable;
        this.authProvider = authProvider;
        this.role = role;
    }
}
