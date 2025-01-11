export class SearchModel {
    content: string;
    page: number;
    limit: number;

    constructor(content: string, page: number, limit: number) {
        this.content = content;
        this.page = page;
        this.limit = limit;
    };

    static fromJSON(searchModelObject: any): SearchModel | null {
        let searchModel: SearchModel | null = null;
        if (searchModelObject) {
            searchModel = new SearchModel("", 0, 0);
            searchModel.content = searchModelObject.content ? searchModelObject.content : "";
            searchModel.page = searchModelObject.page ? searchModelObject.page : 0;
            searchModel.limit = searchModelObject.limit ? searchModelObject.limit : 0;
        }
        return searchModel;
    }
}