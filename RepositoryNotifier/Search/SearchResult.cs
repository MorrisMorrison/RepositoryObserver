namespace RepositoryNotifier.Search
{
    public class SearchResult
    {
        public string File { get; set; }
        public string Repository { get; set; }
        public string Path { get; set; }
        public long Line { get; set; }
    }
}