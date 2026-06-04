const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    category: "Sedan",
    pricePerDay: 50,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 203,
    available: true,
    // Toyota Camry - silver sedan
    image: "https://images.unsplash.com/photo-1685474650899-e37f80d7b00a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    brand: "BMW",
    model: "X5",
    year: 2023,
    category: "SUV",
    pricePerDay: 95,
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    horsepower: 335,
    available: true,
    // BMW X5 SUV
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2022,
    category: "Sedan",
    pricePerDay: 85,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 255,
    available: true,
    // Mercedes-Benz E-Class sedan
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    brand: "Hyundai",
    model: "Tucson",
    year: 2023,
    category: "SUV",
    pricePerDay: 55,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 187,
    available: true,
    // Hyundai Tucson SUV
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    brand: "Kia",
    model: "Sportage",
    year: 2022,
    category: "SUV",
    pricePerDay: 50,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 181,
    available: false,
    // Kia Sportage SUV
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    brand: "Volkswagen",
    model: "Passat",
    year: 2021,
    category: "Sedan",
    pricePerDay: 45,
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    horsepower: 174,
    available: true,
    // Volkswagen Passat sedan
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    category: "Electric",
    pricePerDay: 90,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    horsepower: 283,
    available: true,
    // Tesla Model 3
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    brand: "Audi",
    model: "A6",
    year: 2022,
    category: "Sedan",
    pricePerDay: 80,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 261,
    available: true,
    // Audi A6 sedan
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    category: "Sedan",
    pricePerDay: 110,
    seats: 4,
    transmission: "Manual",
    fuel: "Petrol",
    horsepower: 310,
    available: true,
    // Ford Mustang
    image: "https://images.unsplash.com/photo-1584345604476-8cb23214878b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    category: "Hatchback",
    pricePerDay: 40,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 158,
    available: false,
    // Honda Civic hatchback
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    brand: "Porsche",
    model: "Macan",
    year: 2023,
    category: "SUV",
    pricePerDay: 130,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 261,
    available: true,
    // Porsche Macan SUV
    image: "https://images.unsplash.com/photo-1503376710926-2c1b82193b2a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    brand: "Land Rover",
    model: "Range Rover",
    year: 2022,
    category: "SUV",
    pricePerDay: 150,
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    horsepower: 355,
    available: true,
    // Land Rover Range Rover
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    brand: "Chevrolet",
    model: "Camaro",
    year: 2022,
    category: "Sedan",
    pricePerDay: 100,
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 275,
    available: true,
    // Chevrolet Camaro muscle car
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    category: "SUV",
    pricePerDay: 50,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 187,
    available: true,
    // Mazda CX-5 SUV
    image: "https://images.unsplash.com/photo-1599912027806-fd8cb3151c79?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    brand: "Volvo",
    model: "XC90",
    year: 2023,
    category: "SUV",
    pricePerDay: 120,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 295,
    available: false,
    // Volvo XC90 7-seat SUV
    image: "https://images.unsplash.com/photo-1620286828599-d410eb85b1a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    brand: "Lexus",
    model: "RX",
    year: 2022,
    category: "SUV",
    pricePerDay: 110,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 295,
    available: true,
    // Lexus RX SUV
    image: "https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    brand: "Jeep",
    model: "Wrangler",
    year: 2023,
    category: "SUV",
    pricePerDay: 85,
    seats: 4,
    transmission: "Manual",
    fuel: "Petrol",
    horsepower: 285,
    available: true,
    // Jeep Wrangler off-road
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 18,
    brand: "Nissan",
    model: "Altima",
    year: 2022,
    category: "Sedan",
    pricePerDay: 45,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 188,
    available: true,
    // Nissan Altima sedan
    image: "https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 19,
    brand: "Hyundai",
    model: "Elantra",
    year: 2022,
    category: "Sedan",
    pricePerDay: 40,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 147,
    available: false,
    // Hyundai Elantra sedan
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 20,
    brand: "Audi",
    model: "e-tron",
    year: 2023,
    category: "Electric",
    pricePerDay: 140,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    horsepower: 355,
    available: true,
    // Audi e-tron electric SUV
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
  }
];

export default cars;