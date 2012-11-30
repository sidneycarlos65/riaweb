Ext.require(['EIA.view.AbstractForm']);
Ext.require(['EIA.view.AbstractWindow']);

Ext.define('EIA.view.conta.Edit', {
    extend: 'EIA.view.AbstractWindow',
    alias : 'widget.contaEdit',
    title : 'Edição de Conta',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [{
                name : 'dsDescricao',
                fieldLabel: 'Descrição'				
            }			
            ]
            }
        ];
        this.callParent(arguments);
    }
});