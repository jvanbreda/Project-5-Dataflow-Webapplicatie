using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication_cityGisGebruiker.Models {
    public class Unit {
        public int unitID {get; set;}
        public int numOfSatellites { get; set; }
        public int HDOP { get; set; }
        public string GPSQuality { get; set; }
        public double GPS_lat { get; set; }
        public double GPS_long { get; set; }
    }
}