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
    [AutoMap(typeof(SiteFooter))]
    public partial class vmBlock_SiteFooter 
    {
        [Newtonsoft.Json.JsonProperty("title", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Title { get; set; }
    
        [Newtonsoft.Json.JsonProperty("text", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Text { get; set; }
    
        [Newtonsoft.Json.JsonProperty("navAreas", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.List<vmSub_SiteFooterNavArea> NavAreas { get; set; }
    
        [Newtonsoft.Json.JsonProperty("socialLinks", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.List<vmSub_SiteFooterSocialLink> SocialLinks { get; set; }
    
        [Newtonsoft.Json.JsonProperty("_ref", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string _ref { get; set; }
    
        public string ToJson() 
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }
    
        public static vmBlock_SiteFooter FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<vmBlock_SiteFooter>(data);
        }
    
    }
    
    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.35.0 (Newtonsoft.Json v9.0.0.1)")]
    [AutoMap(typeof(SiteFooterNavArea))]
    public partial class vmSub_SiteFooterNavArea 
    {
        [Newtonsoft.Json.JsonProperty("title", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Title { get; set; }
    
        [Newtonsoft.Json.JsonProperty("navLinks", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.List<vmSub_SiteFooterNavLink> NavLinks { get; set; }
    
        public string ToJson() 
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }
    
        public static vmSub_SiteFooterNavArea FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<vmSub_SiteFooterNavArea>(data);
        }
    
    }
    
    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.35.0 (Newtonsoft.Json v9.0.0.1)")]
    [AutoMap(typeof(SiteFooterSocialLink))]
    public partial class vmSub_SiteFooterSocialLink 
    {
        [Newtonsoft.Json.JsonProperty("link", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public vmBlock_DataLink Link { get; set; }
    
        public string ToJson() 
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }
    
        public static vmSub_SiteFooterSocialLink FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<vmSub_SiteFooterSocialLink>(data);
        }
    
    }
    
    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "9.13.35.0 (Newtonsoft.Json v9.0.0.1)")]
    [AutoMap(typeof(SiteFooterNavLink))]
    public partial class vmSub_SiteFooterNavLink 
    {
        [Newtonsoft.Json.JsonProperty("link", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public vmBlock_DataLink Link { get; set; }
    
        public string ToJson() 
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this);
        }
    
        public static vmSub_SiteFooterNavLink FromJson(string data)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<vmSub_SiteFooterNavLink>(data);
        }
    
    }
}