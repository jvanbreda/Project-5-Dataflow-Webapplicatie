using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult BuyData()
        {
            return View();
        }

        public ActionResult Ignition()
        {
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Your about page";

            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult UnitsInfo() {
            return View();
        }
    }
}