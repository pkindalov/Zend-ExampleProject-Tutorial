Ext.define('AP.store.Blogs', {
    extend: 'Ext.data.Store',
    
    model: 'AP.model.Blog',
    data: [
                {title: 'Blog #1',    text: 'Welcome to my first blog post'},
                {title: 'Blog #2 - Hooray edit successful :) 	', text: 'Welcome to my first blog post'}
            ]
});

