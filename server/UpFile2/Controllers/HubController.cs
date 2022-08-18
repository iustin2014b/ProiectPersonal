using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UpFile2;
//using static ImageWebApi.Controllers.UploadController;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using System.Diagnostics;
using Model;
using Microsoft.Win32;
using System.Xml.Linq;

namespace ImageWebApi.Controllers.Hub
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private IHostingEnvironment _environment;
        string pathServer="D:\\date\\server";
        string pathClient = "D:\\date\\client";
        string pathClientUpld = "D:\\date\\Upload";
        string pathUser = "user1";
        string pathProj = "proj1";
      
        public UploadController(IHostingEnvironment environment)
        {
            _environment = environment;
        }
   
        //https://www.learnentityframeworkcore.com/dbset
        [HttpPost("user/login")]
     
        public IActionResult userLogin(UsersLoginClient login) {
            UsersLoginDB lResult = null;
            using (var context = new DBcontextHub())
            {
                login.TimeConn=DateTime.Now;
                lResult = context.UserLogin.FirstOrDefault(a => a.Name == login.Name ||  a.Email == login.Email);
                if (lResult != null)
                    lResult.Connect = 1;
                context.SaveChanges();
            }
            if (lResult == null)
                {
                    return Ok(new { status = 401, isSuccess = false, message = "Invalid User"});
                }
                else
                    return Ok(new { status = 200, isSuccess = true, message = "User UsersLoginClient successfully", UserDetails =lResult});
            
        }

        [HttpPost("user/disconnect")]
        public IActionResult userDisconnect(UsersLoginClient login)
        {
            UsersLoginDB lResult = null;
            using (var context = new DBcontextHub())
            {
                login.TimeConn = DateTime.Now;
                lResult = context.UserLogin.FirstOrDefault(a => a.Name == login.Name);
                if (lResult!=null)
                    lResult.Connect = 0;
                context.SaveChanges();
            }
            if (lResult == null)
            {
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else

                return Ok(new { status = 200, isSuccess = true, message = "User UsersLoginClient successfully", UserDetails = lResult });
        }

        [HttpPost("register")]
         public object userRegister(UsersLoginClient register) {
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
                return new Response { 
                    Status = "Success", Message = "Record SuccessFully Saved." };
            }
            catch (Exception) {
                    throw;
                }
            return new Response { Status = "Error", Message = "Invalid Data." };
            }
        

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult UploadFileAll()
        {
            try
            {
                var files = Request.Form.Files;
                var folderName = Path.Combine("Upload");
                string webRootPath = _environment.WebRootPath;
                //string newPath = Path.Combine(webRootPath, folderName);
                string newPath = "D:\\date\\server"; //"D:\\date";
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (files.Any(f => f.Length == 0))
                {
                   // return BadRequest();
                }

                foreach (var file in files)
                {
                    
                   string fileName =ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');// DateTime.Now.Ticks + 
                    fileName=fileName.Replace( "/", "\\");
                    var fullPath = Path.Combine(newPath, fileName);
                    var dirPath=Path.GetDirectoryName(fullPath);
                    if (!Directory.Exists(dirPath))
                    {
                        Directory.CreateDirectory(dirPath);
                    }

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        try
                        {
                            file.CopyTo(stream);
                        }
                        catch (Exception)
                        {
                            //throw;
                            int i = 0;
                        }
                       
                    }
                }

                return Ok("");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("dde"), DisableRequestSizeLimit]
        public IActionResult DownloadFile()

        {
            return Ok("");
        }
        //https://sankhadip.medium.com/how-to-upload-files-in-net-core-web-api-and-react-36a8fbf5c9e8
        [HttpPost("dd"), DisableRequestSizeLimit]
        public IActionResult UploadFileLst([FromForm] FileModel file)
        {
            try
            {
                string path = Path.Combine(pathServer,pathUser, pathProj, file.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok("");
        }

      

    
    // [HttpGet]
    //  [HttpGet("{id}")]
    // public IEnumerable<WeatherForecast> GetPrj()
 
        public List<nod> treel=new List<nod>();
     
                void DirSearch(string sDir,nod sNod)
        {
           
           // sNod.nodes = new List<nod>();
           // sNod.key = sDir;
          //  sNod.label = LastElem(sDir);

            //nod nodp = new nod(sDir, sDir, child);

            try
            {
                foreach (string d in Directory.GetDirectories(sDir))
                {
                    nod nodc = new nod(d, LastElem(d), new List<nod>());
                    sNod.nodes.Add(nodc);

                    foreach (string f in Directory.GetFiles(d))
                    {
                        // Console.WriteLine(f);
                        nodc.nodes.Add(new nod(f, LastElem(f), new List<nod>()));
                        
                    }
                    Debug.WriteLine(sNod.key+sNod.nodes.ToString());
                    DirSearch(d, nodc);
                    //  sNod.nodes.Add(nodc);  

                }
                //treel.Add(sNod);
            }
            catch (System.Exception excpt)
            {
                Console.WriteLine(excpt.Message);
            }
        }

        //   [HttpGet("{id}")]
        //Gett structure path of all files
           [HttpGet("paths/{id}")]
        public IEnumerable<nod> GetLst(string id)
        {
            //treel = new List<nod>() { { } };
            string[] tf = Directory.GetFiles("D:\\dates\\testd");
            string sDir = "D:\\dates\\testd";
            nod nodc = new nod(sDir, LastElem(sDir), new List<nod>());
            treel.Add(nodc);
            DirSearch(sDir,nodc);

            return treel;
        }
        //Get all projects
        // [HttpGet("ListProjects/aa")]
         [HttpGet("ListProjects/{id}")]
        public List<PrjModel> GetLstPrj(string id)
        {
            List <PrjModel> lr = new List<PrjModel>();
            var ll = Directory.GetDirectories(pathServer);
            int i;
            foreach (var vs in ll)
            {
                lr.Add(new PrjModel { Name=vs,Info="tst" });
              //  i++;
            }

            return lr;
        }

            //Gett a file from server
            //daca apar probleme deoarrece calea e tot cu / sa o pun ivers in JS,\,sau sa vad dacanu merge prin parametru
            [HttpGet("path/{id}")]
 
        public async Task<ActionResult> DownloadFile(string id)
        {
            // ... code for validation and get the file

            var filePath = "D:\\date\\server\\user1\\1.txt";//"+$"{id}.txt"; // Here, you should validate the request and the existance of the file.

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, "text/plain", Path.GetFileName(filePath));
        }
        public IEnumerable<nod> GetFile(string id)
        {
            //treel = new List<nod>() { { } };
            string[] tf = Directory.GetFiles("D:\\dates\\testd");
            string sDir = "D:\\dates\\testd";
            nod nodc = new nod(sDir, LastElem(sDir), new List<nod>());
            treel.Add(nodc);
            DirSearch(sDir, nodc);

            return treel;
        }

        string LastElem(string s)
        {string ss= s.Substring(s.LastIndexOf('\\'));
          return ss;
        }

        public class  nod
        {
            public nod(string key,string label, List<nod> child)
            {this.key = key;this.label = label;this.nodes = child;                                      
            }
            public string key{ get; set; }
            public string label{ get; set; }
            public List<nod> nodes{ get; set; }

        }
        public class WeatherForecast
        {
            public DateTime Date { get; set; }

            public int TemperatureC { get; set; }

            public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

            public string? Summary { get; set; }
        }
        private static readonly string[] Summaries = new[]
       {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };
    }
}