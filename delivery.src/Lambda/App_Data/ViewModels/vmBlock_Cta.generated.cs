using YuzuDelivery.Umbraco.Core;
using YuzuDelivery.Umbraco.Forms;
using YuzuDelivery.Umbraco.Grid;
//----------------------
// <auto-generated>
//     Generated using the NJsonSchema v10.0.23.0 (Newtonsoft.Json v12.0.0.0) (http://NJsonSchema.org)
// </auto-generated>
//----------------------

namespace YuzuDelivery.ViewModels
{
    #pragma warning disable // Disable all warnings

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.0.23.0 (Newtonsoft.Json v12.0.0.0)")]
    [YuzuMap("Cta")]
    public partial class vmBlock_Cta 
    {
        [Newtonsoft.Json.JsonProperty("title", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Title { get; set; }
    
        [Newtonsoft.Json.JsonProperty("text", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Text { get; set; }
    
        [Newtonsoft.Json.JsonProperty("form", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public vmBlock_DataForm Form { get; set; }
    
        [Newtonsoft.Json.JsonProperty("backgroundImage", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public vmBlock_DataImage BackgroundImage { get; set; }
    
        [Newtonsoft.Json.JsonProperty("_ref", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string _ref { get; set; }
    
        [Newtonsoft.Json.JsonProperty("_modifiers", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.List<string> _modifiers { get; set; }
    
    
    }
}