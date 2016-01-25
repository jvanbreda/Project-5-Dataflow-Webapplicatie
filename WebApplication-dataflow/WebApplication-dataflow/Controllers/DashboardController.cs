using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            //if (User.Identity.IsAuthenticated)
            //{
                return View();
            //}
            //else
            //{
            //    return RedirectToAction("LogIn", "Account", new { area = "" });
            //}
        }
    }
}