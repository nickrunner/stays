import Description from "./components/Home/Description";

export const content ={ 

    images: {
        logo: {
            purple: "https://ik.imagekit.io/stays/content/stays-purple.png",
            white: "https://ik.imagekit.io/stays/content/stays-white.png",
            black: "https://ik.imagekit.io/stays/content/stays-black.png",
            width: "1800",
            height: "1000"
        },
        partners: {
            airbnb: {
                logo: "https://ik.imagekit.io/stays/content/partners/airbnb.png",
                icon: "https://ik.imagekit.io/stays/content/partners/airbnb-icon.png",
                svg: "https://ik.imagekit.io/stays/content/partners/vector-airbnb.svg"
            },
            vrbo: {
                logo: "https://ik.imagekit.io/stays/content/partners/vrbo.png",
                icon: "https://ik.imagekit.io/stays/content/partners/vrbo-icon.png",
                svg: "https://ik.imagekit.io/stays/content/partners/vector-vrbo.svg"
            },
            hipcamp: {
                logo: "https://ik.imagekit.io/stays/content/partners/hipcamp.png",
                icon: "https://ik.imagekit.io/stays/content/partners/hipcamp-icon.png",
            },
            bookingcom: {
                svg: "https://ik.imagekit.io/stays/content/partners/vector-bookingcom.svg",
            },
            expedia: {
                svg: "https://ik.imagekit.io/stays/content/partners/vector-expedia.svg",
            },
            lodgify: {
                svg: "https://ik.imagekit.io/stays/content/partners/vector-lodgify.svg",
            }
        },
        regions: {
            american: "https://ik.imagekit.io/stays/content/regions/american.png",
            coastal: "https://ik.imagekit.io/stays/content/regions/coastal.jpg",
            midwest: "https://ik.imagekit.io/stays/content/regions/midwest.jpg",
            northeast: "https://ik.imagekit.io/stays/content/regions/northeast.jpg",
            pnw: "https://ik.imagekit.io/stays/content/regions/pnw.jpg",
            southern: "https://ik.imagekit.io/stays/content/regions/southern.jpg",
            southwest: "https://ik.imagekit.io/stays/content/regions/southwest.jpg",
            western: "https://ik.imagekit.io/stays/content/regions/western.jpg",
        },
        dotMap: "https://ik.imagekit.io/stays/content/dot-map.svg",
        icon: {
            purple: "https://ik.imagekit.io/stays/content/stays-icon.png"
        },
        mockups: [
            {
                url:"https://ik.imagekit.io/stays/content/mockups/sign-in.png",
                description: "Sign In"
            },
            {
                url:"https://ik.imagekit.io/stays/content/mockups/collage.png",
                description: "Collage"
            },
            {
                url:"https://ik.imagekit.io/stays/content/mockups/computer.png",
                description: "Computer"
            },
            {
                url:"https://ik.imagekit.io/stays/content/mockups/description.png",
                description: "Description"
            },
            {
                url:"https://ik.imagekit.io/stays/content/mockups/directory.png",
                description: "Directory"
            },
            {
                url:"https://ik.imagekit.io/stays/content/mockups/listing.png",
                description: "Listing"
            },
            {
                url:"https://ik.imagekit.io/stays/content/mockups/showcase.png",
                description: "Showcase"
            }
        ],
        hero: {
            woodhouse: {
                img: "https://ik.imagekit.io/stays/content/woodhouse.jpg",
                blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwePSwuJDJJQExLR0BGRVBac2JQVW1WRUZkiGVtd3uBgoFOYI2XjH2Wc36BfP/bAEMBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAZYDNgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A8+A0wAAAAoACooAACoooACgAKigAAKigAAAAAAAAAAAAIqAAAIqAAgoioAiogIqAgAIioCIqAIqIIioCIqIJUWogzUWoAioCAKCKgACgqCCgAKiiKqCKqooKqKooAKqKoKigKigAAoACoqgAAADoArIAAACiKAqAKAAqAqgAoigAAoAAAKAAAAAAAAAAAAioAAAgAIqCiKgCKiAioCAAiKgIioAgIIioCIqIJWVRBKi1AEBUQAUQAAFABBQAFRQUBBVRQVUVRQAVUVQVFAVFAABQAAFFAAAB0EFZURQAAFQBQAURRQAFEUBUAUABUAUABUAUAAAAAAAAEAAABAABRAAQAEBAQARFQBABEVEERUBAQERUQRFRBEVARFRQBAAFAAUAEFRUBUAVUVBVRQVUFFVFBQFFABQAUAFEUAABUFFEAdAFZAAFQBQAFQBQBVEAUAFABRFAAAVAFAAAAABRAFEAAAAAEAUBAAAQBBAAQEARUBAQBFRBEVARFQEqLUQSotZQEEAQFBAAAVQQBQAABFEVBVQQVUUFVFUVUAVUVQVFAVFBRFAABRFAAAABsBWRUFFEAUAFEUUVAFEUFEUBUAUABUAURQAAURQAAAAAABAUAABAAAEBAQAEABABAQBFRBEVAQEAQRBKioCVFqIIioCAigCKoAAAAACiKAqCIqooKIqDQigqoqiiKCqgoqoAoAKIoAACoAogDYCsgAKIAqoKqiKgKgCiKooigKgCgAogCgAoigACgAAAAAAAAgAAgIAAIACAAgCKgCACAiAgAiKyAioglQqIJUWoCIqKIAoIAoAAAAAAACiKAqKiKrKoNCKCqiqKqAKqKooiiioCKAAqAKAAADQCsioAoiiioAogCqgCiKCiKCiAKACiCqqoAoigAAAIACgAgAACAAAAIAACAAgIACAIqAIIgIqAiKgIi1EEqVWaijKoIiKiggKoAAAAAAAAAAACiKCqyqI0sZVFaEVRVQBoRVFEUBUAUAFEAUAAAGgFZAAUQBRFBRAFVAFEUFEAVUAUAVRFAVAFEAUAAAAAAAAAAAAQAAAQAEABABAAQERRBAEVARFRBKioCVKVKgiLUUQEUAAAAAAAAAAAAAAAAVWVBVRUFVFQVWVUVUUFEVRRFAVAFEUAAAAGhBWVEAURQUQBVQBRFBRAFVAFVAVQAUQBQAUQBQAFQBRAFEAVAAAFBAAEBUABAAQEBABAQBABEVARFRBKi1moFZqoCItRRAFAAAAAAAAAAAAAAAABUAVUVBVZUGlZUFVAGhFBRBRVQBRAFAAABRBWVVAFEAURQUQBoQBVQFVWVBRFBRAFVAFEUFEAURQFQBRAVRAAAAEBUAAEBUABAQEABBAAQBABEVEERWQEolQRKtRREVFAAAAAAAAAAAAAAAAAAAABUAaVlUFVAVpWVEVUAVUFFEUFEAURQAAFQGVEAUQUaEAVUAVWVFURQURQUQBVQBRFBRAFVAVRAFEUAAAAAEBRAFQEAEAAAQAEEABAEVAEEAQRASiAVlaiCVCooAKAAAAAAAAAAAAAAAAAAAAAAKIoKrKoqqgDQigqsqCiKCiCiiAKIAKyowogCqyoKIA0ICtCAKqAKqAKrKqKIoKIoqiAKIoCoAogCiCCiAKIAogCoAAIACAqACAAgIAgAgIgIIAzVqVFSoVFBAVAAAAAAAAAAAAAAAAAAAAAAAAAAFAFVWVQVWVBVZUFVAFEAUBRRAEVAYUQBVZUFEUVRFBVZUFEUFEUFEUFEBWhAFEUFEAURQFQBRAFEAUQBRAAEBRAAEABAAQAEAQBURUQRFSglQQBABAFQAAAAAAAAAAAAAAAAAAAAAAAAAAVAFAFURUFEUFEAaEAUQBRAAQVhRAFVlQVWVFVWVBVZUFVAFVAFVAVVQBRFBRAFVAFEUAAFEAUQBUAAAAQBUAAQAEABABAFEEQEEASiAMqgCKioAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgCgCioIKIoqiAKIAogAIKwoigogDQgDQgDQigoigoiiqIoKIoKIAqoAoAKIAogCgAAAAgKIAqAACAqAAgCiAAggCAgiKgIgAgCiACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAoAoAAACiCCiAACoAAKgIoigoigqsqCqgDQiiqIA0IAqoAqoAoigKgCiAKIAogCiAKIAAACAAIKAgAIAioAgiAlEAQAEBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFQBRAFAFAAAAQAQVAFEUAARRFBRFBVZVRVQRVVAFVAFVAFEUFEAUABUAUQBRAFEAAAAQFQABAUBABABABAQBBEAEUABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFEUABUUAFABVQBVQFVUAUAFEAVUAUQBQAUQBRAFQAAABAAEQVAAEBRAAQQBABAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFUAAFQEVUAVUAVUAVUAUAVRFAVAFEUAAAAAAAAAAAQABAVAAQAEEABBRAQEAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAABQAAAAQVFUAAUAFEUFEUBUAUBAVAFEUAAAAUAAAAEAUQABAAQAEABAEVAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQFAAAAABQAEFRQAAURQFQBQAURQFQBRAFAAAAAAAAAABAVAABAAQAEFAQABBAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAaAAAAAAQABQAAAFRRAAFAAABQAAAFQFUQBRAFEAVAAAAEAAQAAEAAQAAEVAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAaAAAAQAAVFAAAAUFAQAAVFAAAVAFAAAQAAAAAAAQABQBAABRAQEVAABQBARUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBpAAAAAFUAAAAFAQAAAAVAFAAAAABRAFEAUQBRAAAAAEAAABABUFQABFAAEVEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQG0AAAUAAAAAAFAEAAAAAAFRQAAAAAAAAAAAAAQFQAAAAQAAURUAARQABFRAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBtAAFAAAAAAUBAAAAAAAABQAAAAAAAAAAAAAQAAAAAEAAAUQAAEUAAQEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=",
            },
            abed: {
                img: "https://ik.imagekit.io/stays/content/abed.jpg",
                blur: "data:image/jpeg;base64,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"
            }
        }
        
    },

    pages: {
        comingSoon: {
            hero: {
                main: "Coming Summer 2022",
                sub: "Connecting travelers with the best vacation rentals around the world"
            },
            description: {
                hook: "More than just a networking platform",
                line1: "is a ",
                emphasis: "free directory tool",
                line2: " that helps travelers find, follow and book their dream vacation rental", 
                
            },
            about: {
                hook: "Closing the gap between travelers and hosts",
                stayerPerks: [
                    {
                        header:"Find Your Ideal Stay",
                        sub:"Browse our directory of unique properties.  Use our powerful searching and filtering engine to find your ideal stay."
                    },
                    {
                        header:"Create a FREE or Premium Account",
                        sub:"Bookmark and share your favorite stays with anyone. Become eligible for giveaways."
                    },
                    {
                        header:"Book Before Anyone Else",
                        sub:"The best stays fill up quick! Get exclusive access bookings before anyone else."
                    },
                    {
                        header:"Win FREE \"Staycations\"",
                        sub:"Just by creating an account you are automatically entered into promotional giveaways."
                    },
                    {
                        header:"Score Discounts and Deals on Bookings",
                        sub:"Get notified of discounts and book directly to avoid paying unecessary fee's."
                    },
                    {
                        header:"Get Notified of Cancellations",
                        sub:"Get notified of discounts and book directly to avoid paying unecessary fee's."
                    }
                ],
                hostPerks: [
                    {
                        header:"Get Discovered",
                        sub:"Promote your stay in our directory. Participate in marketing and visibility campaigns to further engage potential travelers."
                    },
                    {
                        header:"Grow your Online Presence",
                        sub:"Get noticed on Social Media by travelers who are seeking out properties like yours."
                    },
                    {
                        header:"Increase your Direct Booking Traffic",
                        sub:"Cut out the middle man and direct travelers to your direct booking platform."
                    },
                    {
                        header:"Build a Loyal Audience",
                        sub:"Attract travelers with particular tastes and desires to your unique stay."
                    },
                    {
                        header:"Earn More Income",
                        sub:"Improve your vacancy rate and get more direct bookings."
                    },
                    {
                        header:"Mitigate Cancellation Risk",
                        sub:"Fill cancellations with ready and waiting travelers who have already expressed interest in your stay."
                    },
                ]
            },
           
            mockups: "Our intuitive interface allows for a seamless user experience.",
            partners: "We work alongside the most popular booking platforms",
            details: {
                header: "is a game-changer",
                sub1: "Vacation rental hosts have become increasingly dependent on large booking platforms such as Airbnb, VRBO, etc for not only their booking management, but also for their marketing and visibility.",
                sub2: "Stays.co allows hosts to create 'Stay Profiles' on our website that allow travelers to find them, engage with their linked social media pages, visit their private website and/or be directed to book on any existing platform the host may be listed on."
            }
        }
    }
    
}   