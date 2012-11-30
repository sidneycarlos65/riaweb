Ext.define('EIA.view.fluxo.Combo', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.fluxoCombo',
    name 			: 'idConta',
    fieldLabel		: 'Conta',
    store			: 'Contas',
    displayField	: 'dsDescricao',
    valueField		: 'idConta',
    queryMode		: 'local',
    typeAhead		: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
    }
});