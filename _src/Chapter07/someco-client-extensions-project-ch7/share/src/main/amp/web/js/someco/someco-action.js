if (typeof SomeCo == "undefined" || !SomeCo) {
	var SomeCo = {};
}

/**
 * RuleConfigActionCustom.
 * 
 * @namespace SomeCo
 * @class SomeCo.RuleConfigActionCustom
 */
(function() {

	/**
	 * YUI Library aliases
	 */
	var Dom = YAHOO.util.Dom, Selector = YAHOO.util.Selector, Event = YAHOO.util.Event;

	/**
	 * Alfresco Slingshot aliases
	 */
	var $html = Alfresco.util.encodeHTML, $hasEventInterest = Alfresco.util.hasEventInterest;

	SomeCo.RuleConfigActionCustom = function(htmlId) {
		SomeCo.RuleConfigActionCustom.superclass.constructor.call(this, htmlId);

		// Re-register with our own name
		this.name = "SomeCo.RuleConfigActionCustom";
		Alfresco.util.ComponentManager.reregister(this);

		// Instance variables
		this.customisations = YAHOO.lang.merge(this.customisations, SomeCo.RuleConfigActionCustom.superclass.customisations);
		this.renderers = YAHOO.lang.merge(this.renderers, SomeCo.RuleConfigActionCustom.superclass.renderers);

		return this;
	};

	YAHOO.extend(SomeCo.RuleConfigActionCustom, Alfresco.RuleConfigAction, {

		/**
		 * CUSTOMISATIONS
		 */

		customisations : {
			MoveReplaced : {
				text : function(configDef, ruleConfig, configEl) {
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";

					return configDef;
				},
				edit : function(configDef, ruleConfig, configEl) {
					// Hide parameters since we are using a custom ui
					this._hideParameters(configDef.parameterDefinitions);

					// Make parameter renderer create a "Destination" button
					// that displays an destination folder browser
					configDef.parameterDefinitions.splice(0, 0, {
						type : "arca:destination-dialog-button",
						displayLabel : this.msg("label.to"),
						_buttonLabel : this.msg("button.select-folder"),
						_destinationParam : "destination-folder"
					});

					return configDef;
				}
			}
		},

	});

})();