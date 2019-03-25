using System.Collections.Generic;

namespace RepositoryNotifier.Search
{
    public class SearchManager: ISearchManager
    {
        private ISearchStrategy _searchStrategy { get; set; }

        public SearchManager()
        {
            _searchStrategy = new DefaultSearchStrategy();
        }

        public bool Exists(string p_searchString, string p_toSearch)
        {
            return _searchStrategy.Exists(p_searchString, p_toSearch);
        }

        public IList<SearchResult> Search(string p_searchString, string p_toSearch)
        {
            return _searchStrategy.Search(p_searchString, p_toSearch);
        }
    }
}