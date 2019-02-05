Ext.create('Ext.tab.Panel', {
               renderTo: Ext.getBody(),
               height: 100,
               width: 200,
               
               items: [{
                  xtype: 'panel',
                  title: 'Tab One',
                  html: 'The first tab',
                  listeners: {
                     render: function() {
                        Ext.MessageBox.alert('Tab one', 'Tab One was clicked.');
                     }
                  }
               },{
                  // xtype for all Component configurations in a Container
                  title: 'Tab Two',
                  html: 'The second tab',
                  listeners: {
                     render: function() {
                        Ext.MessageBox.alert('Tab two', 'Tab Two was clicked.');
                     }
                  }
               }]
            });
