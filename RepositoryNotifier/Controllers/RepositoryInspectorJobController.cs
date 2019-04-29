using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RepositoryNotifier.DTO;
using RepositoryNotifier.Helper;
using RepositoryNotifier.Persistence;
using RepositoryNotifier.Persistence.RepositoryInspectorJob;
using RepositoryNotifier.Service;
using RepositoryNotifier.Service.RepositoryInspector;

namespace RepositoryNotifier.Controllers
{

    [Route("api/[controller]/[action]/")]
    public class RepositoryInspectorJobController : Controller
    {

        private IRepositoryInspectorJobService _repositoryInspectorService { get; }
        private ILogger<RepositoryInspectorJobController> _logger { get; set; }
        public RepositoryInspectorJobController(IRepositoryInspectorJobService p_RepositoryInspectorCrudService, ILogger<RepositoryInspectorJobController> p_logger)
        {
            _repositoryInspectorService = p_RepositoryInspectorCrudService;
            _logger = p_logger;
        }

        [HttpGet]
        public IActionResult AlreadyCreated([FromQuery(Name = "frequency")] RepositoryInspectorJobFrequency p_frequency)
        {
            bool alreadyCreated =
                _repositoryInspectorService.GetRepositoryInspectorJob(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Name)
                    ?.Value, p_frequency) != null;

            if (alreadyCreated) return Ok();
            return NotFound();
        }

        [HttpPost]
        public IActionResult CreateRepositoryInspectorJob([FromBody] CreateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {
            if (_repositoryInspectorService.RepositoryInspectorJobExists(p_repositoryInspectorJob.Username, p_repositoryInspectorJob.Frequency))
                return Conflict();

            RepositoryInspectorJob job = _repositoryInspectorService.CreateRepositoryInspectorJob(p_repositoryInspectorJob);

            if (job != null && job.Id != null)
            {
                return Ok();
            }

            _logger.LogError("Could not add RepositoryInspectorJob: {RepositoryInspectorJob} for User: {User}", p_repositoryInspectorJob, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpDelete]
        public IActionResult DeleteRepositoryInspectorJob([FromQuery(Name = "frequency")]RepositoryInspectorJobFrequency p_frequency)
        {
            string username = AuthHelper.GetLogin(HttpContext);
            bool success = _repositoryInspectorService.DeleteRepositoryInspectorJob(username, p_frequency);

            if (success)
            {
                return Ok();
            }

            _logger.LogError("Could not delete RepositoryInspectorJob with Frequency: {Frequency} for User: {User}", p_frequency, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetAllRepositoryInspectorJobs()
        {
            string username = AuthHelper.GetLogin(HttpContext);
            IList<RepositoryInspectorJob> repositoryInspectorJobs = _repositoryInspectorService.GetAllRepositoryInspectorJobs(username).ToList();
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
            IList<string> commonKeywords = _repositoryInspectorService.GetCommonKeywords(5).ToList();

            if (commonKeywords != null && commonKeywords.Count > 1)
            {
                return Ok(commonKeywords);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateRepositoryInspectorJob([FromBody]UpdateRepositoryInspectorJobTO p_repositoryInspectorJob)
        {
            bool success = _repositoryInspectorService.UpdateRepositoryInspectorJob(p_repositoryInspectorJob);

            if (success)
            {
                return Ok();
            }

            _logger.LogError("Could not update RepositoryInspectorJobs {RepositoryInspectorJob} for User: {User}", p_repositoryInspectorJob, AuthHelper.GetLogin(HttpContext));
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetRepositoryInspectorJobResults([FromQuery(Name = "frequency")] RepositoryInspectorJobFrequency p_frequency)
        {
            string username = AuthHelper.GetLogin(HttpContext);
            IList<RepositoryInspectorJobResult> results = _repositoryInspectorService.GetRepositoryInspectorJobResults(username, p_frequency);
            IList<RepositoryInspectorJobResultTO> resultTOs = results.Select<RepositoryInspectorJobResult, RepositoryInspectorJobResultTO>(result =>
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