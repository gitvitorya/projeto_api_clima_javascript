// Chave de API para acessar os dados meteorológicos da OpenWeatherMap
const apiKey = '78b7a699d6d491fa20bfa6b383be3a69';

// Elementos do DOM que serão manipulados
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");




// Função para padronizar a capitalização e remover acentos
const formatDescription = (description) => {
    return description.toUpperCase();
};

// Função para obter os dados meteorológicos da API
const getWeatherData = async (city) => {
    // Construir a URL da API com a cidade, unidades métricas, chave de API e idioma
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    // Fazer uma solicitação à API e aguardar a resposta
    const response = await fetch(apiWeatherURL);
    const data = await response.json(); // Converter a resposta para JSON

    console.log("Weather data:", data);

    return data; // Retornar os dados meteorológicos
};

// Função para exibir os dados meteorológicos na página
const showWeatherData = async (city) => {
    try {
        // Obter os dados meteorológicos usando a função getWeatherData
        const data = await getWeatherData(city);
        console.log("Received weather data:", data);
        
        // Atualizar os elementos do DOM com os dados obtidos
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        
        // Padronizar a descrição do clima para garantir consistência
        const weatherStatus = formatDescription(data.weather[0].description);
        descElement.innerText = weatherStatus;

        // Atualizar os elementos de umidade e velocidade do vento
        umidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;

        weatherContainer.classList.remove('hide');

    } catch (error) {
        // Lidar com erros, exibindo mensagens de erro no console
        console.error('Error fetching weather data:', error);
    }
};

// Adicionar um ouvinte de evento para o botão de pesquisa
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Obter a cidade digitada pelo usuário e chamar a função showWeatherData
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});













