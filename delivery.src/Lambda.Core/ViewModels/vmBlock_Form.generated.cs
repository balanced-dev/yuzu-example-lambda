using AutoMapper;
using Lambda.Core.UmbracoModels;
using YuzuDelivery.Umbraco.Grid;
using YuzuDelivery.Umbraco.Forms;
using YuzuDelivery.Umbraco.Blocks;
//----------------------
// <auto-generated>
//     Generated using the NJsonSchema v9.13.35.0 (Newtonsoft.Json v9.0.0.1) (http://NJsonSchema.org)
// </auto-generated>
//----------------------

namespace Lambda.Core.ViewModels
{
    #pragma warning disable // Disable all warnings

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.35.0 (Newtonsoft.Json v9.0.0.1)")]
    public partial class vmBlock_Form 
    {
        [Newtonsoft.Json.JsonProperty("testForm", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public object TestForm { get; set; }
    
        [Newtonsoft.Json.JsonProperty("liveForm", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string LiveForm { get; set; }
    
        [Newtonsoft.Json.JsonProperty("_ref", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string _ref { get; set; }
    
        public string ToJson() 
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }
    
        public static vmBlock_Form FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<vmBlock_Form>(data);
        }
    
    }
}