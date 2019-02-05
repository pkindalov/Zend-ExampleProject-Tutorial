Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AP',

    controllers: ['Albums', 'Blogs'],

    appFolder: 'app',

    launch: function() {
    Ext.create('Ext.tab.Panel', {
               renderTo: Ext.getBody(),
               height: 500,
               width: 1600,
               
               items: [{
                  id: 'albumsPanel',      
                  xtype: 'albumlist',
                  title: 'Albums',
                  name: 'albums',
                  listeners:{
                    activate: function(panel) {
                         
                     
//                    panel.getView().refresh();


                      Ext.getCmp('albumsPanel').getView().refresh();
//                      alert('we are here');
                  }
    } 
//                  html: 'To list all albums here',
//                  listeners: {
//                     render: function() {
//                        
//                     },
//                     
//                     activate: function() {
//                         Ext.get('albumsPanel').update('Misho sucks yyyyyy');
//                     }
//                  }
               },
                 {
                        id: 'createAlbumPanel',
                        xtype: 'panel',
                        title: 'Create Album',
                        height: 100,
                        width: '75%',
                        items: [
                             {
                                xtype: 'form',
                                padding: 20,
                                width: 500,
                                items: [
                                    
                                    {
                                        id: 'artist',
                                        padding: 10,
                                        xtype: 'textfield',
                                        name : 'artist',
                                        fieldLabel: 'Artist'
                                    },
                                    {
                                        id: 'title',
                                        padding: 10,
                                        xtype: 'textfield',
                                        name : 'title',
                                        fieldLabel: 'Ttitle'
                                    },
                                    
                                     {
                                        padding: 3,
                                        margin: 10,
                                        xtype: 'button', 
                                        text: 'Create Album',
                                        handler: function(btn) {
                                            let form =  this.up('form');
                                            let values = form.getValues();
                                            let createAlbumUrl = '/album/add';
                                            let data = {
                                                title: values.title,
                                                artist: values.artist,
                                                submit: 'Add',
                                                id: ''
                                            }
                                           
                                              Ext.Ajax.request({
                                                        url: createAlbumUrl,
                                                        method:'POST', 
                                                        headers: {
                                                                            'Content-Type': 'application/x-www-form-urlencoded'
                                                                       }, 

                                                        scope : this,
                                                        params: data
                                              });
//                                              
                                                
//                                                 Ext.getCmp('albumsPanel').setActiveTab('albums');
                                                let tab = Ext.getCmp('albumsPanel');
                                                tab.show();
                                                 
                                                  
                                               
                                                 
                                                
//                                                Ext.get(tabName).show(); 
//                                                  console.log(this.up().up().up().items.items[0].name);
                                        } 
                                    },
                                ],
                            }
                        ],
                        
                        
                        
                },
            ]
            });
            
//            Ext.create('Ext.panel.Panel', {
//                renderTo: Ext.getBody(),
//                width: 1600,
//                height: 500,
//                title: 'Container Panel',
//                items: [
//                   
//                ]
//            });
            
            
    },
    
});


  