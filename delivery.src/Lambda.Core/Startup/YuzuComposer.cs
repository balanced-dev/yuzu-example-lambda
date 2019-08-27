using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Core;
using Umbraco.Core.Composing;
using YuzuDelivery.Umbraco.Blocks;

namespace Lambda.Core
{

    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    [ComposeBefore(typeof(YuzuStartup))]
    public class YuzuComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            var Server = HttpContext.Current.Server;

            Yuzu.Initialize(new YuzuConfiguration()
            {
                TemplateLocations = new List<ITemplateLocation>()
                {
                    new TemplateLocation()
                    {
                        Name = "Pages",
                        Path = Server.MapPath(ConfigurationManager.AppSettings["HandlebarsTemplates"]),
                        RegisterAllAsPartials = false,
                        SearchSubDirectories = false
                    },
                    new TemplateLocation()
                    {
                        Name = "Partials",
                        Path = Server.MapPath(ConfigurationManager.AppSettings["HandlebarsPartials"]),
                        RegisterAllAsPartials = true,
                        SearchSubDirectories = true
                    }
                },
                GetTemplatesCache = GetTemplatesCache,
                SetTemplatesCache = SetTemplatesCache,
                GetRenderedHtmlCache = GetRenderedHtmlCache,
                SetRenderedHtmlCache = SetRenderedHtmlCache
            });
        }

        private Dictionary<string, Func<object, string>> GetTemplatesCache()
        {
            return Current.AppCaches.RuntimeCache.Get("feTemplates") as Dictionary<string, Func<object, string>>;
        }

        private Dictionary<string, Func<object, string>> SetTemplatesCache()
        {
            var templateService = DependencyResolver.Current.GetService<IYuzuDefinitionTemplateSetup>();
            return Current.AppCaches.RuntimeCache.Get("feTemplates", () => templateService.RegisterAll()) as Dictionary<string, Func<object, string>>;
        }

        private string GetRenderedHtmlCache(IRenderSettings settings)
        {
            return Current.AppCaches.RuntimeCache.Get(settings.CacheName) as string;
        }

        private void SetRenderedHtmlCache(IRenderSettings settings, string html)
        {
            Current.AppCaches.RuntimeCache.Insert(settings.CacheName, () => { return html; }, new TimeSpan(0, 0, settings.CacheExpiry));
        }
    }

}
