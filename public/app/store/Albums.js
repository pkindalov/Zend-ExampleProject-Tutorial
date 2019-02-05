Ext.define('AP.store.Albums', {
    extend: 'Ext.data.Store',
    
    model: 'AP.model.Album',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/getAlbums',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
         writer: {
            type: 'json',
            writeAllFields : false,  //just send changed fields
            allowSingle :false      //always wrap in an array
           // nameProperty: 'mapping'
       }
    }
    
//    proxy: {
//        type: 'rest',
//        url: '/getAlbums'
//    }
    
//    proxy: {
//        type: 'ajax',
//        api: {
////            read: '/app/data/albums.json',
//            read: '/getAlbums',
//            update: '/app/data/updateAlbums.json'
//        },
////        url: '/app/data/albums.json',
//        reader: {
//            type: 'json',
//            root: 'data',
//            successProperty: 'success'
//        }
//    },
    
   
//    data  : [
//                {artist: 'Ed',    title: 'ed@sencha.com'},
//                {artist: 'Tommy', title: 'tommy@sencha.com'}
//            ]
});




