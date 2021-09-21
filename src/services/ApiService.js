class ApiService {

    constructor(api){
      this.api = api
    }
  
    getCountries = () => fetch(this.api + "/countries").then(res => res.json())

    createCountry = (newCountry) => {
      return fetch(this.api + "/countries", {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCountry),
        })
        .then(response => response.json())
    }
    findOrCreateUser = (username) => {
      return fetch(this.api + "/users", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username}),
      })
      .then(response => response.json())
    }
}