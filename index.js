import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=process.env.PORT||3000;

const places = [
    { name: "Eiffel Tower", country: "France", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Tower of London", country: "UK", isFree: false, rating: 8.8, activityType: "landmark" },
    { name: "Grand Canyon", country: "USA", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "London Eye", country: "UK", isFree: false, rating: 8.6, activityType: "entertainment" },
    { name: "Natural History Museum", country: "UK", isFree: true, rating: 9.4, activityType: "museum" },
    { name: "Tokyo Disneyland", country: "Japan", isFree: false, rating: 8.7, activityType: "entertainment" },
    { name: "Great Wall of China", country: "China", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Colosseum", country: "Italy", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "British Museum", country: "UK", isFree: true, rating: 9.5, activityType: "museum" },
     { name: "Edinburgh Castle", country: "UK", isFree: false, rating: 8.5, activityType: "castle" },
    { name: "Sydney Opera House", country: "Australia", isFree: true, rating: 8.9, activityType: "entertainment" },
    { name: "Statue of Liberty", country: "USA", isFree: false, rating: 8.8, activityType: "landmark" },
    { name: "Santorini", country: "Greece", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Biarritz", country: "France", isFree: true, rating: 8.8, activityType: "beach" },
    { name: "Taj Mahal", country: "India", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Niagara Falls", country: "Canada", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Buckingham Palace", country: "UK", isFree: false, rating: 8.6, activityType: "landmark" },
    { name: "Berlin Wall Memorial", country: "Germany", isFree: true, rating: 8.9, activityType: "landmark" },
    { name: "Christ the Redeemer", country: "Brazil", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Petra", country: "Jordan", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Burj Khalifa", country: "UAE", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Acropolis of Athens", country: "Greece", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Alcatraz Island", country: "USA", isFree: false, rating: 9.4, activityType: "historical" },
    { name: "Stonehenge", country: "UK", isFree: false, rating: 8.5, activityType: "landmark" },
    { name: "Empire State Building", country: "USA", isFree: false, rating: 9.6, activityType: "landmark" },
    { name: "Costa Brava", country: "Spain", isFree: true, rating: 9.3, activityType: "natural" },
    { name: "Golden Gate Bridge", country: "USA", isFree: true, rating: 9.7, activityType: "landmark" },
    { name: "The White House", country: "USA", isFree: true, rating: 9.6, activityType: "landmark" },
    { name: "Sugarloaf Mountain", country: "Brazil", isFree: false, rating: 9.6, activityType: "natural" },
    { name: "Great Barrier Reef", country: "Australia", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Chichen Itza", country: "Mexico", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Sagrada Familia", country: "Spain", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Pantanal", country: "Brazil", isFree: true, rating: 9.6, activityType: "natural" },
    { name: "Big Ben", country: "UK", isFree: true, rating: 8.8, activityType: "landmark" },
    { name: "Whistler", country: "Canada", isFree: true, rating: 9.6, activityType: "natural" },
    { name: "Royal Ontario Museum", country: "Canada", isFree: false, rating: 9.5, activityType: "museum" },
    { name: "Vancouver Island", country: "Canada", isFree: true, rating: 9.7, activityType: "island" },
    { name: "Lençóis Maranhenses National Park", country: "Brazil", isFree: true, rating: 9.7, activityType: "natural" },
    { name: "Dubai Mall", country: "UAE", isFree: true, rating: 8.9, activityType: "shopping" },
    { name: "Hollywood Walk of Fame", country: "USA", isFree: true, rating: 8.4, activityType: "entertainment" },
    { name: "Versailles Palace", country: "France", isFree: false, rating: 9.0, activityType: "landmark" },
    { name: "The Louvre Museum", country: "France", isFree: false, rating: 9.3, activityType: "museum" },
    { name: "Forbidden City", country: "China", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Yellowstone National Park", country: "USA", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Times Square", country: "USA", isFree: true, rating: 8.7, activityType: "entertainment" },
    { name: "Blue Lagoon", country: "Iceland", isFree: false, rating: 9.0, activityType: "nature" },
    { name: "Alhambra", country: "Spain", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Mount Everest Base Camp", country: "Nepal", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Pyramids of Giza", country: "Egypt", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Rio Carnival", country: "Brazil", isFree: true, rating: 9.2, activityType: "festival" },
    { name: "Central Park", country: "USA", isFree: true, rating: 9.0, activityType: "nature" },
    { name: "Yosemite National Park", country: "USA", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Banff National Park", country: "Canada", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Van Gogh Museum", country: "Netherlands", isFree: false, rating: 9.5, activityType: "museum" },
    { name: "Angkor Wat", country: "Cambodia", isFree: false, rating: 9.6, activityType: "landmark" },
    { name: "Halong Bay", country: "Vietnam", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Bora Bora", country: "French Polynesia", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Meteora", country: "Greece", isFree: false, rating: 9.1, activityType: "nature" },
    { name: "Plitvice Lakes", country: "Croatia", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Cinque Terre", country: "Italy", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Amalfi Coast", country: "Italy", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Prague Castle", country: "Czech Republic", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Charles Bridge", country: "Czech Republic", isFree: true, rating: 9.0, activityType: "landmark" },
    { name: "Sistine Chapel", country: "Vatican City", isFree: false, rating: 9.4, activityType: "museum" },
    { name: "St. Peter's Basilica", country: "Vatican City", isFree: true, rating: 9.3, activityType: "landmark" },
    { name: "Red Square", country: "Russia", isFree: true, rating: 9.2, activityType: "landmark" },
    { name: "Hermitage Museum", country: "Russia", isFree: false, rating: 9.5, activityType: "museum" },
    { name: "Serengeti National Park", country: "Tanzania", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Vatican Museums", country: "Italy", isFree: false, rating: 9.6, activityType: "museum" },
    { name: "Maasai Mara", country: "Kenya", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Windsor Castle", country: "UK", isFree: false, rating: 8.5, activityType: "castle" },
    { name: "Liverpool Cathedral", country: "UK", isFree: true, rating: 8.4, activityType: "landmark" },
    { name: "Victoria and Albert Museum", country: "UK", isFree: true, rating: 9.2, activityType: "museum" },
    { name: "Cambridge University", country: "UK", isFree: true, rating: 9.0, activityType: "landmark" },
    { name: "Oxford University", country: "UK", isFree: true, rating: 8.9, activityType: "landmark" },
    { name: "Sherwood Forest", country: "UK", isFree: true, rating: 8.4, activityType: "natural" },
    { name: "Victoria Peak", country: "Hong Kong", isFree: true, rating: 9.0, activityType: "nature" },
    { name: "Marina Bay Sands", country: "Singapore", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Gardens by the Bay", country: "Singapore", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Petronas Towers", country: "Malaysia", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Bali", country: "Indonesia", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Korčula Old Town", country: "Croatia", isFree: true, rating: 9.3, activityType: "historical" },
    { name: "Notre-Dame Cathedral", country: "France", isFree: true, rating: 9.0, activityType: "landmark" },
    { name: "Florence Cathedral", country: "Italy", isFree: true, rating: 9.4, activityType: "landmark" },
    { name: "Trakošćan Castle", country: "Croatia", isFree: false, rating: 9.1, activityType: "castle" },
    { name: "Borobudur", country: "Indonesia", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Učka Nature Park", country: "Croatia", isFree: false, rating: 9.1, activityType: "natural" },
    { name: "Verona Arena", country: "Italy", isFree: false, rating: 8.9, activityType: "historical" },
    { name: "Lokrum Island", country: "Croatia", isFree: false, rating: 9.5, activityType: "natural" },
    { name: "Neum Bay", country: "Croatia", isFree: true, rating: 8.8, activityType: "natural" },
    { name: "Gondola Rides in Venice", country: "Italy", isFree: false, rating: 9.1, activityType: "activity" },
    { name: "Jeju Island", country: "South Korea", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Gyeongbokgung Palace", country: "South Korea", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Fuji Five Lakes", country: "Japan", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Himeji Castle", country: "Japan", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Lake Louise", country: "Canada", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Nara Park", country: "Japan", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Table Mountain", country: "South Africa", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Robben Island", country: "South Africa", isFree: false, rating: 9.0, activityType: "landmark" },
    { name: "Kruger National Park", country: "South Africa", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "The Wave", country: "USA", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Zhangjiajie National Forest Park", country: "China", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Ha'iku Stairs", country: "USA", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Great Ocean Road", country: "Australia", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Reykjavik Northern Lights", country: "Iceland", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Matterhorn", country: "Switzerland", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Lake Bled", country: "Slovenia", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Fiordland National Park", country: "New Zealand", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Mount Cook", country: "New Zealand", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Hobbiton", country: "New Zealand", isFree: false, rating: 9.3, activityType: "entertainment" },
    { name: "Easter Island Moai", country: "Chile", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Perito Moreno Glacier", country: "Argentina", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Torres del Paine", country: "Chile", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Iguazu Falls", country: "Argentina", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Lake Vättern", country: "Sweden", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Atacama Desert", country: "Chile", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Salar de Uyuni", country: "Bolivia", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Pamukkale", country: "Turkey", isFree: false, rating: 9.3, activityType: "nature" },
    { name: "Cappadocia", country: "Turkey", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Mont Saint-Michel", country: "France", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Château de Chambord", country: "France", isFree: false, rating: 9.0, activityType: "landmark" },
    { name: "Saint Basil's Cathedral", country: "Russia", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Peterhof Palace", country: "Russia", isFree: false, rating: 9.7, activityType: "historical" },
    { name: "Moscow Kremlin", country: "Russia", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Catherine Palace", country: "Russia", isFree: false, rating: 9.5, activityType: "historical" },
    { name: "Antelope Canyon", country: "USA", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Musée d'Orsay", country: "France", isFree: false, rating: 9.3, activityType: "museum" },
    { name: "Provence Lavender Fields", country: "France", isFree: true, rating: 9.2, activityType: "natural" },
    { name: "Sainte-Chapelle", country: "France", isFree: false, rating: 9.0, activityType: "church" },
    { name: "Arc de Triomphe", country: "France", isFree: false, rating: 8.8, activityType: "landmark" },
    { name: "Yosemite Falls", country: "USA", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Mount Rushmore", country: "USA", isFree: true, rating: 9.0, activityType: "landmark" },
    { name: "Everglades National Park", country: "USA", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Zion National Park", country: "USA", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Sequoia National Park", country: "USA", isFree: false, rating: 9.3, activityType: "nature" },
    { name: "Giant's Causeway", country: "UK", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Mount Etna", country: "Italy", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Dubrovnik Old Town", country: "Croatia", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Rila Monastery", country: "Bulgaria", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Mount Rainier", country: "USA", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Trolltunga", country: "Norway", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Montserrat Monastery", country: "Spain", isFree: true, rating: 9.2, activityType: "landmark" },
    { name: "Geirangerfjord", country: "Norway", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Mount Fuji", country: "Japan", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Tulum Beach", country: "Mexico", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Tulum Ruins", country: "Mexico", isFree: true, rating: 9.1, activityType: "landmark" },
    { name: "Cenote Ik Kil", country: "Mexico", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Lalibela Rock-Hewn Churches", country: "Ethiopia", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Table Mountain Cableway", country: "South Africa", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Bagan", country: "Myanmar", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Ha Long Bay", country: "Vietnam", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Vang Vien", country: "Laos", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Kilimanjaro", country: "Tanzania", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Old Quebec City", country: "Canada", isFree: true, rating: 9.3, activityType: "landmark" },
    { name: "Mount Ararat", country: "Turkey", isFree: false, rating: 9.1, activityType: "nature" },
    { name: "Mykonos", country: "Greece", isFree: true, rating: 9.3, activityType: "island" },
    { name: "Knossos Palace", country: "Greece", isFree: false, rating: 9.4, activityType: "historical" },
    { name: "Plaza Mayor", country: "Spain", isFree: true, rating: 9.0, activityType: "landmark" },
    { name: "Aeolian Islands", country: "Italy", isFree: true, rating: 9.4, activityType: "natural" },
    { name: "Meteora Monasteries", country: "Greece", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Angkor Thom", country: "Cambodia", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Parthenon", country: "Greece", isFree: false, rating: 9.8, activityType: "historical" },
    { name: "Brandenburg Gate", country: "Germany", isFree: true, rating: 9.6, activityType: "landmark" },
    { name: "Lake Geneva", country: "Switzerland", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Prambanan Temple", country: "Indonesia", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Sossusvlei Dunes", country: "Namibia", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Victoria Falls", country: "Zambia", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Mesa Verde National Park", country: "USA", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Basilica di Santa Maria del Fiore", country: "Italy", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Neuschwanstein Castle", country: "Germany", isFree: false, rating: 9.0, activityType: "landmark" },
    { name: "Mount Roraima", country: "Venezuela", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Louvre Museum", country: "France", isFree: false, rating: 9.3, activityType: "museum" },
    { name: "Cologne Cathedral", country: "Germany", isFree: true, rating: 9.5, activityType: "landmark" },
    { name: "Kyoto Temples", country: "Japan", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Jasper National Park", country: "Canada", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Cappadocia Hot Air Balloon", country: "Turkey", isFree: false, rating: 9.7, activityType: "entertainment" },
    { name: "Sintra", country: "Portugal", isFree: true, rating: 9.1, activityType: "landmark" },
    { name: "Durmitor National Park", country: "Montenegro", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Château de Versailles", country: "France", isFree: false, rating: 9.6, activityType: "landmark" },
    { name: "Mount Aoraki", country: "New Zealand", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Louvre Pyramid", country: "France", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Lake Tahoe", country: "USA", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Ribeira", country: "Portugal", isFree: true, rating: 9.0, activityType: "historical" },
    { name: "Lisbon Cathedral", country: "Portugal", isFree: true, rating: 9.1, activityType: "landmark" },
    { name: "Sossusvlei", country: "Namibia", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Jeronimos Monastery", country: "Portugal", isFree: false, rating: 9.4, activityType: "historical" },
    { name: "Seychelles Islands", country: "Seychelles", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Alps", country: "Switzerland", isFree: true, rating: 9.8, activityType: "nature" },
    { name: "Fado Museum", country: "Portugal", isFree: false, rating: 9.0, activityType: "museum" },
    { name: "Jungfraujoch", country: "Switzerland", isFree: false, rating: 9.3, activityType: "nature" },
    { name: "Pico Duarte", country: "Dominican Republic", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Giza Pyramids", country: "Egypt", isFree: false, rating: 9.6, activityType: "landmark" },
    { name: "Blue Hole", country: "Belize", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Kilimanjaro National Park", country: "Tanzania", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Lake Victoria", country: "Tanzania", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Yosemite Valley", country: "USA", isFree: true, rating: 9.8, activityType: "nature" },
    { name: "Mount Bisoke", country: "Rwanda", isFree: false, rating: 9.3, activityType: "nature" },
    { name: "Gorilla Sanctuary", country: "Uganda", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Loch Ness", country: "Scotland", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Topkapi Palace", country: "Turkey", isFree: false, rating: 9.4, activityType: "historical" },
    { name: "Lake Turkana", country: "Kenya", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Orlando Theme Parks", country: "USA", isFree: false, rating: 9.2, activityType: "entertainment" },
    { name: "Machu Picchu Mountain", country: "Peru", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Loire Valley Castles", country: "France", isFree: false, rating: 9.0, activityType: "castle" },
    { name: "Great Smoky Mountains", country: "USA", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Rocky Mountains", country: "USA", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Ronda Bridge", country: "Spain", isFree: true, rating: 9.4, activityType: "landmark" },
    { name: "Gorges du Verdon", country: "France", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Cocos Island", country: "Costa Rica", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Mount St. Helens", country: "USA", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Camp Nou", country: "Spain", isFree: false, rating: 9.0, activityType: "stadium" },
    { name: "El Escorial", country: "Spain", isFree: false, rating: 9.2, activityType: "historical" },
    { name: "Metropol Parasol", country: "Spain", isFree: false, rating: 8.7, activityType: "landmark" },
    { name: "Picasso Museum", country: "Spain", isFree: false, rating: 8.8, activityType: "museum" },
    { name: "Mt. Rushmore National Memorial", country: "USA", isFree: true, rating: 9.0, activityType: "landmark" },
    { name: "Iguazu National Park", country: "Argentina", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Moraine Lake", country: "Canada", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Mount Erebus", country: "Antarctica", isFree: false, rating: 9.8, activityType: "nature" },
    { name: "Punta Cana", country: "Dominican Republic", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Denali National Park", country: "USA", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Komodo Island", country: "Indonesia", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Mount Vesuvius", country: "Italy", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Uluwatu Temple", country: "Indonesia", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Picos de Europa", country: "Spain", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Maldives Atolls", country: "Maldives", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Niagara-on-the-Lake", country: "Canada", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Milan Cathedral", country: "Italy", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Shilin Stone Forest", country: "China", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Uluru-Kata Tjuta National Park", country: "Australia", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Golden Horn", country: "Turkey", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Zhangye Danxia", country: "China", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Guilin Mountains", country: "China", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Anıtkabir", country: "Turkey", isFree: true, rating: 10.0, activityType: "landmark" },
    { name: "Bled Castle", country: "Slovenia", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Gobi Desert", country: "China", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Banaue Rice Terraces", country: "Philippines", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Easter Island", country: "Chile", isFree: false, rating: 9.6, activityType: "landmark" },
    { name: "Kangaroo Island", country: "Australia", isFree: false, rating: 9.3, activityType: "nature" },
    { name: "Blue Mountains", country: "Australia", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Lake Atitlán", country: "Guatemala", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Mount Elbrus", country: "Russia", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Mount Rinjani", country: "Indonesia", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Lake Ohrid", country: "North Macedonia", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Mount Kosciuszko", country: "Australia", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Lake Lucerne", country: "Switzerland", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Lake Annecy", country: "France", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Mount Logan", country: "Canada", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Lake Inari", country: "Finland", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Mount Teide", country: "Spain", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Mount Sabyinyo", country: "Rwanda", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Lake Maggiore", country: "Italy", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Mount Gahinga", country: "Uganda", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Doge's Palace", country: "Italy", isFree: false, rating: 9.0, activityType: "historical" },
    { name: "Lake Naivasha", country: "Kenya", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Lake Bogoria", country: "Kenya", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Lake Balaton", country: "Hungary", isFree: true, rating: 9.0, activityType: "nature" },
    { name: "Lake Constance", country: "Germany", isFree: true, rating: 9.0, activityType: "nature" },
    { name: "Mount Kinabalu", country: "Malaysia", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Mount Aconcagua", country: "Argentina", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Cape Town", country: "South Africa", isFree: true, rating: 9.2, activityType: "city" },
    { name: "Portofino", country: "Italy", isFree: true, rating: 9.2, activityType: "natural" },
    { name: "Lake Garda", country: "Italy", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Lake Tekapo", country: "New Zealand", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Jardin du Luxembourg", country: "France", isFree: true, rating: 9.0, activityType: "park" },
    { name: "Mount Olympus", country: "Greece", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Mount Kilimanjaro", country: "Tanzania", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Lake Baikal", country: "Russia", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Machu Picchu", country: "Peru", isFree: false, rating: 9.7, activityType: "landmark" },
    { name: "Musée Rodin", country: "France", isFree: false, rating: 8.9, activityType: "museum" },
    { name: "Tower of Pisa", country: "Italy", isFree: false, rating: 9.2, activityType: "landmark" },
    { name: "Pico de Orizaba", country: "Mexico", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Colca Canyon", country: "Peru", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Bergen", country: "Norway", isFree: false, rating: 9.6, activityType: "city" },
    { name: "St. Petersburg", country: "Russia", isFree: true, rating: 9.3, activityType: "city" },
    { name: "Lake Titicaca", country: "Peru", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Manneken Pis", country: "Belgium", isFree: true, rating: 8.0, activityType: "landmark" },
    { name: "Redwood National Park", country: "USA", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Palawan", country: "Philippines", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Fjords of Norway", country: "Norway", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "The Lascaux Caves", country: "France", isFree: false, rating: 9.2, activityType: "museum" },
    { name: "Belgrade Fortress", country: "Serbia", isFree: true, rating: 9.5, activityType: "historical" },
    { name: "Niš Fortress", country: "Serbia", isFree: true, rating: 9.0, activityType: "historical" },
    { name: "The Faroe Islands", country: "Denmark", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "The Wailing Wall", country: "Israel", isFree: true, rating: 9.2, activityType: "landmark" },
    { name: "Zlatibor Mountain", country: "Serbia", isFree: true, rating: 9.4, activityType: "natural" },
    { name: "Uvac Canyon", country: "Serbia", isFree: true, rating: 9.6, activityType: "natural" },
    { name: "The Cliffs of Moher", country: "Ireland", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "The Sahara Desert", country: "Morocco", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "The Isle of Arran", country: "Scotland", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "The Isle of Capri", country: "Italy", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Zugspitze", country: "Germany", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Eltz Castle", country: "Germany", isFree: false, rating: 9.6, activityType: "castle" },
    { name: "Universal Studios", country: "USA", isFree: false, rating: 9.0, activityType: "entertainment" },
    {name: "Hagia Sophia", country: "Turkey", isFree: false, rating: 9.4, activityType: "landmark"},
    { name: "Mount Damavand", country: "Iran", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Mount Aso", country: "Japan", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Lake Pichola", country: "India", isFree: false, rating: 9.1, activityType: "nature" },
    { name: "Meiji Shrine", country: "Japan", isFree: true, rating: 9.3, activityType: "landmark" },
    { name: "Mount Elgon", country: "Uganda", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Dead Sea", country: "Jordan", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Lake Onega", country: "Russia", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Lake Nakuru", country: "Kenya", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Mount Merapi", country: "Indonesia", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Lake Wanaka", country: "New Zealand", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Lake Ladoga", country: "Russia", isFree: true, rating: 9.0, activityType: "nature" },
    { name: "Lake Kivu", country: "Rwanda", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Mount Eiger", country: "Switzerland", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Lake Saimaa", country: "Finland", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Lake Bunyonyi", country: "Uganda", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Mount Semeru", country: "Indonesia", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Mount Kazbek", country: "Georgia", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Lake Vänern", country: "Sweden", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Lake Manyara", country: "Tanzania", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Mount Triglav", country: "Slovenia", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Moscow State University", country: "Russia", isFree: true, rating: 9.3, activityType: "landmark" },
    { name: "Bhutan Paro Taktsang", country: "Bhutan", isFree: false, rating: 9.6, activityType: "landmark" },
    { name: "Table Bay", country: "South Africa", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Lake Natron", country: "Tanzania", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Sochi", country: "Russia", isFree: true, rating: 9.6, activityType: "beach" },
    { name: "Mount Nyiragongo", country: "DR Congo", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Solovetsky Islands", country: "Russia", isFree: true, rating: 9.7, activityType: "historical" },
    { name: "Haifa Bahá'í Gardens", country: "Israel", isFree: true, rating: 9.1, activityType: "landmark" },
    { name: "Rock of Gibraltar", country: "UK", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Jokulsarlon Glacier Lagoon", country: "Iceland", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Carcassonne", country: "France", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Royal Palace of Brussels", country: "Belgium", isFree: true, rating: 8.7, activityType: "palace" },
    { name: "Royal Palace of Madrid", country: "Spain", isFree: false, rating: 9.2, activityType: "palace" },
    { name: "Saint Bavo's Cathedral", country: "Belgium", isFree: true, rating: 9.1, activityType: "landmark" },
    { name: "Norwegian Glacier Museum", country: "Norway", isFree: false, rating: 8.7, activityType: "museum" },
    { name: "Lake Tanganyika", country: "Tanzania", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Seville Cathedral", country: "Spain", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Kristiansand Dyrepark", country: "Norway", isFree: false, rating: 9.0, activityType: "zoo" },
    { name: "Ganges River", country: "India", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Samarkand Registan", country: "Uzbekistan", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Oslo City Hall", country: "Norway", isFree: true, rating: 9.1, activityType: "landmark" },
    { name: "Ha Long Caves", country: "Vietnam", isFree: false, rating: 9.3, activityType: "nature" },
    { name: "Antwerp Central Station", country: "Belgium", isFree: true, rating: 9.2, activityType: "landmark" },
    { name: "Mount Karisimbi", country: "Rwanda", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Horta Museum", country: "Belgium", isFree: false, rating: 8.6, activityType: "museum" },
    { name: "Casa Batlló", country: "Spain", isFree: false, rating: 9.1, activityType: "landmark" },
    { name: "Montserrat", country: "Spain", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Manhattan Skyline", country: "USA", isFree: true, rating: 9.5, activityType: "landmark" },
    { name: "Andes Mountains", country: "Peru", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Lake Malawi", country: "Malawi", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Meuse Valley", country: "Belgium", isFree: true, rating: 9.3, activityType: "natural" },
    { name: "Mount Mikeno", country: "DR Congo", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Lofoten Islands", country: "Norway", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Rijksmuseum", country: "Netherlands", isFree: false, rating: 9.4, activityType: "museum" },
    { name: "Istanbul Grand Bazaar", country: "Turkey", isFree: true, rating: 9.1, activityType: "shopping" },
    { name: "Guggenheim Museum", country: "Spain", isFree: false, rating: 9.2, activityType: "museum" },
    { name: "Marrakech Medina", country: "Morocco", isFree: true, rating: 9.3, activityType: "landmark" },
    { name: "Angel Falls", country: "Venezuela", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Svalbard", country: "Norway", isFree: false, rating: 9.7, activityType: "natural" },
    { name: "Canals of Bruges", country: "Belgium", isFree: true, rating: 9.4, activityType: "landmark" },
    { name: "Tierra del Fuego", country: "Argentina", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Gravensteen Castle", country: "Belgium", isFree: false, rating: 8.8, activityType: "castle" },
    { name: "Luxor Temple", country: "Egypt", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Bruges Historic Center", country: "Belgium", isFree: true, rating: 9.4, activityType: "historical" },
    { name: "Pena Palace", country: "Portugal", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Pairi Daiza Zoo", country: "Belgium", isFree: false, rating: 9.4, activityType: "zoo" },
    { name: "Mardasson Memorial", country: "Belgium", isFree: true, rating: 8.8, activityType: "historical" },
    { name: "Semois Valley", country: "Belgium", isFree: true, rating: 9.2, activityType: "natural" },
    { name: "Gaasbeek Castle", country: "Belgium", isFree: false, rating: 8.8, activityType: "castle" },
    { name: "The Battle of the Bulge Memorial", country: "Belgium", isFree: true, rating: 8.7, activityType: "historical" },
    { name: "Rubens House", country: "Belgium", isFree: false, rating: 8.9, activityType: "museum" },
    { name: "Stari Most", country: "Bosnia & Herzegovina", isFree: true, rating: 9.2, activityType: "landmark" },
    { name: "Kandy Temple of the Tooth", country: "Sri Lanka", isFree: false, rating: 9.4, activityType: "landmark" },
    { name: "Jaisalmer Fort", country: "India", isFree: false, rating: 9.3, activityType: "landmark" },
    { name: "Grand Place", country: "Belgium", isFree: true, rating: 9.5, activityType: "landmark" },
    { name: "Atomium", country: "Belgium", isFree: false, rating: 9.0, activityType: "landmark" },
    { name: "Bromo Volcano", country: "Indonesia", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Cotswolds", country: "UK", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Great Mosque of Córdoba", country: "Spain", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Trevi Fountain", country: "Italy", isFree: true, rating: 9.3, activityType: "landmark" },
    { name: "Huangshan Mountains", country: "China", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "White Sands National Park", country: "USA", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Whitsunday Islands", country: "Australia", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Ibiza Beaches", country: "Spain", isFree: true, rating: 9.4, activityType: "nature" },
    { name: "Galápagos Islands", country: "Ecuador", isFree: false, rating: 9.7, activityType: "nature" },
    { name: "Sagano Bamboo Forest", country: "Japan", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Monteverde Cloud Forest", country: "Costa Rica", isFree: false, rating: 9.4, activityType: "nature" },
    { name: "Patagonia Ice Fields", country: "Chile", isFree: false, rating: 9.6, activityType: "nature" },
    { name: "Moeraki Boulders", country: "New Zealand", isFree: true, rating: 9.2, activityType: "nature" },
    { name: "Kakadu National Park", country: "Australia", isFree: false, rating: 9.5, activityType: "nature" },
    { name: "Pantheon", country: "Italy", isFree: true, rating: 9.2, activityType: "landmark" },
    { name: "Belem Tower", country: "Portugal", isFree: false, rating: 9.3, activityType: "historical" },
    { name: "The Arctic Circle", country: "Norway", isFree: true, rating: 9.6, activityType: "nature" },
    { name: "Bagan Temples", country: "Myanmar", isFree: false, rating: 9.5, activityType: "landmark" },
    { name: "Mount Blanc", country: "France", isFree: true, rating: 9.7, activityType: "nature" },
    { name: "Oktoberfest", country: "Germany", isFree: true, rating: 9.3, activityType: "festival" },
    { name: "Lalbagh Botanical Garden", country: "India", isFree: true, rating: 9.1, activityType: "nature" },
    { name: "Blue Grotto", country: "Italy", isFree: false, rating: 9.2, activityType: "nature" },
    { name: "Mount Kenya", country: "Kenya", isFree: true, rating: 9.5, activityType: "nature" },
    { name: "Lake Como", country: "Italy", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Lake Toba", country: "Indonesia", isFree: true, rating: 9.3, activityType: "nature" },
    { name: "Lake Victoria Sunsets", country: "Uganda", isFree: true, rating: 9.0, activityType: "entertainment" },
    { name: "Mount Moroto Hiking", country: "Uganda", isFree: true, rating: 9.1, activityType: "entertainment" },
    { name: "Blue Mosque", country: "Turkey", isFree: true, rating: 9.5, activityType: "landmark" },
    { name: "Aspendos Theatre", country: "Turkey", isFree: false, rating: 9.2, activityType: "historical" },
  { name: "Bursa Grand Mosque", country: "Turkey", isFree: true, rating: 9.3, activityType: "landmark" },
];  

/*function test(){
    var counter=0;
    for(var i=0;i<places.length-1;i++){
        for(var j=i+1;j<places.length;j++){
            if(places[i].name===places[j].name){
                console.log(places[i].name);
                counter++;
            }
        }
    }
    console.log(counter);
}
    */
 

function capitalizeFirstLetters(str) {
    return str
      .split(' ')
      .map(word => {
        if (word.charAt(0) === word.charAt(0).toLowerCase()) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' '); 
  }


app.get("/activityType",(req,res)=>{ // Getting all activity Type
        var array=[];
        
        for (var i=0;i<places.length;i++){
            if(!(array.includes(places[i].activityType))){
                array.push(places[i].activityType);
            }
        }
        res.json(array);

});

app.get("/country",(req,res)=>{ // Getting all Country
    var array=[];
    for (var i=0;i<places.length;i++){
        if(!(array.includes(places[i].country))){
            array.push(places[i].country);
        }
    }
    res.json(array);
});

app.get("/places/:id",(req,res)=>{ // Getting Place by ID
    const i_id=parseInt(req.params.id);
    if(i_id>places.length||i_id<1){
        res.json(i_id+" is invalid ID").res.status(404);
    }
    else{
        res.json(places[i_id-1]);
    }
});

app.get("/places/name/:name",(req,res)=>{ // Getting Place by Name
       const i_place_name=(req.params.name);
       var isFound=0;
       var data=[];
       for(var i=0;i<places.length;i++){
        if(places[i].name===i_place_name){
            isFound=1;
            data.push(places[i]);
        }
       }
       if(isFound){
        res.json(data);
       }
       else{
        res.json(i_place_name+" could not be found");
       }

});

app.get("/random",(req,res)=>{ // Getting Place by Random
        var random_index=Math.floor(Math.random()*places.length);
        res.json(places[random_index]);
});

app.get("/isfree",(req,res)=>{ // Getting Place or Activites by filtering their price
        const i_query_price=(req.query.free).toLowerCase();
        var array=[];
        if(i_query_price==="true"){
            for(var i=0;i<places.length;i++){
                if(places[i].isFree===true) array.push(places[i]);
            }
        }
        else if (i_query_price==="false"){
            for(var i=0;i<places.length;i++){
                if(places[i].isFree===false) array.push(places[i]);
            }
        }
        else{
            res.json("Wrong Query Parameter detected");
        }
        res.json(array);
        

});

app.get("/places/rating/higher/:score",(req,res)=>{ //Getting Places if their ratings are equal are higher than  user enter
            const i_user_score=parseFloat(req.params.score);
            
            var array=[];
            for(var i=0;i<places.length;i++){
                if(places[i].rating>=i_user_score){
                        array.push(places[i]);
                }
            }
            if(array.length===0){
                res.json("Places are higher rating than "+i_user_score+" could not be found");
            }
            else{
                res.json(array);
            }

});

app.get("/places/rating/lower/:score",(req,res)=>{ //Getting Places if their ratings are lower than  user enter
    const i_user_score=parseFloat(req.params.score);
    
    var array=[];
    for(var i=0;i<places.length;i++){
        if(places[i].rating<i_user_score){
                array.push(places[i]);
        }
    }
    if(array.length===0){
        res.json("Places are lower rating than "+i_user_score+" could not be found");
    }
    else{
        res.json(array);
    }

});

app.get("/places/country/:country",(req,res)=>{ // Getting Places based on user input for country
        var i_user_country=capitalizeFirstLetters((req.params.country));
        var array=[];
        for (var i=0;i<places.length;i++){
            if(places[i].country===i_user_country) array.push(places[i]);
        }
        if(array.length===0){res.json("Places in "+i_user_country+" could not be found");}
        else{
            res.json(array);
        }
    
});

app.get("/places/activity/:activity",(req,res)=>{ //Getting Places based on user input for activity type
        const i_user_activity=req.params.activity.toLowerCase();
        var array=[];
        for(var i=0;i<places.length;i++){
            if(i_user_activity===places[i].activityType){
                array.push(places[i]);
            }
        }

        if(array.length===0) res.json("Place for "+i_user_activity+" could not be found");
        else res.json(array);

});

app.get("/filter",(req,res)=>{ // Getting places based On user Query (free,country,score,activity)

        var array=[];
        if(req.query.free){
                if(req.query.free.toLowerCase()==="true"){ //isFree=true
                        if(req.query.country){ // Country parametresi girilmiş
                            const i_user_country=capitalizeFirstLetters(req.query.country);
                                if(req.query.score){ //Score parametresi girilmiş
                                    const i_user_score=parseFloat(req.query.score);
                                        if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                                const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===true &&
                                                        temp_place.country===i_user_country &&
                                                        temp_place.rating>=i_user_score &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.isFree===true &&
                                                    temp_place.country===i_user_country &&
                                                    temp_place.rating>=i_user_score
                                                ) {array.push(temp_place);}
                                            }
                                        }

                                }
                                else{ //Skor parametresi girilmemiş ise
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                                const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===true &&
                                                        temp_place.country===i_user_country &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.isFree===true &&
                                                    temp_place.country===i_user_country
                                                ) {array.push(temp_place);}
                                            }
                                        }
                                }
                        }
                        else{ //Country Parametresi girilmemiş
                                if(req.query.score){ //Score parametresi girilmiş
                                    const i_user_score=parseFloat(req.query.score);
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                            const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===true &&
                                                        temp_place.rating>=i_user_score &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.isFree===true &&
                                                    temp_place.rating>=i_user_score 
                                                ) {array.push(temp_place);}
                                            }

                                        }
                                }
                                else{ //Skor parametresi girilmemiş ise
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                            const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===true &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.isFree===true) 
                                                    {array.push(temp_place);}
                                            }

                                        }
                                }
                        }
                }
                
                else if(req.query.free.toLocaleLowerCase()==="false"){ //isFree=false
                        if(req.query.country){ // Country parametresi girilmiş
                            const i_user_country=capitalizeFirstLetters(req.query.country);
                                    if(req.query.score){ //Score parametresi girilmiş
                                    const i_user_score=parseFloat(req.query.score);
                                             if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                                const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.country===i_user_country &&
                                                        temp_place.rating>=i_user_score &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                            }
                                            else{ // Aktivite parametresi girilmemiş ise
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.country===i_user_country &&
                                                        temp_place.rating>=i_user_score
                                                    ) {array.push(temp_place);}
                                                }
                                            }   
                                    }
                                    else{ //Skor parametresi girilmemiş ise
                                             if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                                const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.country===i_user_country &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                            }
                                            else{ // Aktivite parametresi girilmemiş ise
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.country===i_user_country
                                                    ) {array.push(temp_place);}
                                                }
                                            }
                                    }
                        }
                        else{   //Country Parametresi girilmemiş

                                if(req.query.score){ //Score parametresi girilmiş
                                const i_user_score=parseFloat(req.query.score);
                                             if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                                const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.rating>=i_user_score &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                            }
                                            else{ // Aktivite parametresi girilmemiş ise
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.rating>=i_user_score 
                                                    ) {array.push(temp_place);}
                                                }

                                            }
                                }
                                else{ //Skor parametresi girilmemiş ise
                                             if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                                const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                            }
                                            else{ // Aktivite parametresi girilmemiş ise
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.isFree===false) {array.push(temp_place);}
                                                }
                                            }

                                }

                        }
                }
                
                else{
                    res.json("invalid query parameter");
                }
        }
        else{  // isFree parametresi girilmemiş
                
                        if(req.query.country){ // Country parametresi girilmiş
                            const i_user_country=capitalizeFirstLetters(req.query.country);
                            if(req.query.score){ //Score parametresi girilmiş
                                const i_user_score=parseFloat(req.query.score);
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                            const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.country===i_user_country&&
                                                        temp_place.rating>=i_user_score &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.country===i_user_country&&
                                                    temp_place.rating>=i_user_score 
                                                ) {array.push(temp_place);}
                                            }
                                        }
                            }
                            else{ //Skor parametresi girilmemiş ise
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                            const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if(temp_place.country===i_user_country&&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.country===i_user_country ) {array.push(temp_place);}
                                            }
                                        }

                            }
                        }
                        else{    //Country Parametresi girilmemiş
                            if(req.query.score){ //Score parametresi girilmiş
                                const i_user_score=parseFloat(req.query.score);
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                            const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if( temp_place.rating>=i_user_score &&
                                                        temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise
                                            for(var i=0;i<places.length;i++){
                                                var temp_place=places[i];
                                                if(temp_place.rating>=i_user_score) {array.push(temp_place);}
                                            }
                                        }
                            }
                            else{ //Skor parametresi girilmemiş ise
                                         if(req.query.activity){ //Aktivite türü parametresi girilmiş ise
                                            const i_activity_type=req.query.activity.toLowerCase();
                                                for(var i=0;i<places.length;i++){
                                                    var temp_place=places[i];
                                                    if( temp_place.activityType===i_activity_type
                                                    ) {array.push(temp_place);}
                                                }
                                        }
                                        else{ // Aktivite parametresi girilmemiş ise

                                        }

                            }
                        }
        }

                if(array.length===0){
                    res.json("The record matching your criteria could not be found or incorrect query parameters were entered.")
                }
                else{
                    res.json(array);
                }

});









app.listen(port,()=>{
    console.log("Port is running");
    /* console.log(places.length);
     test();*/
})