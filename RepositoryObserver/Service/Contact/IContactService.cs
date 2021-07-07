
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{


    public interface IContactService
    {
        void AddContact(ContactTO p_contact);
    }

}