using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Composing;
using YuzuDelivery.Core;
using YuzuDelivery.Umbraco.Blocks;
using YuzuDelivery.Umbraco.Forms;
using YuzuDelivery.Umbraco.Grid;
using YuzuDelivery.Umbraco.Import;
using Lambda.Core.ViewModels;

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

            var config = new YuzuDeliveryImportConfiguration()
            {
                IsActive = ConfigurationManager.AppSettings["YuzuImportActive"] == "true",
                DocumentTypeAssemblies = new Assembly[] { localAssembly },
                ViewModelQualifiedTypeName = "Lambda.Core.ViewModels.{0}, Lambda.Core",
                UmbracoModelsQualifiedTypeName = "Lambda.Core.UmbracoModels.{0}, Lambda.Core",
                DataTypeFolder = new DataTypeFolder()
                {
                    Name = "Lambda",
                    Level = 1
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

            config.IgnoreViewmodels.Add<vmBlock_FormButton>();
            config.IgnoreViewmodels.Add<vmBlock_FormTextArea>();
            config.IgnoreViewmodels.Add<vmBlock_FormTextInput>();

            /*config.IgnoreViewmodels.Add("vmBlock_FormBuilder");
            config.IgnoreViewmodels.Add("vmBlock_FormFooter");
            config.IgnoreViewmodels.Add("vmBlock_FormButton");
            config.IgnoreViewmodels.Add("vmBlock_FormTextArea");
            config.IgnoreViewmodels.Add("vmBlock_FormTextInput");
            config.IgnoreViewmodels.Add("vmBlock_FormSelect");

            config.IgnoreViewmodels.Add("vmBlock_DataGridRows");

            config.IgnoreViewmodels.Add("vmBlock_FormBuilderFields");*/

            config.IgnoreProperties.Add("Form");

            YuzuDeliveryImport.Initialize(config);
        }

    }

}
