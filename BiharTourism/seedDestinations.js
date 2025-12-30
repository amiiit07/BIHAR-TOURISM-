const mongoose = require('mongoose');
const Destination = require('./models/Destination');

// ⭐ Connect to Atlas instead of Local DB
mongoose.connect('mongodb+srv://amit:amiiit07@cluster0.db9k61e.mongodb.net/bihartourism?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB connected to ATLAS!');
    })
    .catch(err => {
        console.log('Connection error:', err);
    });

// ⭐ Your destination data (same as before)
const destinations = [
    {
        name: "Mahavir Mandir (Patna)",
        description: "One of Bihar's most revered Hindu temples dedicated to Lord Hanuman.",
        price: 1500,
        image: "/images/mahavir-mandir.jpeg"
    },
    {
        name: "Rajgir",
        description: "A scenic hill town with Buddhist and Jain heritage, surrounded by hills and natural beauty.",
        price: 1500,
        image: "/images/mahabodhi.jpg"
    },
    {
        name: "Golghar",
        description: "A historic granary built by the British in Patna with a panoramic view from the top.",
        price: 100,
        image: "/images/golghar.jpeg"
    },
    {
        name: "Patna Zoo",
        description: "Also known as Sanjay Gandhi Biological Park, home to a wide range of flora and fauna.",
        price: 50,
        image: "/images/patnazoo.jpeg"
    },
    {
        name: "City Central Patna",
        description: "A popular shopping and hangout destination in the heart of Patna.",
        price: 0,
        image: "/images/citycentral.jpeg"
    },
    {
        name: "Tarachandi Mandir, Sasaram",
        description: "A sacred temple dedicated to Goddess Tara in Sasaram, popular among devotees.",
        price: 0,
        image: "/images/tarachandi.jpeg"
    },
    {
        name: "Bodh Gaya",
        description: "The place where Lord Buddha attained enlightenment under the Bodhi tree.",
        price: 200,
        image: "/images/bodhgaya.jpeg"
    },
    {
        name: "Gupta Dham, Rohtas",
        description: "A mystical pilgrimage cave temple located in the hills of Rohtas district.",
        price: 0,
        image: "/images/guptadham.jpeg"
    },
    {
        name: "Gaya Mountains",
        description: "Scenic hills around Gaya, spiritually significant and popular among trekkers and pilgrims.",
        price: 0,
        image: "/images/gaya.jpeg"
    },
    {
        name: "Barabar Caves",
        description: "The oldest surviving rock-cut caves in India, located in Jehanabad district.",
        price: 0,
        image: "/images/barabar.jpeg"
    },
    {
        name: "Patna Museum",
        description: "Historic museum in Patna housing rare artifacts, paintings, and British Raj era items.",
        price: 10,
        image: "/images/biharmuseum.png"
    },
    {
        name: "Sher Shah Suri Tomb",
        description: "Magnificent tomb of Sher Shah Suri located in Sasaram, built in Indo-Islamic style.",
        price: 30,
        image: "/images/shershah.jpeg"
    },
    {
        name: "Pawapuri",
        description: "A holy site for Jains, where Lord Mahavira attained Nirvana, famous for Jal Mandir.",
        price: 0,
        image: "/images/pawapuri.jpeg"
    },
    {
        name: "Vishwa Shanti Stupa",
        description: "Peace Pagoda in Rajgir built by Japanese monks symbolizing peace and non-violence.",
        price: 20,
        image: "/images/vishwasanti.jpeg"
    },
    {
        name: "Sitamarhi Janki Mandir",
        description: "Temple dedicated to Goddess Sita, believed to be her birthplace.",
        price: 0,
        image: "/images/Janaki Mandir.jpeg"
    },
    {
        name: "Valmiki National Park",
        description: "Bihar's only national park, rich in biodiversity, located in West Champaran.",
        price: 50,
        image: "/images/valmiki_national_park.jpeg"
    },
    {
        name: "Navlakha Palace",
        description: "Royal palace in Rajnagar, Madhubani district, known for its historical ruins.",
        price: 0,
        image: "/images/Navlakha Palace.jpeg"
    },
    {
        name: "Jal Mandir",
        description: "Temple located in Pawapuri in the middle of a pond, dedicated to Mahavira.",
        price: 10,
        image: "/images/jal_mandir.jpeg"
    },
    {
        name: "Mundeshwari Temple",
        description: "One of the oldest functional temples in the world, located in Kaimur district.",
        price: 0,
        image: "/images/Mundeshwari Temple.jpeg"
    },
    {
        name: "Dhua Kund (Sasaram)",
        description: "Natural hot spring in Sasaram with mythological and ecological significance.",
        price: 0,
        image: "/images/dhuakund.jpg"
    },
    {
        name: "Manjhar Kund (Sasaram)",
        description: "Beautiful waterfall located near Sasaram, a scenic picnic spot.",
        price: 0,
        image: "/images/manjharkund.jpeg"
    },
    {
        name: "Kakolat Waterfall",
        description: "Scenic waterfall on the border of Bihar and Jharkhand, popular tourist attraction.",
        price: 0,
        image: "/images/kakolat.jpeg"
    }
];
destinations.forEach(d => {
    d.routeName = d.name
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")
        .replace(/[()]/g, "")
        .replace(/,/g, "")
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/\./g, "")
        .replace(/--+/g, "-");
});




// ⭐ Seed Function
async function seedDB() {
    try {
        await Destination.deleteMany({});
        console.log("Old destinations cleared.");

        await Destination.insertMany(destinations);
        console.log("New destinations inserted into ATLAS!");

        mongoose.connection.close();
        console.log("Atlas connection closed.");
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
}


seedDB();
