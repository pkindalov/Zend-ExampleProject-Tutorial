/* 
 Да предефенирам Ext.window и  да го направя модал
 * 
 */

Ext.define('AP.view.albums.CreateAlbumWindow', {
    extend: 'Ext.window.Window',
    title: 'Hello',
    modal: true,
    height: 200,
    width: 400,
    layout: 'fit',
    items: [

        //     Ext.create('AP.view.albums.CreateAlbumForm').show()

        {
            xtype: 'form',
            title: 'Create Album',
            bodyPadding: 5,
            width: 350,
            //    store: 'albumsStore',

            // The form will submit an AJAX request to this URL when submitted
            url: '/album/add',

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
                        this.up('form').getForm().reset();
                    }
                }, {
                    text: 'Submit',
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function () {
                        var that = this;
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                success: function (form, action, that) {



                                    that.up('window').close();
                                },
                                failure: function (form, action) {


                                    that.up('window').close();
                                    //                        Ext.Msg.alert('Failed', action.result.msg);
                                }
                            });
                        }


                        //            this.up('window').close();
                    }
                }],
        }


    ]


}, );