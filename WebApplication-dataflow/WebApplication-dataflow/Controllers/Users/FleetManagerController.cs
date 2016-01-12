using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers.Users
{
    [Authorize (Roles = "Fleet manager")]
    public class FleetManagerController : UserController
    {
        // GET: FleetManager
        public ActionResult Index()
        {
            return View();
        }

    }
}