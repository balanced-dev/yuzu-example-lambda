using System;
using System.Linq;
using System.Collections.Generic;
using YuzuDelivery.Core;
using YuzuDelivery.Umbraco.Core;
using YuzuDelivery.UmbracoModels;
using YuzuDelivery.ViewModels;

namespace {{namespace}}
{
    public class {{name}} : IYuzuPropertyReplaceResolver<{{source}}, {{destMember}}>
    {
        public {{destMember}} Resolve({{source}} source, UmbracoMappingContext context)
        {

        }
    }
}