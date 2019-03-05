Ext.define('AP.view.albums.ListAlbums', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.albumlist',
    scrollable: true,
    height: 750,
    title: 'All Albums',
    store: 
        'albumsStore',

    
//    model: 'Album',
    
//   
//   controller: ['AP.controller.Albums'],

     

    
    initComponent:  function() {
//        this.fireEvent('albums.loadData');
//        Ext.create('AP.store.Albums').load();
            
        
        var store =  Ext.create('Ext.data.Store', {
            storeId: 'albumsStore',
            
            // fields: ['id', 'artist', 'title'],
            fields: ['id', 'title', 'song.title', 'name'],
            autoLoad: false,
            
             proxy: {
                type: 'ajax',
                url: '/getAlbums',
                reader: {
                    type: 'json',
                    root: 'data',
                    successProperty: 'success'
                },
                 writer: {
                    type: 'json',
                    writeAllFields : false,  //just send changed fields
                    allowSingle :false      //always wrap in an array
                   // nameProperty: 'mapping'
               }
    }
           
        }).load();
        
        
          
        this.columns = [
            {header: 'Id', dataIndex: 'id', flex: 0},
            // {header: 'Artist',  dataIndex: 'artist',  flex: 1},
            {header: 'Song',  dataIndex: 'title',  flex: 1},
            {header: 'Title', dataIndex: 'title', flex: 1},
            {header: 'Artist', dataIndex: 'name', flex: 1},
        ];
        
        
        this.buttons = [
           {
                text: 'Create',
                action: 'create',
                margin: '30 1350 0 0',
                handler: function(button) {        
//                    this.fireEvent('albums.create', button);
                        Ext.create('AP.view.albums.CreateEditAlbumForm').show();
                }
            }, 
        ]
        
      
        
       
        this.callParent(arguments);
//        this.down('form').loadRecord(record);
       
      
    },
    
    
    
   
    
//      listeners: {
//             itemdblclick: function() {
//                 alert('uuuuu');
//             }
//      },

        listeners: {
            itemdblclick: function (grid, record) {
//                 this.fireEvent('albums.edit',grid, record);

            var that = this;
//            console.log("This in edit method is ");
//            console.log(that);


            var view = Ext.create('AP.view.albums.CreateEditAlbumForm', {
                record: record,
                store: 'albumStore',

            }).show();

            var form = view.down('form');
            form.loadRecord(record);
        }
    }
     
    
    
//    edit: function(rec) {
//        let that = this;
//        Ext.create('AP.view.albums.Edit', {
//            myRecord: rec,
//            stor: that.down('grid').getStore()
//        })
//    },
    
    
    
    
});

