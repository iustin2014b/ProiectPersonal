//namespace UpFile2.Model
//{
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;

    namespace Model
    {
        public class FileModel
        {
            public string FileName { get; set; }
            public IFormFile FormFile { get; set; }
            //public List<IFormFile> FormFiles { get; set; }
        }
    public class PrjModel
    {
        public string Name { get; set; }
        public string Info { get; set; }
        //public List<IFormFile> FormFiles { get; set; }
    }

}
//}
