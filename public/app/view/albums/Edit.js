Ext.define('AP.view.albums.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.albumedit',

    title: 'Edit Album',
    layout: 'fit',
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
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            },
            {
                text: 'Delete',
                action: 'delete'
            }
        ];

        this.callParent(arguments);
    }
});