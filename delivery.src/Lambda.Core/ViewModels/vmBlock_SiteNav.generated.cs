using AutoMapper;
using YuzuDelivery.Umbraco.Grid;
using YuzuDelivery.Umbraco.Forms;
using YuzuDelivery.Umbraco.Blocks;
using Lambda.Core.UmbracoModels;
//----------------------
// <auto-generated>
//     Generated using the NJsonSchema v10.0.23.0 (Newtonsoft.Json v9.0.0.1) (http://NJsonSchema.org)
// </auto-generated>
//----------------------

namespace Lambda.Core.ViewModels
{
    #pragma warning disable // Disable all warnings

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.0.23.0 (Newtonsoft.Json v9.0.0.1)")]
    [AutoMap(typeof(SiteNav))]
    public partial class vmBlock_SiteNav 
    {
        [Newtonsoft.Json.JsonProperty("navLinks", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.List<vmBlock_DataLink> NavLinks { get; set; }
    
        [Newtonsoft.Json.JsonProperty("_ref", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string _ref { get; set; }
    
        [Newtonsoft.Json.JsonProperty("_modifiers", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.List<string> _modifiers { get; set; }
    
    
    }
}