using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers.Users
{
    [Authorize (Roles ="CityGis")]
    public class CityGisController : UserController
    {
        // GET: CityGis
        public ActionResult Index()
        {
            return View();
        }
    }
}