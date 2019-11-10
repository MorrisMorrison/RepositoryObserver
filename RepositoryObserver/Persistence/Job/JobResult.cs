using System;
using System.Collections.Generic;
using Octokit;

namespace RepositoryNotifier.Persistence.Job
{
    public class JobResult
    {
        public string Name {get;set;}
        public string Path {get;set;}
        public string Sha {get;set;}
        public string GitUrl {get;set;}
        public string HtmlUrl {get;set;}
        public Repository Repository {get;set;}
        public DateTime CreatedAt{get;set;}
    }
}