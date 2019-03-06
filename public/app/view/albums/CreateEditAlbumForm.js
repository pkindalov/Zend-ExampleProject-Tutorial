Ext.define('AP.view.albums.CreateEditAlbumForm', {
    extend: 'AP.view.albums.ModalWindow',
    title: 'Hello',
//    itemId: 'createEditWindow',
    modal: true,
    height: 400,
    width: 400,
    layout: 'fit',
    tbar: [{
                text:'Create',
                itemId: 'createEmptyForm',
                handler: function() {
                     Ext.create('AP.view.albums.CreateEditAlbumForm').show();
//                    alert('You pressed button 1');
                }
           }],
    items: [

       

        {
            xtype: 'form',
//            title: 'Create Album',
            bodyPadding: 5,
            width: 350,
            
            url: '/createEdit/',

            // Fields will be arranged vertically, stretched to full width
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },

            // The fields
            defaultType: 'textfield',
            items: [{
                    fieldLabel: 'Artist',
                    name: 'artist',
                    allowBlank: false
                }, {
                    fieldLabel: 'Title Of Album',
                    name: 'title',
                    allowBlank: false
                },
                
                {
                    fieldLabel: 'Song Title',
                    name: 'song',
                    allowBlank: false
                },

                {
                   xtype: 'grid',
                   title: 'Songs',
                   storeId: 'albumStore',
                   columns: [
                       {
                       header: 'Songs', dataIndex: 'song'
                        }
                   ]
                },
              
                {
                    name: 'id',
                    value: '',
                    hidden: true
                },
                {
                    name: 'submit',
                    value: 'Add',
                    hidden: true
                }
            ],

            // Reset and Submit buttons
            buttons: [{
                    text: 'Reset',
                    handler: function () {
//                        this.fireEvent('albums.resetForm', this);
                        this.up('form').getForm().reset();
                    }
                }, {
                    text: 'Save',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function () {
                        var that = this;
                        var form = this.up('form').getForm();

                        if (form.isValid()) {
                            form.submit({
                                success: function (form, action) {

                                    
                                    that.up('window').close();
                                },
                                failure: function (form, action) {

                                    Ext.Msg.alert('Failed', action.result.msg);
                                    that.up('window').close();
                                    //                        Ext.Msg.alert('Failed', action.result.msg);
                                }
                            });
                        }
                    }


                },
                {
                    text: 'Delete',
                    handler: function(button,grid) {
                        let me = this;
                        let win = button.up('window'),
                                form = win.down('form'),
                                record = form.getRecord(),
                                values = form.getValues();
                        
                        if(record === undefined) {
                            Ext.MessageBox.alert('Warning!!',  'You must select a record first');
                            return;
                        }

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
                    }
                }
            
            ],
        },
        
       
        
    ],
    
    
    
      
    
    
  
});
















