// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
	firebase: {
		apiKey: "AIzaSyAwmw91CYCT7zYm6_xIqEA6woiDqB9P8mM",
    authDomain: "cribcuisine.firebaseapp.com",
    databaseURL: "https://cribcuisine.firebaseio.com",
    projectId: "cribcuisine",
    storageBucket: "cribcuisine.appspot.com",
    messagingSenderId: "252261267111"
	}
};
