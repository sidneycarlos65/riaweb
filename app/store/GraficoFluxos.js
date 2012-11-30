Ext.define('EIA.store.GraficoFluxos', {
    extend		: 'Ext.data.Store',
    autoLoad	: false,
    fields		: ['total', 'conta'],
    remoteSort	: false,
    proxy: {
        type: 'ajax',
        url: '/node/graficoFluxos',
        reader: {
            type			: 'json',
            root			: 'data',
            successProperty	: 'success'
        }
    }
});
