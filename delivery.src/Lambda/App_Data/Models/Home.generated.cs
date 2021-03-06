//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder v8.6.1
//
//   Changes to this file will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Umbraco.ModelsBuilder.Embedded;

namespace YuzuDelivery.UmbracoModels
{
	/// <summary>Home</summary>
	[PublishedModel("home")]
	public partial class Home : PublishedContentModel
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public new const string ModelTypeAlias = "home";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public new static IPublishedContentType GetModelContentType()
			=> PublishedModelUtility.GetModelContentType(ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<Home, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(), selector);
#pragma warning restore 0109

		// ctor
		public Home(IPublishedContent content)
			: base(content)
		{ }

		// properties

		///<summary>
		/// Body
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("body")]
		public global::Skybrud.Umbraco.GridData.GridDataModel Body => this.Value<global::Skybrud.Umbraco.GridData.GridDataModel>("body");

		///<summary>
		/// Nav Areas
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("footerNavAreas")]
		public global::System.Collections.Generic.IEnumerable<global::YuzuDelivery.UmbracoModels.SiteFooterNavArea> FooterNavAreas => this.Value<global::System.Collections.Generic.IEnumerable<global::YuzuDelivery.UmbracoModels.SiteFooterNavArea>>("footerNavAreas");

		///<summary>
		/// Social Links
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("footerSocialLinks")]
		public global::System.Collections.Generic.IEnumerable<global::Umbraco.Web.Models.Link> FooterSocialLinks => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Web.Models.Link>>("footerSocialLinks");

		///<summary>
		/// Footer Text
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("footerText")]
		public string FooterText => this.Value<string>("footerText");

		///<summary>
		/// Footer Title
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("footerTitle")]
		public string FooterTitle => this.Value<string>("footerTitle");

		///<summary>
		/// Company Name
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("headerCompanyName")]
		public string HeaderCompanyName => this.Value<string>("headerCompanyName");

		///<summary>
		/// Sign Up
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("headerSignUp")]
		public global::Umbraco.Web.Models.Link HeaderSignUp => this.Value<global::Umbraco.Web.Models.Link>("headerSignUp");

		///<summary>
		/// Nav Links
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("navNavLinks")]
		public global::System.Collections.Generic.IEnumerable<global::Umbraco.Web.Models.Link> NavNavLinks => this.Value<global::System.Collections.Generic.IEnumerable<global::Umbraco.Web.Models.Link>>("navNavLinks");
	}
}
