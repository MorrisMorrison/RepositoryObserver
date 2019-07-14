import { RepositoryTO } from "../dto/repositoryTO";

export class AddNotificationModel{
    public email: string;
    public repositories: string[] = [];
    public repositoryTos: RepositoryTO[] = [];
    public frequencies: number[] = [];
    public selectedFrequency: number;
    public commonKeywords: string[] = [];
    public searchKeywords: string[] = [];
    public searchKeywordToAdd: string;
    public smsNotificationEnabled: boolean;
    public whatsappNotificationEnabled: boolean;
    public emailNotificationEnabled: boolean;
    public phoneNumber: string;
    public schedulerEnabled: boolean;

    constructor(){

    }
}