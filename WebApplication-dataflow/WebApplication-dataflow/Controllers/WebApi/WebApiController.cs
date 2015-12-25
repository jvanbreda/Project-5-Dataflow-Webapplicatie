using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers
{
    public class WebApiController : Controller
    {
        public string rawData { get; set; }
        public string readableData { get; set; }
        // GET: WebApi
        public ActionResult Index()
        {
            return View();
        }
        public void Connect(string jsonFile)
        {
            try
            {
                Console.WriteLine("Starting Web API connection");
                WebClient client = new WebClient();
                rawData = client.DownloadString("http://145.24.222.160/DataFlowWebservice/api/" + jsonFile);
                Console.WriteLine("Succesfull connected to Web API");
                MakeReadable();
            }
            catch (Exception e)
            {
                Console.WriteLine("Cannot create Web API connection!");
            }
        }

        private void MakeReadable()
        {
            Console.WriteLine("start make raw data readable");
            readableData = rawData.Substring(rawData.IndexOf("[{"));
            readableData = readableData.Remove(readableData.Length -1);
        }

    }
}