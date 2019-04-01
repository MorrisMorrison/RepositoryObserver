using RepositoryNotifier.Persistence;

namespace RepositoryNotifier.Service
{
    public interface IDonationService
    {
         void AddDonation( PayPal.v1.Payments.Payment p_payment);
    }
}