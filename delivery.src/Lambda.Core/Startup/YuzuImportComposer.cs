using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Composing;
using YuzuDelivery.Umbraco.Blocks;
using YuzuDelivery.Umbraco.Grid;
using YuzuDelivery.Umbraco.Import;

namespace Lambda.Core
{

    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    [ComposeBefore(typeof(YuzuStartup))]
    public class YuzuImportsComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            var Server = HttpContext.Current.Server;
            var localAssembly = Assembly.GetAssembly(typeof(YuzuImportsComposer));
            var gridAssembly = Assembly.GetAssembly(typeof(YuzuGridStartup));

            var config = new YuzuDeliveryImportConfiguration()
            {
                ViewModelAssemblies = new Assembly[] { localAssembly, gridAssembly },
                ViewModelQualifiedTypeName = "Lambda.Core.ViewModels.{0}, Lambda.Core",
                UmbracoModelsQualifiedTypeName = "Lambda.Core.UmbracoModels.{0}, Lambda.Core",
                DataTypeFolder = new DataTypeFolder()
                {
                    Name = "Lambda",
                    Level = 1
                },
                PathLocations = new List<IDataLocation>()
                {
                    new DataLocation()
                    {
                        Name = "Main",
                        Path = Server.MapPath(ConfigurationManager.AppSettings["HandlebarsPaths"])
                    }
                },
                DataLocations = new List<IDataLocation>()
                {
                    new DataLocation()
                    {
                        Name = "Main",
                        Path = Server.MapPath(ConfigurationManager.AppSettings["HandlebarsData"])
                    }
                },
                ImageLocations = new List<IDataLocation>()
                {
                    new DataLocation()
                    {
                        Name = "Main",
                        Path = Server.MapPath(ConfigurationManager.AppSettings["HandlebarsImages"])
                    }
                },
                CustomConfigFileLocation = Server.MapPath(ConfigurationManager.AppSettings["YuzuImportCustomConfig"])
            };

            config.IgnoreViewmodels.Add("vmBlock_Form");
            config.IgnoreViewmodels.Add("vmBlock_FormBuilder");
            config.IgnoreViewmodels.Add("vmBlock_FormFooter");
            config.IgnoreViewmodels.Add("vmBlock_FormButton");
            config.IgnoreViewmodels.Add("vmBlock_FormTextArea");
            config.IgnoreViewmodels.Add("vmBlock_FormTextInput");
            config.IgnoreViewmodels.Add("vmBlock_FormSelect");

            config.IgnoreViewmodels.Add("vmBlock_SectionGridConfig");
            config.IgnoreViewmodels.Add("vmBlock_FormBuilderFields");

            config.IgnoreProperties.Add("Form");
            config.IgnoreProperties.Add("Endpoints");
            config.IgnoreProperties.Add("NextPageEndpoint");

            YuzuDeliveryImport.Initialize(config);
        }

    }

}
