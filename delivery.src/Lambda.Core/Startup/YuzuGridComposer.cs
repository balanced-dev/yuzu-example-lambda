using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Linq;
using Umbraco.Core;
using Umbraco.Core.Composing;
using YuzuDelivery.Umbraco.Grid;

namespace Lambda.Core
{

    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    [ComposeBefore(typeof(YuzuGridStartup))]
    public class YuzuGridComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            var assembly = Assembly.GetAssembly(typeof(YuzuGridComposer));

            var config = new YuzuDeliveryGridConfiguration()
            {
                UmbracoModelsAssembly = assembly
            };

            var types = assembly.GetTypes().Where(x => x.GetInterfaces().Any(y => y == typeof(IGridItem)));
            foreach (var f in types)
            {
                composition.Register(typeof(IGridItem), f);
            }

            YuzuDeliveryGrid.Initialize(config);
        }
    }

}
