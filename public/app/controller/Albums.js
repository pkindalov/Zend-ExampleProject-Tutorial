Ext.define('AP.controller.Albums', {
    extend: 'Ext.app.Controller',
    
    stores: [
        'Albums'
    ],
    
    models: [
        'Album'
    ],
    
    views: [
        'albums.ListAlbums',
        'albums.Edit'
    ],
    
    init: function() {
       
         this.control({
            'albumlist': {
               itemdblclick: this.editAlbum
            },
            'albumedit button[action=save]': {
                click: this.updateAlbum
            },
            'albumedit button[action=delete]': {
                click: this.deleteAlbum
            }
        });
    },
    
     editAlbum: function(grid, record) {
         let view = Ext.widget('albumedit');
         
         view.down('form').loadRecord(record);
    },
    
    updateAlbum: function(button){
//        alert('Clicked the Save button');
        let win = button.up('window'),
       
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();

//        console.log(record);
//        console.log(record.data.id);
//        console.log(values);

        record.set(values);
         let editUrl = '/album/edit/' + record.data.id;
         let data = {
             'title': values.title,
             'artist': values.artist,
             'submit': 'Edit',
             'id': record.data.id
         }
//         console.log(url);
         
         Ext.Ajax.request({
	url: editUrl,
	method:'POST', 
	headers: {
                                         'Content-Type': 'application/x-www-form-urlencoded'
                               }, 
                               
                                scope : this,
                                params: data
        });
        
       
         
        win.close();
        
         this.getAlbumsStore().sync();
    },
    
    deleteAlbum: function(button) {
        let me = this;
        let win = button.up('window'),
       
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();

        let warningMessage = 'You are about to delete ' + values.title + ' ' + values.artist + ' id ' + record.data.id;
        let editUrl = '/album/delete/' + record.data.id;
        let data = {
           'id': record.data.id,
           'del': 'Yes'
        };
        
        
        Ext.MessageBox.confirm('Delete', warningMessage, function(btn){
             if(btn === 'yes'){
                 Ext.Ajax.request({
	url: editUrl,
	method:'POST', 
	headers: {
                                         'Content-Type': 'application/x-www-form-urlencoded'
                               }, 
                               
                                scope : this,
                                params: data
                           
        });
        
        (function updateStore() {
               me.getAlbumsStore().remove(record);
               me.getAlbumsStore().sync();
               
//             let store = Ext.ComponentQuery.query('albumlist').getStore();
//             store.remove(Ext.ComponentQuery.query('albumlist').getSelection());

        }(me));
         
//        this.getAlbumsStore().sync(); 
        win.close();
        
        
               
            }
            else{
                     //some code
                    this.close();
            }
        });
    }
    
    
    
    
});


