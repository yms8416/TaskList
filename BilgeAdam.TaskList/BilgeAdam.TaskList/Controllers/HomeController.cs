using Microsoft.AspNetCore.Mvc;

namespace BilgeAdam.TaskList.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
