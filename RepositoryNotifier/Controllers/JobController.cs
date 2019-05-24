using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.Job;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.Job;

namespace RepositoryNotifier.Controllers
{

    [Route("api/[controller]/[action]/")]
    public class JobController : Controller
    {

        private IJobService Service { get; }
        private ILogger<JobController> _logger { get; set; }
        public JobController(IJobService p_crudService, ILogger<JobController> p_logger)
        {
            Service = p_crudService;
            _logger = p_logger;
        }

        [HttpGet]
        public IActionResult AlreadyCreated([FromQuery(Name = "frequency")] JobFrequency p_frequency)
        {
            bool alreadyCreated =
                Service.GetJob(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Name)
                    ?.Value, p_frequency) != null;

            if (alreadyCreated) return Ok();
            return NotFound();
        }

        [HttpPost]
        public IActionResult CreateJob([FromBody] CreateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {
            if (Service.JobExists(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Frequency))
                return Conflict();

            Job job = Service.CreateJob(p_repositoryInspectorJob);

            if (job != null && job.Id != null)
            {
                return Ok();
            }

            _logger.LogError("Could not add RepositoryInspectorJob: {RepositoryInspectorJob} for User: {User}", p_repositoryInspectorJob, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpDelete]
        public IActionResult DeleteJob([FromQuery(Name = "frequency")]JobFrequency p_frequency)
        {
            string username = AuthHelper.GetLogin(HttpContext);
            bool success = Service.DeleteJob(username, p_frequency);

            if (success)
            {
                return Ok();
            }

            _logger.LogError("Could not delete RepositoryInspectorJob with Frequency: {Frequency} for User: {User}", p_frequency, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetAllJobs()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            IList<Job> repositoryInspectorJobs = Service.GetAllJobs(username).ToList();
            if (repositoryInspectorJobs != null && repositoryInspectorJobs.Count > 0)
            {
                return Ok(repositoryInspectorJobs);
            }

            _logger.LogError("Could not get all RepositoryInspectorJobs for User: {User}", AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetCommonKeywords()
        {
            IList<string> commonKeywords = Service.GetCommonKeywords(5).ToList();

            if (commonKeywords != null && commonKeywords.Count > 1)
            {
                return Ok(commonKeywords);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateJob([FromBody]UpdateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {
            bool success = Service.UpdateJob(p_repositoryInspectorJob);

            if (success)
            {
                return Ok();
            }

            _logger.LogError("Could not update RepositoryInspectorJobs {RepositoryInspectorJob} for User: {User}", p_repositoryInspectorJob, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetJobResults([FromQuery(Name = "frequency")] JobFrequency p_frequency)
        {
            string username = AuthHelper.GetLogin(HttpContext);
            IList<JobResult> results = Service.GetJobResults(username, p_frequency);
            IList<RepositoryInspectorJobResultTO> resultTOs = results.Select<JobResult, RepositoryInspectorJobResultTO>(result =>
            {
                return new RepositoryInspectorJobResultTO()
                {
                    Name = result.Name,
                    CreatedAt = result.CreatedAt,
                    Path = result.Path,
                    Url = result.HtmlUrl,
                    RepositoryName = result.Repository.Name
                };
            }).ToList();

            if (resultTOs != null && resultTOs.Count > 0)
            {
                return Ok(resultTOs);
            }

            return BadRequest();
        }
    }
}