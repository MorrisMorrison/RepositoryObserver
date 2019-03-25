namespace RepositoryNotifier.DTO
{
    public class UserTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }

        public UserTO(string p_username, string p_email, string p_avatarUrl)
        {
            Username = p_username;
            Email = p_email;
            AvatarUrl = p_avatarUrl;
        }

        public UserTO()
        {
        }
    }
}