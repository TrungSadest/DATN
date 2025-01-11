export class RoleModel {
    roleId: string;
    roleNm?: string;
    constructor(roleId: string, roleNm?: string) {
        this.roleId = roleId;
        this.roleNm = roleNm;
    };

    static fromJSON(roleModelObject: any): RoleModel | null {
        let roleModel: RoleModel | null = null;
        if (roleModelObject) {
            roleModel = new RoleModel("", "");
            roleModel.roleId = roleModelObject.roleId ? roleModelObject.roleId : "";
            roleModel.roleNm = roleModelObject.roleNm ? roleModelObject.roleNm : "";
        }
        return roleModel;
    }
}