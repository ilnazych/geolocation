import axios from "axios";
import { useState } from "react"

function App() {
  const [cityName, setCityName] = useState('');

  const findMyState = () => {
    setCityName('Информация загружается');
    const success = (position: GeolocationPosition) => {

      const { longitude, latitude } = position.coords

      const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`;

      axios.get(geoUrl)
        .then(response => {
          const cityName = response.data.city;
          setCityName(cityName)
        })
        .catch((error) => console.log(error))
    }

    const error = () => {
      alert("Не получается определить вашу геолокацию")
    }

    navigator.geolocation.getCurrentPosition(success, error);

  }

  return (
    <>
      <p>Вы находитесь в городе: {cityName}</p>
      <button onClick={findMyState}>Найти мое местоположение</button>
    </>
  )
}

export default App
