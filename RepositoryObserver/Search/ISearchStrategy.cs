using System;
using System.Collections.Generic;

namespace RepositoryNotifier.Search
{
    public interface ISearchStrategy
    {
        bool Exists(string p_searchString, string p_toSearch);
        IList<SearchResult> Search(string p_searchString, string p_toSearch);

    }
}