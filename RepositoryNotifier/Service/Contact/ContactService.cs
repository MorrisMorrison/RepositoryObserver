
using RepositoryNotifier.DTO;
using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{
    
    public class ContactService: IContactService
    {
        private IContactDao _contactDao {get;set;}

        public ContactService(IContactDao p_contactDao){
            _contactDao = p_contactDao;
        }

        public void AddContact( ContactTO p_contact)
        {
            Contact contact = new Contact(){
                Name = p_contact.Name,
                Email = p_contact.Email,
                Subject = p_contact.Subject,
                Message = p_contact.Message,
            };

            _contactDao.AddContact(contact);
        }




    }

}