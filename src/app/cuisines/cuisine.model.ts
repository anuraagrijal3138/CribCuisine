export interface Cuisine {
	name: String,
	uid: String,
	description: String,
	hostingtime: String,
	price : number,
	imgPostKey : String,
	hostName : String,
	hostImage: String,
	hostMetadata: firebase.auth.UserMetadata
}
