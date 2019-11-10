using System.Collections.Generic;

namespace RepositoryNotifier.Search
{
    public class PasswordFinder
    {
        private const string SEARCHSTRING = "PASSWORD";
        private SearchManager _searchManager { get; set; }

        public PasswordFinder()
        {
            _searchManager = new SearchManager();
        }

        public bool PasswordExists(string p_toSearch)
        {
            return _searchManager.Exists(SEARCHSTRING, p_toSearch);
        }

        public IList<SearchResult> FindPasswords(string p_toSearch)
        {
            IList<SearchResult> searchResults = _searchManager.Search(SEARCHSTRING, p_toSearch);
            return searchResults;
        }
    }
}