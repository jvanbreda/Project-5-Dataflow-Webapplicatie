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
        // GET: WebApi
        public ActionResult Index()
        {
            return View();
        }
        public void Connect()
        {
            try
            {
                Console.WriteLine("Starting Web API connection");
                WebClient client = new WebClient();
                string response = client.DownloadString("http://145.24.222.160/DataFlowWebservice/api/monitorings");
                Console.WriteLine("Succesfull connected to Web API");
            }
            catch (Exception e)
            {
                Console.WriteLine("Cannot create Web API connection!");
            }
        }

    }
}