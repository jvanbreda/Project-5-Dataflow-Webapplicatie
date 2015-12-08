using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers.Users
{
    [Authorize (Roles = "Commercial")]
    public class CommercialController : UserController
    {
        // GET: Commercial
        public ActionResult Index()
        {
            return View();
        }

    }
}