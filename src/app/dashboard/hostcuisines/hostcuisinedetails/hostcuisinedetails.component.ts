import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-hostcuisinedetails',
  templateUrl: './hostcuisinedetails.component.html',
  styleUrls: ['./hostcuisinedetails.component.css']
})
export class HostcuisinedetailsComponent implements OnInit {

  @Input() cuisine;
  
  constructor( private authService: AuthService) { }


  ngOnInit() {
    console.log("inside hostcuisineDetailsComponent");
    console.log(this.cuisine);
  }

  deleteListing(selCuisine){
    var storageRef = this.authService.getStorageRef();
    var dbref = this.authService.db.ref();
    console.log(selCuisine);
    var cuisinseRef = dbref.child('/cuisines/' + selCuisine.imgPostKey );
    var userCuisinesRef = dbref.child('/user-cuisines/' + this.authService.auth.currentUser.uid+ '/' + selCuisine.imgPostKey);

    var cuisineImageRef = storageRef.child('/cuisines/' + selCuisine.imgPostKey);
    var userCuisineImageRef = storageRef.child('/user-cuisines/'+this.authService.auth.currentUser.uid+'/'+ selCuisine.imgPostKey);

    return cuisinseRef.remove().then(
      (success) =>{
        //on success remove userCuisineRef and images
        userCuisinesRef.remove().then(
          (success) => {
            //on success remove images
            cuisineImageRef.delete().then((success)=>{
              //on success remove userCuisineImage
              userCuisineImageRef.delete().then(
                (success)=>{ 
                  //no more tasks to perform on success
                }
              ).catch((error)=> console.log("deletion of userCuisineImage failed"))
            }).catch((error)=> console.log("deletion of cuisineImage Failed"))          
          }).catch((error)=> console.log("removal of userCuisines failed from db"))
      }).catch((error)=> console.log("removal of cuisine failed from db"))
  }

}
