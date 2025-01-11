export class UserRoleModel {
    userUid: string;
    roleId: string;
    constructor(userUid: string, roleId: string) {
        this.userUid = userUid;
        this.roleId = roleId;
    };

    static fromJSON(userRoleModelObject: any): UserRoleModel | null {
        let userRoleModel: UserRoleModel | null = null;
        if (userRoleModelObject) {
            userRoleModel = new UserRoleModel("", "");
            userRoleModel.userUid = userRoleModelObject.userUid ? userRoleModelObject.userUid : "";
            userRoleModel.roleId = userRoleModelObject.roleId ? userRoleModelObject.roleId : "";
        }
        return userRoleModel;
    }
}