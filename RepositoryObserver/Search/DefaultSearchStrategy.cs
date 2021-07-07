using System.Collections.Generic;

namespace RepositoryNotifier.Search
{
    public class DefaultSearchStrategy: ISearchStrategy
    {
        public bool Exists(string p_searchString, string p_toSearch)
        {
            throw new System.NotImplementedException();
        }

        public IList<SearchResult> Search(string p_searchString, string p_toSearch)
        {
            throw new System.NotImplementedException();
        }
    }
}