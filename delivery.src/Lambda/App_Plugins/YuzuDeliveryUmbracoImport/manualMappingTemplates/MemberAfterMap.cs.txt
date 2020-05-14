using System;
using System.Linq;
using System.Collections.Generic;
using YuzuDelivery.Core;
using YuzuDelivery.Umbraco.Core;
using YuzuDelivery.ViewModels;
using YuzuDelivery.UmbracoModels;

namespace {{namespace}}
{   
    public class {{name}} : IYuzuPropertyAfterResolver<{{source}}, {{destMember}}>
    {
        public {{destMember}} Apply({{destMember}} value)
        {
			return value;
        }
    }
}