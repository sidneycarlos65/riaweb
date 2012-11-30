Ext.define('EIA.model.Conta', {
    extend: 'Ext.data.Model',
    idProperty  : 'idConta',	
    fields: [
    {
        name: 'idConta',
        type: 'int'
    },
	{
        name: 'contaid',
        type: 'int'
    },	
    {
        name: 'dsDescricao',
        type: 'string'
    }
	,	
    {
        name: 'fgTipo',
        type: 'int'
    }
    ]
});