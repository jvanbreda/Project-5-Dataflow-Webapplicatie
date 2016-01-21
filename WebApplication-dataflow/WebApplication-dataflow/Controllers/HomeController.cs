using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult ControlPanel()
        {
            if (User.Identity.Name != "") { 
                if(User.IsInRole("CityGis"))
                    return RedirectToAction("Controlpanel", "CityGis", new { area = "" });
                if (User.IsInRole("Fleet manager"))
                    return RedirectToAction("Controlpanel", "FleetManager", new { area = "" });
                if (User.IsInRole("Commercial"))
                    return RedirectToAction("Controlpanel", "Commercial", new { area = "" });
            }
            return RedirectToAction("LogIn", "Account", new { area = "" });
        }
    }
}