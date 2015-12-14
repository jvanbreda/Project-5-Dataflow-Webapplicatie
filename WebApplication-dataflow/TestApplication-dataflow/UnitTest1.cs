using System;
using System.Diagnostics;
using Microsoft.VisualStudio.TestTools.UnitTesting;
//change
namespace TestApplication_dataflow
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void ShouldReturnTrue()
        {
            bool result = true;
            Assert.IsTrue(result);
            if (result) {
                Trace.Listeners.Add(new TextWriterTraceListener("test.log", "myListener"));
                Trace.TraceInformation("Test passed!");
                Trace.Flush();
                
            }
        }
    }
}
