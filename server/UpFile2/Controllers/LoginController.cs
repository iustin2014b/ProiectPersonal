using System;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace ImageWebApi.Controllers.Login {
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase { 
        //https://www.learnentityframeworkcore.com/dbset
        [HttpPost("signin")]
        public IActionResult userLogin(UsersLoginClient login) { 
            UsersLoginDB lResult = null;
            using (var context = new DBcontextHub()) { 
                login.TimeConn = DateTime.Now;
                lResult = context.UserLogin.FirstOrDefault(a => a.Name == login.Name || a.Email == login.Email);
                if (lResult != null)
                    lResult.Connect = 1;
                context.SaveChanges();
            }
            if (lResult == null) { 
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User" });
            }
            else
                return Ok(new { status = 200, isSuccess = true, message = "User UsersLoginClient successfully", UserDetails = lResult });
        }

        [HttpPost("signout")]
        public IActionResult userDisconnect(UsersLoginClient login) { 
            UsersLoginDB lResult = null;
            using (var context = new DBcontextHub()) { 
                login.TimeConn = DateTime.Now;
                lResult = context.UserLogin.FirstOrDefault(a => a.Name == login.Name);
                if (lResult != null)
                    lResult.Connect = 0;
                context.SaveChanges();
            }
            if (lResult == null) { 
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else
                return Ok(new { status = 200, isSuccess = true, message = "User UsersLoginClient successfully", UserDetails = lResult });
        }

        [HttpPost("register")]
        public object userRegister(UsersLoginClient register)
        {
            try { 
                 using (var context = new DBcontextHub()) { 
                    var usl = new UsersLoginDB() { 
                         Email = register.Email,
                         Password = register.Password,
                         Name = register.Name,
                         TimeConn = DateTime.Now,
                         Connect = 0
                    };
                    context.UserLogin.Add(usl);
                    context.SaveChanges();
                 }
                 return new Response { Status = "Success", Message = "Record SuccessFully Saved."};
            }
            catch (Exception) {
                 return new Response {Status = "Error", Message = "Invalid Data."};
                 throw;
            }
        }
    }
}