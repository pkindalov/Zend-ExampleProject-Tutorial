Ext.define('AP.view.blogs.ListBlogs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bloglist',
    
    title: 'All Blogs',
    store: 'Blogs',
    
    initComponent: function() {
//        this.store = {
//            fields: ['title', 'text'],
//            data  : [
//                {title: 'Blog #1',    text: 'Welcome to my first blog post'},
//                {title: 'Blog #2 - Hooray edit successful :) 	', text: 'Welcome to my first blog post'}
//            ]
//        };

        this.columns = [
            {header: 'Title',  dataIndex: 'title',  flex: 1},
            {header: 'Text', dataIndex: 'text', flex: 1}
        ];
        
        this.callParent(arguments);
    }
    
});


