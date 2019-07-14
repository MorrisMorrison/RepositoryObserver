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
    public whatsappNotificationEnabled: boolean = false;
    public emailNotificationEnabled: boolean = false;
    public phoneNumber: string = "";
    public schedulerEnabled: boolean = true;

    constructor(){

    }
}