﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication_dataflow.Controllers.Users
{
    public abstract class UserController : Controller
    {
        public ActionResult ControlPanel()
        {
            return View();
        }
    }
}