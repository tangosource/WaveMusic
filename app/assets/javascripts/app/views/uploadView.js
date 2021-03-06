RB.UploadView = Backbone.View.extend({
  el: "#home",

  events: {
    "click #fn-upload-send"          : "uploadAudio",
    "click #fn-create-playlist-send" : "createPlaylist",
  },

  initialize: function(){
    this.songs = new RB.SongsCollection();

    this.upload = new RB.UploadController({
      collection: this.songs
    });

  },

  uploadAudio: function(event){
    event.preventDefault();

    var data = {
      file: this.$("#fn-upload-file")[0].files.length > 0 ? $('#fn-upload-file')[0].files[0] : null,
      artist: this.$("#fn-upload-artist").val() !== "" ? this.$("#fn-upload-artist").val() : null,
      name: this.$("#fn-upload-name").val() !== "" ? this.$("#fn-upload-name").val() : null
    };

    if(data.file && data.name){
      this.upload.startUpload(data);
    }
  },

  createPlaylist: function(event){
    event.preventDefault();
    var name = this.$("#fn-create-playlist-name").val();

    if(name){
      var newPlaylist = new RB.PlaylistModel({
        name: name
      });

      var request = newPlaylist.save();

      request.done(function(data){
        $("#fn-create-playlist-msg").text(data.message + " id: " + data.playlist);
      });

      request.fail(function(error, type){
        $("#fn-create-playlist-msg").text(type);
      });

    }
  },

});
