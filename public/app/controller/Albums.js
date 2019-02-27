/* global Ext */

Ext.define('AP.controller.Albums', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.control({
            '*': {
                'albums.list': this.list,
//                'albums.edit': this.edit,
//                'albums.save': this.save,
//                'albums.delete': this.delete,
//                'albums.create': this.create,
//                'albums.resetForm': this.resetForm,
//                'albums.createEdit': this.createEdit
//                'albums.loadData': this.loadData,
            }
        })
    },

    list: function () {
        Ext.create('Ext.container.Viewport', {
            renderTo: Ext.getBody(),
            height: 1600,
            width: 1600,
            items: [
                Ext.create('AP.view.albums.ListAlbums').show()
            ]
        });

    },

    edit: function (grid, record) {
//         console.log(record.data.artist);
        var that = this;
         console.log("This in edit method is ");
         console.log(that);
//        var view = Ext.create('AP.view.albums.Edit', {
//            record: record,
//            store: 'albumsStore',
////            myRecord: rec,
////            stor: that.down('grid').getStore()
//        }).show();

        var view = Ext.create('AP.view.albums.CreateEditAlbumForm', {
            record: record,
            store: 'albumStore',
          
        }).show();

        var form = view.down('form');
        form.loadRecord(record);
//        console.log(field);
//        console.log(view.down('form'));
    },

    save: function (button) {
        var that = this;
//        alert('Clicked the Save button');
        let win = button.up('window'),
                form = button.up('window').down('form'),
                record = form.getRecord(),
                values = form.getValues();

//        if(values.title.length == 0 || values.artist.length == 0) {
//            validationMsg('Validation Error', 'Fields cannot be empty');
//            return;
//        }
//        
//        if(values.title.length < 5 || values.artist.length < 5) {
//            validationMsg('Validation Error', 'Fields cannot be less than 5 symbols');
//            return;
//        }



//        console.log(record);
//        console.log(record.data.id);
//        console.log(values);
//         values.title = escapeHtml(values.title);
//         values.artist = escapeHtml(values.artist);
//
        record.set(values);
        let editUrl = '/album/edit/' + record.data.id;
        let data = {
            'title': values.title,
            'artist': values.artist,
            'submit': 'Edit',
            'id': record.data.id
        }
////         console.log(url);
//         
        Ext.Ajax.request({
            url: editUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            scope: this,
            params: data
        });



        win.close();

//         this.getAlbumsStore().sync();
    },

    delete: function (button, grid) {
        let me = this;
        let win = button.up('window'),
                form = win.down('form'),
                record = form.getRecord(),
                values = form.getValues();

//        console.log(grid);

        let warningMessage = 'You are about to delete ' + values.title + ' ' + values.artist + ' id ' + record.data.id;
        let editUrl = '/album/delete/' + record.data.id;
        let data = {
            'id': record.data.id,
            'del': 'Yes'
        };


        Ext.MessageBox.confirm('Delete', warningMessage, function (btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: editUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },

                    scope: this,
                    params: data

                });

                (function updateStore() {
                    var store = Ext.getStore('albumsStore');
                    store.remove(record);
                    store.sync();
                }());

//        this.getAlbumsStore().sync(); 
                win.close();



            } else {
                //some code
                win.close();
            }
        });
    },

    create: function (button) {
//       Ext.create('AP.view.albums.CreateAlbumWindow').show();
        Ext.create('AP.view.albums.CreateEditAlbumForm').show();
    },

    resetForm: function (resetBtn) {
        resetBtn.up('form').getForm().reset();
    },

    createEdit: function (form, that) {
        console.log("This in createEdit method is ");
        console.log(that);
        if (form.isValid()) {
            form.submit({
                success: function (that) {
                    //Get the active window
                     var win = Ext.WindowManager.getActive();
                     win.close();
                   
                   
                    var store = Ext.getStore('albumsStore');
                    store.sync();
                   
                },
                failure: function (that) {
                    
                    //Get the active window
                    var win = Ext.WindowManager.getActive();
                    win.close();
                  
                    var store = Ext.getStore('albumsStore');
                    store.sync();
                     
                 
                    //                        Ext.Msg.alert('Failed', action.result.msg);
                }
            });
        }
        
       
    }

