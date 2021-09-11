class Country {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)
    }

    renderShow = () => {
        const {continent, name, capital, religion, language, imageUrl} = this.data
        document.getElementById("main") .innerHTML = `
        <div class="show">
            <h1>${name}</h1>
            <img src="${imageUrl}" alt=${name}/>
            <p>${name} is siatuated in ${continent}</p>
            <p>its capital is ${capital}</p>
            <p>its religion is ${religion}</p>
            <p>the official language is ${language}</p>
        </div>
        <button id="goBack">Go Back</button>
        `
        document.getElementById("goBack").addEventListener("click", Country.renderIndex)
    }

    renderCard = () => {
        const {name, continent, capital, religion, language, imageUrl, id} = this.data
        document.getElementById("country-container").innerHTML += `
        <div class="country-card" data-id=${id}>
            <img src=${imageUrl} alt=${name}/>
            <p class="title">${name}</p>
            <p>${capital}, ${language}</p>
        </div>`
    }

    static find = (id) => this.all.find(country => country.data.id == id)

    static handleIndexClick = (e) => {
        if (e.target.tagName == "IMG" || e.target.classList.contains("title")){
        const id =e.target.closest(".country-card").dataset.id
        this.find(id).renderShow()      
        }    
    }

    static renderIndex = () => {
        const main = document.getElementById("main")
        main.innerHTML = ""
        const countryContainer = document.createElement("div")
        countryContainer.id = "country-container"

        main.appendChild(countryContainer)
        this.all.forEach(country => country.renderCard())
        countryContainer.addEventListener("click", this.handleIndexClick)
    }

    static getCountries(){
        api.getCountries().then(countries => {
            countries.forEach(country => new Country(country))
            this.renderIndex()
        })
    }
}