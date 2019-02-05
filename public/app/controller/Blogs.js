Ext.define('AP.controller.Blogs', {
    extend: 'Ext.app.Controller',
    
    stores: [
      'Blogs'  
    ],
    
    models: [
        'Blog'
    ],
    
    views: [
        'blogs.ListBlogs',
        'blogs.Edit'
    ],
    
    init: function() {
         this.control({
            'bloglist': {
                itemdblclick: this.editBlog
            },
            'blogedit button[action=save]': {
                click: this.updateBlog
            }
        });
    },
    
     editBlog: function(grid, record) {
       let view = Ext.widget('blogedit');
       
       view.down('form').loadRecord(record);
    },
    
    updateBlog: function(button){
//        alert('Save button for blogs clicked');
        let win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
    
           record.set(values);
           win.close();
    }
});


