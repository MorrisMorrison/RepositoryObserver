using System.Collections.Generic;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;

namespace RepositoryNotifier.DTO
{
    public class CreateRepositoryInspectorJobTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> Repositories { get; set; }
        public RepositoryInspectorJobFrequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
    }

    public class UpdateRepositoryInspectorJobTO{
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> Repositories { get; set; }
        public RepositoryInspectorJobFrequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
    }
}