import { default as config } from "../config.json";

export const BASE_IMG_URL = "https://ik.imagekit.io/stays/" + config.env + "/content";

export const content = {
  images: {
    sectionDivider: BASE_IMG_URL + "/section-divider.svg",
    logo: {
      purple: BASE_IMG_URL + "/logos/stays-purple.svg",
      white: BASE_IMG_URL + "/logos/stays-white.png",
      black: BASE_IMG_URL + "/logos/stays-black.png",
      width: "1800",
      height: "1000"
    },
    partners: {
      airbnb: {
        logo: BASE_IMG_URL + "/partners/vector-airbnb.svg",
        icon: BASE_IMG_URL + "/partners/vector-airbnb-icon.svg"
      },
      vrbo: {
        logo: BASE_IMG_URL + "/partners/vector-vrbo.svg",
        icon: BASE_IMG_URL + "/partners/vector-vrbo-icon.svg"
      },
      hipcamp: {
        logo: BASE_IMG_URL + "/partners/hipcamp.png",
        icon: BASE_IMG_URL + "/partners/vector-hipcamp-icon.svg"
      },
      bookingcom: {
        logo: BASE_IMG_URL + "/partners/vector-bookingcom.svg"
      },
      expedia: {
        logo: BASE_IMG_URL + "/partners/vector-expedia.svg"
      },
      lodgify: {
        logo: BASE_IMG_URL + "/partners/vector-lodgify.svg",
        icon: BASE_IMG_URL + "/partners/vector-lodgify-icon.svg"
      }
    },
    regions: {
      american: BASE_IMG_URL + "/regions/american.png",
      coastal: BASE_IMG_URL + "/regions/coastal.jpg",
      midwest: BASE_IMG_URL + "/regions/midwest.jpg",
      northeast: BASE_IMG_URL + "/regions/northeast.jpg",
      pnw: BASE_IMG_URL + "/regions/pnw.jpg",
      southern: BASE_IMG_URL + "/regions/southern.jpg",
      southwest: BASE_IMG_URL + "/regions/southwest.jpg",
      western: BASE_IMG_URL + "/regions/western.jpg"
    },
    dotMap: BASE_IMG_URL + "/dot-map.svg",
    icon: {
      purple: BASE_IMG_URL + "/stays-icon.png"
    },
    mockups: [
      {
        url: BASE_IMG_URL + "/mockups/sign-in.png",
        description:
          "Member login portal so you can bookmark your favorite stays, access deals, enter giveaways, and more"
      },
      {
        url: BASE_IMG_URL + "/mockups/directory.png",
        description:
          "Browse our hand-picked selection of stays that offer sophisticated design, prime location, or a unique experience."
      },
      {
        url: BASE_IMG_URL + "/mockups/collage.png",
        description:
          "Narrow down your stay search by filtering options by property type, location, special interests, and more."
      },
      {
        url: BASE_IMG_URL + "/mockups/listing.png",
        description:
          "Discover hidden gems from around the world. Learn what they can offer, and then get directed to their booking and/or social media pages."
      }
    ],
    hero: {
      woodhouse: {
        img: BASE_IMG_URL + "/woodhouse.jpg",
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwePSwuJDJJQExLR0BGRVBac2JQVW1WRUZkiGVtd3uBgoFOYI2XjH2Wc36BfP/bAEMBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAZYDNgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A8+A0wAAAAoACooAACoooACgAKigAAKigAAAAAAAAAAAAIqAAAIqAAgoioAiogIqAgAIioCIqAIqIIioCIqIJUWogzUWoAioCAKCKgACgqCCgAKiiKqCKqooKqKooAKqKoKigKigAAoACoqgAAADoArIAAACiKAqAKAAqAqgAoigAAoAAAKAAAAAAAAAAAAioAAAgAIqCiKgCKiAioCAAiKgIioAgIIioCIqIJWVRBKi1AEBUQAUQAAFABBQAFRQUBBVRQVUVRQAVUVQVFAVFAABQAAFFAAAB0EFZURQAAFQBQAURRQAFEUBUAUABUAUABUAUAAAAAAAAEAAABAABRAAQAEBAQARFQBABEVEERUBAQERUQRFRBEVARFRQBAAFAAUAEFRUBUAVUVBVRQVUFFVFBQFFABQAUAFEUAABUFFEAdAFZAAFQBQAFQBQBVEAUAFABRFAAAVAFAAAAABRAFEAAAAAEAUBAAAQBBAAQEARUBAQBFRBEVARFQEqLUQSotZQEEAQFBAAAVQQBQAABFEVBVQQVUUFVFUVUAVUVQVFAVFBRFAABRFAAAABsBWRUFFEAUAFEUUVAFEUFEUBUAUABUAURQAAURQAAAAAABAUAABAAAEBAQAEABABAQBFRBEVAQEAQRBKioCVFqIIioCAigCKoAAAAACiKAqCIqooKIqDQigqoqiiKCqgoqoAoAKIoAACoAogDYCsgAKIAqoKqiKgKgCiKooigKgCgAogCgAoigACgAAAAAAAAgAAgIAAIACAAgCKgCACAiAgAiKyAioglQqIJUWoCIqKIAoIAoAAAAAAACiKAqKiKrKoNCKCqiqKqAKqKooiiioCKAAqAKAAADQCsioAoiiioAogCqgCiKCiKCiAKACiCqqoAoigAAAIACgAgAACAAAAIAACAAgIACAIqAIIgIqAiKgIi1EEqVWaijKoIiKiggKoAAAAAAAAAAACiKCqyqI0sZVFaEVRVQBoRVFEUBUAUAFEAUAAAGgFZAAUQBRFBRAFVAFEUFEAVUAUAVRFAVAFEAUAAAAAAAAAAAAQAAAQAEABABAAQERRBAEVARFRBKioCVKVKgiLUUQEUAAAAAAAAAAAAAAAAVWVBVRUFVFQVWVUVUUFEVRRFAVAFEUAAAAGhBWVEAURQUQBVQBRFBRAFVAFVAVQAUQBQAUQBQAFQBRAFEAVAAAFBAAEBUABAAQEBABAQBABEVARFRBKi1moFZqoCItRRAFAAAAAAAAAAAAAAAABUAVUVBVZUGlZUFVAGhFBRBRVQBRAFAAABRBWVVAFEAURQUQBoQBVQFVWVBRFBRAFVAFEUFEAURQFQBRAVRAAAAEBUAAEBUABAQEABBAAQBABEVEERWQEolQRKtRREVFAAAAAAAAAAAAAAAAAAAABUAaVlUFVAVpWVEVUAVUFFEUFEAURQAAFQGVEAUQUaEAVUAVWVFURQURQUQBVQBRFBRAFVAVRAFEUAAAAAEBRAFQEAEAAAQAEEABAEVAEEAQRASiAVlaiCVCooAKAAAAAAAAAAAAAAAAAAAAAAKIoKrKoqqgDQigqsqCiKCiCiiAKIAKyowogCqyoKIA0ICtCAKqAKqAKrKqKIoKIoqiAKIoCoAogCiCCiAKIAogCoAAIACAqACAAgIAgAgIgIIAzVqVFSoVFBAVAAAAAAAAAAAAAAAAAAAAAAAAAAFAFVWVQVWVBVZUFVAFEAUBRRAEVAYUQBVZUFEUVRFBVZUFEUFEUFEUFEBWhAFEUFEAURQFQBRAFEAUQBRAAEBRAAEABAAQAEAQBURUQRFSglQQBABAFQAAAAAAAAAAAAAAAAAAAAAAAAAAVAFAFURUFEUFEAaEAUQBRAAQVhRAFVlQVWVFVWVBVZUFVAFVAFVAVVQBRFBRAFVAFEUAAFEAUQBUAAAAQBUAAQAEABABAFEEQEEASiAMqgCKioAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKgCgCioIKIoqiAKIAogAIKwoigogDQgDQgDQigoigoiiqIoKIoKIAqoAoAKIAogCgAAAAgKIAqAACAqAAgCiAAggCAgiKgIgAgCiACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAoAoAAACiCCiAACoAAKgIoigoigqsqCqgDQiiqIA0IAqoAqoAoigKgCiAKIAogCiAKIAAACAAIKAgAIAioAgiAlEAQAEBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFQBRAFAFAAAAQAQVAFEUAARRFBRFBVZVRVQRVVAFVAFVAFEUFEAUABUAUQBRAFEAAAAQFQABAUBABABABAQBBEAEUABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFEUABUUAFABVQBVQFVUAUAFEAVUAUQBQAUQBRAFQAAABAAEQVAAEBRAAQQBABAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFUAAFQEVUAVUAVUAVUAUAVRFAVAFEUAAAAAAAAAAAQABAVAAQAEEABBRAQEAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAABQAAAAQVFUAAUAFEUFEUBUAUBAVAFEUAAAAUAAAAEAUQABAAQAEABAEVAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQFAAAAABQAEFRQAAURQFQBQAURQFQBRAFAAAAAAAAAABAVAABAAQAEFAQABBAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAaAAAAAAQABQAAAFRRAAFAAABQAAAFQFUQBRAFEAVAAAAEAAQAAEAAQAAEVAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAaAAAAQAAVFAAAAUFAQAAVFAAAVAFAAAQAAAAAAAQABQBAABRAQEVAABQBARUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBpAAAAAFUAAAAFAQAAAAVAFAAAAABRAFEAUQBRAAAAAEAAABABUFQABFAAEVEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQG0AAAUAAAAAAFAEAAAAAAFRQAAAAAAAAAAAAAQFQAAAAQAAURUAARQABFRAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBtAAFAAAAAAUBAAAAAAAABQAAAAAAAAAAAAAQAAAAAEAAAUQAAEUAAQEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
      },
      abed: {
        img: BASE_IMG_URL + "/abed.jpg",
        blur: "data:image/jpeg;base64,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"
      },
      treehouse: {
        img: BASE_IMG_URL + "/treehouse-hero.jpg",
        blur: "data:image/jpeg;base64,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"
      }
    }
  },

  pages: {
    comingSoon: {
      hero: {
        main: "For those who love to stay",
        sub: "Discover the best vacation stays, get exclusive deals and have chances to win getaways with a free membership"
      },
      description: {
        header: "Stays.co is a directory of top-tier stays with an exclusive perks program",
        headerSub: "Serving both travelers and hosts",
        sub1: "Travelers get a curated list of the most desirable vacation stays while also getting exclusive access to the best deals across the most popular booking platforms.",
        sub2: "Hosts can get their stay discovered, direct interested travelers to the booking site of their choice, and then contact them with discounts, deals and information.",
        line2: "We work alongside the most popular booking platforms"
      },
      about: {
        header: "What do stays.co members get?",
        sub1: "For Travelers",
        sub2: "For Hosts",
        stayerPerks: [
          {
            header: "Find Your Ideal Stay",
            sub: "Browse our directory of unique properties.  Use our powerful searching and filtering engine to find your ideal stay."
          },
          {
            header: "Create a FREE or Premium Account",
            sub: "Bookmark and share your favorite stays with anyone. Become eligible for giveaways."
          },
          {
            header: "Book Before Anyone Else",
            sub: "The best stays fill up quick! Get exclusive access bookings before anyone else."
          },
          {
            header: 'Win FREE "Staycations"',
            sub: "Just by creating an account you are automatically entered into promotional giveaways."
          },
          {
            header: "Score Discounts and Deals on Bookings",
            sub: "Get notified of discounts and book directly to avoid paying unecessary fee's."
          },
          {
            header: "Get Notified of Cancellations",
            sub: "Get notified of discounts and book directly to avoid paying unecessary fee's."
          }
        ],
        hostPerks: [
          {
            header: "Get Discovered",
            sub: "Promote your stay in our directory. Participate in marketing and visibility campaigns to further engage potential travelers."
          },
          {
            header: "Grow your Online Presence",
            sub: "Get noticed on Social Media by travelers who are seeking out properties like yours."
          },
          {
            header: "Increase your Direct Booking Traffic",
            sub: "Cut out the middle man and direct travelers to your direct booking platform."
          },
          {
            header: "Build a Loyal Audience",
            sub: "Attract travelers with particular tastes and desires to your unique stay."
          },
          {
            header: "Earn More Income",
            sub: "Improve your vacancy rate and get more direct bookings."
          },
          {
            header: "Mitigate Cancellation Risk",
            sub: "Fill cancellations with ready and waiting travelers who have already expressed interest in your stay."
          }
        ]
      },

      mockups: "Built by travelers, for travelers",
      socialProof: {
        header: "Our online community already has over 1 million travelers and hosts",
        sub: "We use the power of our online community to connect eager travelers with the most amazing stays from across the globe."
      },
      details: {
        header: "Why Should I join?",
        dropdowns: [
          {
            header: "As a Traveler",
            sections: [
              {
                heading: "Find the best without the mess.",
                text: `Airbnb and other big booking platforms are great and all, but for a passionate traveler who values their lodging experience, they just don’t quite get the job done. With so many new rental options saturating these platforms, it's hard to find the best of the best. And even when you do, it’s probably already booked. Ugh!`
              },
              {
                heading: "Travelers get an upper hand.",
                text: "Not only do we provide an amazing directory of hand-picked stays for you to browse, filter and bookmark, but we also give you special membership perks that can save you money and get you stay opportunities you otherwise never would have had."
              },
              {
                heading: "Stop paying crazy fees.",
                text: "Big booking platforms want to keep you on their platform ONLY so you can’t book through other channels or even connect with hosts directly. They do this to ensure you pay their service and booking fees. Stays says no more to this nonsense! When you find a stay that you love on stays.co, you’ll find direct links to all its booking pages and social media accounts. From there, you can shop around and book your stay on the platform with the best price and lowest fees. Plus, many of the stays on our platform utilize their own private booking websites instead of using booking platforms like Airbnb, VRBO, etc. What does that mean for you? It means you’ll get better prices and fewer fees since both you and the hosts can cut out the big booking platform middle man!"
              },
              {
                heading: "No availability? No problem.",
                text: "Oh no! The stay you found and fell in love with is fully booked. No problem—just add it to your stays.co “favorites” list and you’ll be notified if/when the stay has cancellations or gives out early access to its next upcoming booking calendar."
              },
              {
                heading: "Save, win and stay! ",
                text: `In a similar fashion as other online tools such as Scott’s Cheap Flights, stays.co allows hosts to send you special offers and discounts. We even take it another level by collaborating with some of our partnered stays to run FREE stay giveaways to our members. Once a member, you’re automatically entered into ALL giveaway contests. That's right—you can have chances to win amazing vacation stays in your sleep once a member.`
              }
            ]
          },
          {
            header: "As a Host",
            sections: [
              {
                heading: "Travelers want to find you.",
                text: `Travelers want to book the best stays. They want to know about deals and discounts. They want to follow a beautiful stay’s social media account. When hosts rely exclusively on large booking platforms such as Airbnb and VRBO, the bridge between travelers and hosts becomes extremely difficult to cross. Travelers become very limited in how they can find and engage with your business.`
              },
              {
                heading: "Break the dependency.",
                text: " Large booking platforms have one goal: to keep all users exclusively on their website. This prevents travelers from being able to connect with hosts over the long term and it forces hosts to rely on the platform for marketing, visibility and business growth. This creates an environment of dependency for both travelers and hosts alike."
              },
              {
                heading: "Build a business and a brand, not just a rental.",
                text: "Stays.co offers hosts a competitive edge that improves their ability to source more bookings, expand their brand and grow their social media audiences. All these factors will be so important to maintain a viable rental business as the vacation rental market continues to explode in the coming years."
              },
              {
                heading:
                  "Our goal is to use our industry expertise, innovative platform and massive online community to drive traffic to your listing through curation, marketing, and promotion.",
                text: `Since Stays was founded in 2019, our online community has been built around bringing value to both ends of the vacation rental industry. And now we can bring even more value with our innovative stay.co platform. If you’re a host and would like to apply to join the community, please join the waitlist and we will be in touch come Summer 2022.`
              }
            ]
          }
        ]
      }
    }
  }
};
