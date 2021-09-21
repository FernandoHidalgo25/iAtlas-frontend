class City {

    constructor(data, country){
      this.data = data
      this.country = country
    }
  
    render = () => {
      const { location, population, crime, school, image} = this.data
      document.querySelector(".container").innerHTML += `
      <div class="card">
        <h1>${location}</h1>
        <img src=${image}/>
        <p>Population: ${population}</p>
        <p>${crime} crime</p>
        <p>literacy rate: ${school}</p>
      </div>
      `
    }
  
  }