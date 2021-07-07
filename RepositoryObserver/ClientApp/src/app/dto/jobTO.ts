export class AddJobTO{
    username: string;
    email: string;
    repositories: string[];
    frequency: number;
    searchKeywords: string[];
    phoneNumber:string;
    emailNotificationEnabled:boolean;
    smsNotificationEnabled:boolean;
    whatsappNotificationEnabled:boolean;
    schedulerEnabled:boolean;
}

export class UpdateJobTO{
    username: string;
    email: string;
    repositories: string[];
    frequency: number;
    searchKeywords: string[];
}

export class GetJobTO extends AddJobTO{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    lastExecutedAt: Date;
    status: string;
}

export class Job{
    getJobTO: GetJobTO;
    selected: boolean;


    constructor(getJobTO: GetJobTO, selected: boolean) {
        this.getJobTO = getJobTO;
        this.selected = selected;
    }
}

export class DeleteJobTO{
    email: string;
    frequency: number;
}

export class JobResultTO{
    name:string;
    path:string;
    url:string;
    repositoryName:string;
    createdAt: Date;
}
