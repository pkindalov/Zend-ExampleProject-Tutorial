Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AP',

    controllers: ['AP.controller.Albums'],

    appFolder: 'app',

    launch: function() {
//    var that = this;    
        
    Ext.create('Ext.container.Viewport', {
               renderTo: Ext.getBody(),
               height: 1600,
               width: 1600,
             
               items: [
                   {
                       xtype: 'button',
                       text: 'Show Albums',
                       scale: 'large',
                       width: 1500,
                       region: 'south',
                       handler: function() {
                            this.fireEvent('albums.list');
                       }
//                       margin: '747 0 0 0',
//                       listeners: {
//                               click: function () {
//                                    
//                                    
////                                   Ext.create('Ext.container.Viewport', {
////                                       renderTo: Ext.getBody(),
////                                       height: 1600,
////                                       width: 1600,
////                                       
////                                       items: [
////                                           
////                                               Ext.create('AP.view.albums.ListAlbums', {
////                                                renderTo: Ext.getBody(),
////                                                height: 1600,
////                                                width: 1600,
////                                        
////                                        
////                                                })
////                                           
////                                       ]
////                                    
////                                   })
//                               }
//                           }
                   }
                   
                   
               ]
            });
            
          
            
            
    },
    
});





  