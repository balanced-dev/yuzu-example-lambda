using System;
using System.Linq;
using System.Collections.Generic;
using YuzuDelivery.Core;
using YuzuDelivery.Umbraco.Core;
using YuzuDelivery.ViewModels;
using YuzuDelivery.UmbracoModels;

namespace {{namespace}}
{
    public class {{name}} : IYuzuTypeConvertor<{{source}}, {{dest}}>
    {
        public {{dest}} Convert({{source}} source, UmbracoMappingContext context)
        {

        }
    }
}