//    loadData: function() {
//        Ext.create('AP.store.Albums').load();
//    }

});


//
////Ext.define('AP.controller.Albums', {
//    extend: 'Ext.app.Controller',
//    
//    stores: [
//        'Albums'
//    ],
//    
//    models: [
//        'Album'
//    ],
//    
//    views: [
//        'albums.ListAlbums',
//        'albums.Edit'
//    ],
//    
//    init: function() {
//       
//         this.control({
//            'albumlist': {
//               itemdblclick: this.editAlbum
//            },
//            'albumedit button[action=save]': {
//                click: this.updateAlbum
//            },
//            'albumedit button[action=delete]': {
//                click: this.deleteAlbum
//            }
//        });
//    },
//    
//     editAlbum: function(grid, record) {
//         let view = Ext.create('AP.view.albums.Edit', {
//             record: record
//         }).show();
//         
////         
//    },
//    
//    updateAlbum: function(button){
//        var that = this;
////        alert('Clicked the Save button');
////        let win = button.up('window'),
//       
//        form = that.down('form'),
//        record = form.getRecord(),
//        values = form.getValues();
//
//        if(values.title.length == 0 || values.artist.length == 0) {
//            validationMsg('Validation Error', 'Fields cannot be empty');
//            return;
//        }
//        
//        if(values.title.length < 5 || values.artist.length < 5) {
//            validationMsg('Validation Error', 'Fields cannot be less than 5 symbols');
//            return;
//        }
//        
//        
//
////        console.log(record);
////        console.log(record.data.id);
////        console.log(values);
//         values.title = escapeHtml(values.title);
//         values.artist = escapeHtml(values.artist);
//
//        record.set(values);
//         let editUrl = '/album/edit/' + record.data.id;
//         let data = {
//             'title': escapeHtml(values.title),
//             'artist': escapeHtml(values.artist),
//             'submit': 'Edit',
//             'id': escapeHtml(record.data.id)
//         }
////         console.log(url);
//         
//         Ext.Ajax.request({
//	url: editUrl,
//	method:'POST', 
//	headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded'
//                               }, 
//                               
//                                scope : this,
//                                params: data
//        });
//        
//       
//         
//        win.close();
//        
//         this.getAlbumsStore().sync();
//    },
//    
//    deleteAlbum: function(button) {
//        let me = this;
//        let win = button.up('window'),
//       
//        form = win.down('form'),
//        record = form.getRecord(),
//        values = form.getValues();
//
//        let warningMessage = 'You are about to delete ' + values.title + ' ' + values.artist + ' id ' + record.data.id;
//        let editUrl = '/album/delete/' + record.data.id;
//        let data = {
//           'id': record.data.id,
//           'del': 'Yes'
//        };
//        
//        
//        Ext.MessageBox.confirm('Delete', warningMessage, function(btn){
//             if(btn === 'yes'){
//                 Ext.Ajax.request({
//	url: editUrl,
//	method:'POST', 
//	headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded'
//                               }, 
//                               
//                                scope : this,
//                                params: data
//                           
//        });
//        
//        (function updateStore() {
//               me.getAlbumsStore().remove(record);
//               me.getAlbumsStore().sync();
//               
////             let store = Ext.ComponentQuery.query('albumlist').getStore();
////             store.remove(Ext.ComponentQuery.query('albumlist').getSelection());
//
//        }(me));
//         
////        this.getAlbumsStore().sync(); 
//        win.close();
//        
//        
//               
//            }
//            else{
//                     //some code
//                    this.close();
//            }
//        });
//    }
//    
//    
//    
//    
//});
//
//
//
//
//function validationMsg(title, msg) {
//    Ext.Msg.show({
//    title: title,
//    msg: msg,
//    width: 300,
//    buttons: Ext.Msg.OK,
//    multiline: true,
////    fn: saveAddress,
////    animateTarget: 'addAddressBtn',
//    icon: Ext.window.MessageBox.INFO
//    });
//}
//
//
//
//
//function escapeHtml(text) {
//    return text
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }


