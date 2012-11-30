Ext.require(['EIA.view.AbstractList']);

Ext.define('EIA.view.conta.List' ,{
    extend			: 'EIA.view.AbstractList',
    alias 			: 'widget.contaList',
    store			: 'Contas',
    title 			: 'Lista das Contas',         
    selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

        this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Código',  
            dataIndex: 'idConta',  
            flex: 1
        },

        {
            header: 'Nome',  
            dataIndex: 'dsDescricao',  
            flex: 1
        },
        {
            header		: 'Conta Pai',  
            dataIndex	: 'contaId_idConta',  
            flex		: 1,
            renderer	: Ext.util.Format.comboRenderer(Ext.create('EIA.view.fluxo.ComboRenderer'))        
        },   
        ]; 
		
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Contas',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});