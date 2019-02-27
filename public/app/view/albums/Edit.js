Ext.define('AP.view.albums.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.albumedit',

    title: 'Edit Album',
    layout: 'fit',
    modal: true,
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'artist',
                        fieldLabel: 'Artist'
                    },
                    {
                        xtype: 'textfield',
                        name : 'title',
                        fieldLabel: 'Ttitle'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save',
                handler: function(button) {
                    this.fireEvent('albums.save', button);
                }
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            },
            {
                text: 'Delete',
                action: 'delete',
                handler: function(button, grid){
                    this.fireEvent('albums.delete', button, grid);
                }
            }
        ];

        this.callParent(arguments);
    }
});