
const base = require('airtable').base('appI1pJ5PV62uUQ7d');
const { StaysService } = require("../build/stays-platform/src/stays/staysService");
const { StayAttributesService } = require("../build/stays-platform/src/stays/stayAttributes/stayAttributesService");
const { FilesClient } = require("../build/stays-platform/src/firebase/filesClient");
const http = require('http');
const fs = require("fs");

async function migrateFile(src, dst){
    //var blob = await new FilesClient().download(src);
    // const file = fs.createWriteStream("./tmp.bin");
    // const blob = await new FilesClient().download(src) 
    // file.write(blob);
    // const url = await new FilesClient().uploadFile("./tmp.bin", dst);
    return src;
}

function getCapacity(record){
    try{
        return Number(record.get('Sleeps').split("-").pop());
    }
    catch(err){
        console.log("Failed getting capactiy: ", {record});
    }
    return 1;
}

function getRate(record){
    try{
        return Number(record.get('Nightly Rate').replace("$", "").split("-")[0]);
    }
    catch(err){
        console.log("Failed getting rate: ", {record});
    }
    return 1;
}

function getBedrooms(record){
    try{
        return Number(record.get('Bedrooms').replace(" Bedrooms", "").replace("+", ""));
    }
    catch(err){
        console.log("Failed getting bedrooms: ", {record});
    }
    return 1;
}

async function saveStay(record){
    var stay = {
        name: record.get('Listing Name'),
        enable: record.get('Listing Finished?'),
        description: record.get('Listing Description'),
        currentRate: getRate(record),
        avgRate: getRate(record),
        capacity: getCapacity(record),
        bedrooms: getBedrooms(record),
        location: {
            region: record.get("Region"),
            address: {
                state: record.get('State'),
                city: record.get('City').split(",")[0]
            }
        },
        type: [],
        amenities: [],
        specialInterests: [],
        onSiteParking: record.get('Parking on site?') === "Yes",
        petsAllowed:  record.get("Pets Allowed?") === "Yes",
        demand: record.get('Demand'),
        status: "",
        social: [],
        booking: [],
        photos: [],
        tags: []
    };
    const stayAttributesService = new StayAttributesService();
    await record.get('Property Type').forEach(async (pt) => {
        await stayAttributesService.createOrUpdateStayAttribute({type: "Property Type", name:pt})
        stay.type.push(pt);
    });
    await record.get('Amenities').forEach(async (am) => {
        await stayAttributesService.createOrUpdateStayAttribute({type: "Amenity", name:am})
        stay.amenities.push(am);
    });
    await record.get('Special Interests').forEach(async (si) => {
        await stayAttributesService.createOrUpdateStayAttribute({type: "Special Interest", name:si})
        stay.specialInterests.push(si);
    });
    switch(record.get('Approved?')){
        case 'Yes':
            stay.status = 'Accepted';
            break;
        case 'No':
            stay.status = 'Rejected';
            break;
        case 'Pending':
            stay.status = 'Pending';
            break;
    }
    stay.social.push({partner: "Instagram", link: record.get('Instagram Link')});
    await stayAttributesService.createOrUpdateStayAttribute({type: "Social Partner", name:"Instagram"})
    stay.booking.push({partner: record.get('Booking Platform'), link:record.get('Booking Link')});
    await stayAttributesService.createOrUpdateStayAttribute({type: "Booking Partner", name:record.get("Booking Platform")})
    if(record.get('Thumbnail (link)')){
        const newUrl = await migrateFile(record.get('Thumbnail (link)'), "/stays/"+stay.name)
        stay.photos.push({
            url: newUrl,
            description: "",
            priority: 0
        });
    }
   
    var i = 1;
    if(record.get('Listing Photos (links)')){
        await record.get('Listing Photos (links)').split(',').forEach( async (link) => {
            const newUrl = await migrateFile(link, "/stays/"+stay.name)
            stay.photos.push({
                url: newUrl,
                description: "",
                priority: i++
            });
        });
    }
   
    try{
        await new StaysService().createOrUpdateStay(stay);
        console.log("Finihsed "+stay.name);
    }
    catch(error){
        console.log("Error creating stay: ", {error});
    }
   
}



function processRecord(record) {
    
    // try{
    //     await saveStay(record);
    // }catch(err)
    // {
    //     console.log(" Failed processing record: "+err.message, {record});
    // }
    
}

function processPage(records, atRecords) {
   
}

async function gatherRecords(){
    const atRecords = [];

    base('Stays').select({
        // Selecting the first 3 records in Listed Stays - Raw Data :
        maxRecords: 100,
        view: "Listed Stays - Raw Data "
    }).eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
            
            atRecords.push(record);
        });
        fetchNextPage();
    
    }, async function done(err) {
        if (err) { console.error(err); return; }
        console.log("Gathered "+atRecords.length+" records");
        await migrate(atRecords);
    });
    return atRecords;
}


async function migrate(atRecords){
    console.log("Gathered "+atRecords.length+" records");
    for(let record of atRecords){
        console.log("Processing: ", { record })
        try{
            await saveStay(record);
        }catch(err)
        {
            console.log(" Failed processing record: "+err.message, {record});
        }
    }
}


gatherRecords();
