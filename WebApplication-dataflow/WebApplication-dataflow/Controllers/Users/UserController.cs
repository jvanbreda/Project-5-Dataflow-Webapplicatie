using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers.Users
{
    public abstract class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ControlPanel()
        {
            WebApiController webApi = new WebApiController();
            webApi.Connect("monitorings");

            return View();
        }
    }
}