Ext.define('AP.view.albums.ListAlbums', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.albumlist',
    
    title: 'All Albums',
    store: 'Albums',
    
   
    
    initComponent: function() {
        
        this.columns = [
            {header: 'Id', dataIndex: 'id', flex: 0},
            {header: 'Artist',  dataIndex: 'artist',  flex: 1},
            {header: 'Title', dataIndex: 'title', flex: 1}
        ];
        
       
        this.callParent(arguments);
    }
    
    
});


