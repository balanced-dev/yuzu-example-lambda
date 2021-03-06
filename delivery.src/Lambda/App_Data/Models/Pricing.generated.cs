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
	/// <summary>Pricing</summary>
	[PublishedModel("pricing")]
	public partial class Pricing : PublishedElementModel
	{
		// helpers
#pragma warning disable 0109 // new is redundant
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public new const string ModelTypeAlias = "pricing";
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public new static IPublishedContentType GetModelContentType()
			=> PublishedModelUtility.GetModelContentType(ModelItemType, ModelTypeAlias);
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		public static IPublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<Pricing, TValue>> selector)
			=> PublishedModelUtility.GetModelPropertyType(GetModelContentType(), selector);
#pragma warning restore 0109

		// ctor
		public Pricing(IPublishedElement content)
			: base(content)
		{ }

		// properties

		///<summary>
		/// Items
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("items")]
		public global::System.Collections.Generic.IEnumerable<global::YuzuDelivery.UmbracoModels.PricingItem> Items => this.Value<global::System.Collections.Generic.IEnumerable<global::YuzuDelivery.UmbracoModels.PricingItem>>("items");

		///<summary>
		/// Reasons
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("reasons")]
		public global::System.Collections.Generic.IEnumerable<global::YuzuDelivery.UmbracoModels.PricingReason> Reasons => this.Value<global::System.Collections.Generic.IEnumerable<global::YuzuDelivery.UmbracoModels.PricingReason>>("reasons");

		///<summary>
		/// Subtitle
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("subtitle")]
		public string Subtitle => this.Value<string>("subtitle");

		///<summary>
		/// Text
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("text")]
		public string Text => this.Value<string>("text");

		///<summary>
		/// Title
		///</summary>
		[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Umbraco.ModelsBuilder", "8.6.1")]
		[ImplementPropertyType("title")]
		public string Title => this.Value<string>("title");
	}
}
