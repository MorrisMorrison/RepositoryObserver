namespace RepositoryNotifier.Constants
{
    public class EmailTemplates
    {
        public const string INIT_TEMPLATE = "Repository: {0} | Path: {1} | File: {2} | Url {3}, GitUrl: {4}";
        public const string BODY_TEMPLATE = "Hello {0},\n we found a keyword in your repository:\n {1}";
    }
}