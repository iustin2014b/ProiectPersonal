using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class UsersLoginClient {
        public int IdUser { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public int Connect { get; set; }
        public Nullable <DateTime> TimeConn { get; set; }
    }
    public class Response {
        public string Status { set; get; }
        public string Message { set; get; }

    }
   
    public class UsersLoginDB {
        [Key]
        public int IdUser { get; set; }
 
        public string Email { get; set; }

       public string Password { get; set; }

       public string Name { get; set; }
        public int Connect { get; set; }
        public DateTime?  TimeConn { get; set; }

    }

    public class DBcontextHub : DbContext
    {
        public DbSet<UsersLoginDB>? UserLogin { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source = LROCJEGM045; Initial Catalog = GitHub; Integrated Security = True");
        }
    }

}
