using AutoMapper;
using System;
using System.Linq;
using System.Reflection;
using Umbraco.Core;
using Umbraco.Core.Composing;
using YuzuDelivery.Core;
using YuzuDelivery.Core.ViewModelBuilder;
using YuzuDelivery.Umbraco.Core;
using YuzuDelivery.Umbraco.Import;
using YuzuDelivery.UmbracoModels;
using YuzuDelivery.ViewModels;
using YuzuDelivery.Umbraco.Grid;
using YuzuDelivery.Umbraco.Forms;

namespace Lambda.Yuzu
{
    public class GridProfile : Profile
    {
        public GridProfile(IYuzuDeliveryImportConfiguration config)
        {
            config.IgnoreUmbracoModelsForAutomap.Add<Home>();

            this.AddGridWithRows<Home, vmPage_Home>(x => x.Body, y => y.Body);
        }
    }

    public class FormProfile : Profile
    {
        public FormProfile(IYuzuDeliveryImportConfiguration config)
        {
            config.IgnoreUmbracoModelsForAutomap.Add<Cta>();

            this.AddForm<Cta, vmBlock_Cta>(x => x.Form, y => y.Form);
        }
    }
} 