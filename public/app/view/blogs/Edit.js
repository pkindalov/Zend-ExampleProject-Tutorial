Ext.define('AP.view.blogs.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.blogedit',

    title: 'Edit Blog Post',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'title',
                        fieldLabel: 'Title'
                    },
                    {
                        xtype: 'textfield',
                        name : 'text',
                        fieldLabel: 'Text'
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
            }
        ];

        this.callParent(arguments);
    }
});