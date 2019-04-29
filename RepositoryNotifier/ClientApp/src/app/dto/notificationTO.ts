export class AddNotificationTO{
    username: string;
    email: string;
    repositories: string[];
    frequency: number;
    searchKeywords: string[];
}

export class UpdateNotificationTO{
    username: string;
    email: string;
    repositories: string[];
    frequency: number;
    searchKeywords: string[];
}

export class GetNotificationTO extends AddNotificationTO{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    lastExecutedAt: Date;
    status: string;
}

export class Notification{
    getNotificationTO: GetNotificationTO;
    selected: boolean;


    constructor(getNotificationTO: GetNotificationTO, selected: boolean) {
        this.getNotificationTO = getNotificationTO;
        this.selected = selected;
    }
}

export class DeleteNotificationTO{
    email: string;
    frequency: number;
}

export class NotificationResultTO{
    name:string;
    path:string;
    url:string;
    repositoryName:string;
    createdAt: Date;
}
