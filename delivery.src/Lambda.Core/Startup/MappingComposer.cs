using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Umbraco.Core;
using Umbraco.Core.Composing;
using YuzuDelivery.Umbraco.Blocks;
using YuzuDelivery.Umbraco.Grid;
using YuzuDelivery.Umbraco.Forms;
using AutoMapper.Configuration;
using Lambda.Core.UmbracoModels;
using Lambda.Core.ViewModels;

namespace Lambda.Core
{
    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    public class MappingComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            var cfg = new MapperConfigurationExpression();
            cfg.AddMaps(typeof(MappingComposer));
            cfg.AddMaps(typeof(YuzuStartup));
            cfg.AddMaps(typeof(YuzuFormsStartup));

            cfg.AddGridWithRows<Home, vmPage_Home>(src => src.Grid, dest => dest.Grid);

            cfg.AddForm<Cta, vmBlock_Cta>(src => src.Form, dest => dest.Form);

            var mapperConfig = new MapperConfiguration(cfg);

            composition.Register<IMapper>(new Mapper(mapperConfig));
        }
    }
}
