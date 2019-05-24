using System;
using System.Collections.Generic;
using RepositoryNotifier.Persistence.Job;

namespace RepositoryNotifier.DTO
{
    public class CreateRepositoryInspectorJobTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> Repositories { get; set; }
        public JobFrequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
    }

    public class UpdateRepositoryInspectorJobTO{
        public string Username { get; set; }
        public string Email { get; set; }
        public IList<string> Repositories { get; set; }
        public JobFrequency Frequency { get; set; }
        public IList<string> SearchKeywords{get;set;}
    }

    public class RepositoryInspectorJobResultTO{
        public string Name {get;set;}
        public string Path {get;set;}
        public string Url {get;set;}
        public string RepositoryName {get;set;}
        public DateTime CreatedAt {get;set;}
    }
}