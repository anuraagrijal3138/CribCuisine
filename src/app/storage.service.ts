import * as firebase from 'firebase';
import { environment } from '../environments/environment';

export class StorageService{

    storageRef : firebase.storage.Reference;

    constructor(){
        firebase.initializeApp(environment.firebase);
        var storageRef = firebase.storage().ref();
        this.storageRef = storageRef;
    }

    //upload a file to given address
    uploadOneFile(file:File, address:String){

        var file = file; // use the Blob or File API
        this.storageRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });
    }

    uploadMultipleFiles(fileList: FileList, address:String){
        for (var i = 0; i < FileList.length; i++) {
            var imageFile = FileList[i];
    
            this.uploadImageAsPromise(imageFile, address);
        }

    }

    //Handle waiting to upload each file using promise
     uploadImageAsPromise (imageFile, fullDirectory) {
         return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref(fullDirectory+"/"+imageFile.name);

            //Upload file
            var task = storageRef.put(imageFile);

            //Update progress bar
            task.on('state_changed',
            function progress(snapshot: firebase.storage.UploadTaskSnapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                console.log(percentage);
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
            }
        );
    });
     }
    }