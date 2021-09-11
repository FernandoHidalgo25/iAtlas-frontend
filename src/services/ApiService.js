class ApiService {

    constructor(api){
      this.api = api
    }
  
    getCountries = () => fetch(this.api + "/countries").then(res => res.json())
}