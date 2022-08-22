const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const getWeather = async (address) => {
    const response = await fetch(`http://localhost:3000/weather?address=${address}`)
        if (response.status === 200){
           const data = await response.json()
           if (!data.error){
                console.log(data.location)
                console.log(data.forecast)
           } else {
                console.log(data.error)
           }
        } else {
            throw new Error('Unable to fetch country')
        }
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    getWeather(location)
})
