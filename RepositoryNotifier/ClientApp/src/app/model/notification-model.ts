import { RepositoryTO } from "../dto/repositoryTO";

export class NotificationModel{
    public email: string;
    public repositories: string[] = [];
    public repositoryTos: RepositoryTO[] = [];
    public frequencies: number[] = [];
    public selectedFrequency: number;
    public commonKeywords: string[] = [];
    public searchKeywords: string[] = [];
    public searchKeywordToAdd: string;

    constructor(){

    }
}