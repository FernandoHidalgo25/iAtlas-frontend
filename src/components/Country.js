class Country {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }

    renderShow = () => {
        const {continent, name, capital, religion, language, imageUrl, username} = this.data
        document.getElementById("main") .innerHTML = `
        <div class="show">
            <h1>${name}</h1>
            <img src="${imageUrl}" alt=${name}/>
            <p>${name} is siatuated in ${continent}</p>
            <p>its capital is ${capital}</p>
            <p>its religion is ${religion}</p>
            <p>the official language is ${language}</p>
            <p>Listed by: ${username}</p>
            <div class="container"></div>
        </div>
        <button id="goBack">Go Back</button>
        `
        document.getElementById("goBack").addEventListener("click", Country.renderIndex)
    }

    renderCard = () => {
        const {name, continent, capital, religion, language, imageUrl, id} = this.data
        document.getElementById("country-container").innerHTML += `
        <div class="country-card card" data-id=${id}>
            <img src=${imageUrl} alt=${name}/>
            <p class="title">${name}</p>
            <p>${capital}, ${language}</p>
        </div>`
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const newCountry = {
            continent: e.target.continent.value,
            name: e.target.name.value,
            capital: e.target.capital.value,
            religion: e.target.religion.value,
            language: e.target.language.value,
            image_url: e.target.imageUrl.value
        }
        api.createCountry(newCountry).then(country => {
            new Country(country).renderCard()
        })
        modal.close()
        e.target.reset()
    }

    static openCountryForm = () => {
      modal.main.innerHTML = `
      <h1>Add your Country</h1>
      <form>
        <label for="continent">Continent:</label><br>
        <input type=text name="continent"><br>
        <label for="name">Name:</label><br>
        <input type="text" name="name"><br>
        <label for="capital">Capital:</label><br>
        <input type="text" name="capital"><br>
        <label for="religion">Religion:</label><br>
        <input type="text" name="religion"><br>
        <label for="language">Language:</label><br>
        <input type="text" name="language"><br>
        <label for="imageUrl">Image:</label><br>
        <input type="text" name="imageUrl"><br>
        <input type="submit" value="List this Country!"<br>
      </form>
      `
        modal.main.querySelector("form").addEventListener("submit", this.handleSubmit)
        modal.open()
    }

    static find = (id) => this.all.find(country => country.data.id == id)

    static getCountries = () => {
        api.getCountries().then(countries => {
            Country.all = []
            countries.forEach(country => new Country(country))
            this.renderIndex()
        })
    }

    static renderIndex = () => {
        const main = document.getElementById("main")
        main.innerHTML = ""
        const countryContainer = document.createElement("div")
        countryContainer.id = "country-container"
        const addCountry = document.createElement("button")
        addCountry.innerText = "List a New Country"
        addCountry.addEventListener("click", this.openCountryForm)
        main.append(countryContainer, addCountry)
        this.all.forEach(country => country.renderCard())
        countryContainer.addEventListener("click", this.handleIndexClick)
      }

    static handleIndexClick = (e) => {
        if (e.target.tagName == "IMG" || e.target.classList.contains("title")){
        const id =e.target.closest(".country-card").dataset.id
        this.find(id).renderShow()
        }      
     }      
}