using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace WebApplication_dataflow.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [Authorize(Roles = "CityGis")]
        public ActionResult CityGisControlPanel()
        {
            return View();
        }

        [Authorize(Roles = "Fleet manager")]
        public ActionResult FleetManagerControlPanel()
        {
            return View();
        }

        [Authorize (Roles = "Commercial")]
        public ActionResult CommercialControlPanel()
        {
            return View();
        }
    }
}