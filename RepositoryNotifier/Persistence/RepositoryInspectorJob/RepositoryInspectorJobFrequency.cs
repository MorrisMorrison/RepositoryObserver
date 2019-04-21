namespace RepositoryNotifier.Persistence.RepositoryInspectorJob
{
    public enum RepositoryInspectorJobFrequency: long
    {
        // available frequencies in minutes
        ONE_MINUTE = 1,
        FIFTEEN_MINUTES = 15,
        THIRTY_MINUTES = 30,
        ONE_HOUR = 60,
        THREE_HOURS = 180,
        SIX_HOURS = 360,
        TWELVE_HOURS = 720,
        ONE_DAY = 1440
    }
}