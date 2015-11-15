using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication_cityGisGebruiker.Models;

namespace WebApplication_cityGisGebruiker.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Unit information";





            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public List<Unit> GetUnits() {
            Unit dummyUnit1 = new Unit { unitID = 1, numOfSatellites = 5, HDOP = 4, GPSQuality = "dGPS", GPS_lat = 51.41314, GPS_long = 5.43214 };
            Unit dummyUnit2 = new Unit { unitID = 2, numOfSatellites = 0, HDOP = 0, GPSQuality = "GPS", GPS_lat = 51.44430, GPS_long = 5.52097 };
            Unit dummyUnit3 = new Unit { unitID = 3, numOfSatellites = 1, HDOP = 3, GPSQuality = "dGPS", GPS_lat = 51.44403, GPS_long = 5.52093 };

            string response = "{\"statusCode\":200, \"requestType\":\"GET\",\"size\":3,\"data\":" + JsonConvert.SerializeObject(new[] { dummyUnit1, dummyUnit2, dummyUnit3 }) + "}";

            int length = response.LastIndexOf("}") - response.IndexOf("[{");
            List<Unit> unitsFromJson = JsonConvert.DeserializeObject<List<Unit>>(response.Substring(response.IndexOf("[{"), length));

            return unitsFromJson;
        }
    }
}