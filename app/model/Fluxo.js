Ext.define('EIA.model.Fluxo', {
    extend: 'Ext.data.Model',
    idProperty  : 'idFluxo',		
    fields: [
    {
       name : 'idFluxo' ,
       type:'int'
    }, 
    {
        name : 'idConta',
	type : 'int'
    }
    , 
    {
        name : 'dsDescricao',
        type : 'string'
    }
    , 
    {
        name : 'nuValor',
	type : 'float'
    }
    , 
    {
        name : 'dtFluxo',
        type : 'date',
        dateFormat:'Y-m-d'
    }
    ]
});