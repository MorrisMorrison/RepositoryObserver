using System.Linq;
using RepositoryNotifier.DTO;

public class ValidationHelper{

    public static bool IsValid(CreateJobTO p_job){
        
        if (p_job == null) return false;
        if (string.IsNullOrEmpty(p_job.Email)) return false;
        if (string.IsNullOrEmpty(p_job.Username)) return false;
        if (p_job.SchedulerEnabled && p_job.Frequency == null) return false;
        if (p_job.SmsNotificationEnabled && string.IsNullOrEmpty(p_job.PhoneNumber)) return false;
        if (!p_job.SearchKeywords.Any()) return false;
        if (!p_job.Repositories.Any()) return false;

        return true;
    }


    
}