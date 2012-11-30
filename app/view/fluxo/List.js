Ext.require(['EIA.view.fluxo.ComboRenderer']);
Ext.require(['EIA.view.AbstractList']);

Ext.define('EIA.view.fluxo.List' ,{
    extend		: 'EIA.view.AbstractList',
    alias 		: 'widget.fluxoList',
    store		: 'Fluxos',
    title 		: 'Lista de Fluxos', 
    selModel 	: Ext.create('Ext.selection.CheckboxModel'),	
    initComponent: function(){

        this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Código',  
            dataIndex: 'idFluxo',  
            flex: 1
        }				
        , 
        {
            header      : 'Conta',  
            dataIndex	: 'idConta',  
            flex	: 1,
            renderer	: Ext.util.Format.comboRenderer(Ext.create('EIA.view.fluxo.ComboRenderer'))
        },        
        {
            header: 'Descricao',  
            dataIndex: 'dsDescricao',  
            flex: 1
        }
        ,         
        {
            header: 'Valor',  
            dataIndex: 'nuValor',  
            flex: 1
        }
        ,
        {
            header	: 'Data transacao',  
            dataIndex	: 'dtFluxo',  
            flex	: 1, 
            xtype	: 'datecolumn', 
            format	: 'd/m/Y'
        } 			
        ]; 
		
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Fluxos',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});