using System.Web;
using System.Web.Optimization;

namespace WebApplication_dataflow
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/pdf").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jspdf.js",
                        "~/Scripts/plugins/*.js",
                        "~/Scripts/html2canvas.min.js",
                        "~/Scripts/pdf.generator.js"));

            bundles.Add(new ScriptBundle("~/bundles/graph").Include(
                        "~/Scripts/angular-fusioncharts.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/buydata").Include(
                        "~/Scripts/buydata.js",
                        "~/Scripts/xml2json.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new StyleBundle("~/Content/DashboardStyle").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Dashboard.css"));
            bundles.Add(new StyleBundle("~/Content/HomeStyle").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/Home.css"));

            bundles.Add(new ScriptBundle("~/bundles/dashboardController").Include(
                        "~/Scripts/AngularControllers/DashboardController.js",
                        "~/Scripts/AngularControllers/ConnectionController.js",
                        "~/Scripts/AngularControllers/IgnitionController.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
