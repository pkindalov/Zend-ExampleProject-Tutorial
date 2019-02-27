Ext.define('AP.view.blogs.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.blogedit',

    title: 'Edit Blog Post',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        let that = this;
        items = [
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
                    },
                    {
                    xtype:'buttons',
                    items:[
                        //Да преместя actions тук
            {
                text: 'Save',
                action: 'save',
                handler: that.save()
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ]}
                ]
            }
        ];

        

        this.callParent(arguments);
        console.log(that.myRecord);
    },
    
    
    save: function() {
        let that = this;
        that.down('form');
        console.log(that.stor);
        that.stor.load();
    }
    
});