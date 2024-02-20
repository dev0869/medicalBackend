class ApiError  {
  constructor( message='SomeThing Wrong!', ) {

    this.status = 400;
    this.message = message;
    this.isSuccess=false;

   
  }
}
export {ApiError}