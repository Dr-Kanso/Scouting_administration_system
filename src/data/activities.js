/**
 * Scout Activities Database
 * 
 * IMPORTANT: When adding activities, ensure that badge names EXACTLY match 
 * the names used in beaverBadges.js, cubBadges.js, and scoutBadges.js
 * This is critical for the badge filtering to work correctly.
 */
let activities = [
  {
    title: "Book in a bag",
    url: "https://www.scouts.org.uk/activities/book-in-a-bag/",
    details: {
      time: "30 mins",
      cost: "£",
      location: "Indoors / At home",
      groupSize: "Individuals",
      suitableFor: ["Cubs", "Scouts"]
    },
    countsTowards: {
      Cubs: ["Cubs Book Reader Activity Badge"],
      Scouts: ["Scouts Writer Activity Badge"]
    }
  },
  {
    title: "A virtual Remembrance reflection",
    url: "https://www.scouts.org.uk/activities/a-virtual-remembrance-reflection/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Online",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers My World Challenge Award"],
      Cubs: ["Cubs Our World Challenge Award"],
      Scouts: ["Scouts World Challenge Award"]
      // Explorers section doesn't list specific badges in the provided mhtml
    }
  },
  {
    title: "Accessibility barriers scavenger hunt",
    url: "https://www.scouts.org.uk/activities/accessibility-barriers-scavenger-hunt/",
    details: {
      time: "1 hr",
      cost: "Free",
      location: "Indoors / Outdoors",
      groupSize: "Teams",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Cubs: ["Cubs Disability Awareness Activity Badge"]
    }
  },
  {
    title: "Advert savvy",
    url: "https://www.scouts.org.uk/activities/advert-savvy/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Cubs", "Scouts"]
    },
    countsTowards: {
      Cubs: ["Cubs Our Skills Challenge Award"],
      Scouts: ["Scouts Creative Challenge Award"]
    }
  },
  {
    title: "Aerial runway",
    url: "https://www.scouts.org.uk/activities/aerial-runway/",
    details: {
      time: "1 hr 30 mins",
      cost: "££",
      location: "Outdoors",
      groupSize: "Whole section",
      suitableFor: ["Scouts", "Explorers"]
    },
    countsTowards: {
      Scouts: ["Scouts Pioneer Activity Badge"],
      Explorers: ["Explorers Pioneer Activity Badge"]
    }
  },
  {
    title: "Air pollution detectives",
    url: "https://www.scouts.org.uk/activities/air-pollution-detectives/",
    details: {
      time: "1 hr",
      cost: "Free",
      location: "Indoors / Outdoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs", "Scouts"]
    },
    countsTowards: {
      Beavers: ["Beavers My World Challenge Award"],
      Cubs: ["Cubs Our World Challenge Award"],
      Scouts: ["Scouts World Challenge Award"]
    }
  },
  {
    title: "Airfield hazard game",
    url: "https://www.scouts.org.uk/activities/airfield-hazard-game/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers Air Activities Stage 1 Activity Badge"],
      Cubs: ["Cubs Air Activities Stage 2 Activity Badge"]
    }
  },
  {
    title: "Alex's Promise",
    url: "https://www.scouts.org.uk/activities/alexs-promise/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers"]
    },
    countsTowards: {
      Beavers: ["Beavers Membership Award"]
    }
  },
  {
    title: "All aboard the train",
    url: "https://www.scouts.org.uk/activities/all-aboard-the-train/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers"]
    },
    countsTowards: {
      Beavers: ["Beavers My Skills Challenge Award"]
    }
  },
  {
    title: "All the rights moves",
    url: "https://www.scouts.org.uk/activities/all-the-rights-moves/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers My World Challenge Award"],
      Cubs: ["Cubs Our World Challenge Award"],
      Scouts: ["Scouts World Challenge Award"],
      Explorers: ["Explorers World Challenge Award"]
    }
  },
  {
    title: "All tied up",
    url: "https://www.scouts.org.uk/activities/all-tied-up/",
    details: {
      time: "30 mins",
      cost: "£",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Cubs", "Scouts"]
    },
    countsTowards: {
      Cubs: ["Cubs Pioneer Activity Badge"],
      Scouts: ["Scouts Pioneer Activity Badge"]
    }
  },
  {
    title: "Amelia’s aeroplane Olympics",
    url: "https://www.scouts.org.uk/activities/amelias-aeroplane-olympics/",
    details: {
      time: "30 mins",
      cost: "£",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers Air Activities Stage 1 Activity Badge"],
      Cubs: ["Cubs Air Activities Stage 2 Activity Badge"]
    }
  },
  {
    title: "An in-tents year",
    url: "https://www.scouts.org.uk/activities/an-in-tents-year/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers My Adventure Challenge Award"],
      Cubs: ["Cubs Our Adventure Challenge Award"],
      Scouts: ["Scouts Adventure Challenge Award"],
      Explorers: ["Explorers Adventure Challenge Award"]
    }
  },
  {
    title: "Animal detectives",
    url: "https://www.scouts.org.uk/activities/animal-detectives/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Outdoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers Animal Friend Activity Badge", "Beavers Explore Activity Badge"],
      Cubs: ["Cubs Animal Carer Activity Badge", "Cubs Naturalist Activity Badge"]
    }
  },
  {
    title: "Animal diary",
    url: "https://www.scouts.org.uk/activities/animal-diary/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "At home",
      groupSize: "Individuals",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers Animal Friend Activity Badge"],
      Cubs: ["Cubs Animal Carer Activity Badge"]
    }
  },
  {
    title: "Animal friends",
    url: "https://www.scouts.org.uk/activities/animal-friends/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers"]
    },
    countsTowards: {
      Beavers: ["Beavers Animal Friend Activity Badge"]
    }
  },
  {
    title: "Animal tales",
    url: "https://www.scouts.org.uk/activities/animal-tales/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers Animal Friend Activity Badge"],
      Cubs: ["Cubs Animal Carer Activity Badge"]
    }
  },
  {
    title: "Art apart",
    url: "https://www.scouts.org.uk/activities/art-apart/",
    details: {
      time: "30 mins",
      cost: "£",
      location: "Indoors / Online",
      groupSize: "Individuals",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers Creative Activity Badge"],
      Cubs: ["Cubs Artist Activity Badge"],
      Scouts: ["Scouts Artist Activity Badge"],
      Explorers: ["Explorers Creative Arts Activity Badge"]
    }
  },
  {
    title: "As quiet as a train",
    url: "https://www.scouts.org.uk/activities/as-quiet-as-a-train/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers"]
    },
    countsTowards: {
      Beavers: ["Beavers My Skills Challenge Award"]
    }
  },
  {
    title: "Ask big questions about science",
    url: "https://www.scouts.org.uk/activities/ask-big-questions-about-science/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers Experiment Activity Badge"],
      Cubs: ["Cubs Scientist Activity Badge"],
      Scouts: ["Scouts Scientist Activity Badge"],
      Explorers: ["Explorers Science Activity Badge"]
    }
  },
  {
    title: "Ask big questions about writing",
    url: "https://www.scouts.org.uk/activities/ask-big-questions-about-writing/",
    details: {
      time: "30 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers Book Reader Activity Badge"],
      Cubs: ["Cubs Book Reader Activity Badge"],
      Scouts: ["Scouts Writer Activity Badge"],
      Explorers: ["Explorers Creative Arts Activity Badge"]
    }
  },
  {
    title: "Aviation designation",
    url: "https://www.scouts.org.uk/activities/aviation-designation/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers Air Activities Stage 1 Activity Badge"],
      Cubs: ["Cubs Air Activities Stage 2 Activity Badge"]
    }
  },
  {
    title: "Awarding top awards",
    url: "https://www.scouts.org.uk/activities/awarding-top-awards/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors / Outdoors / Online",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers Chief Scout's Bronze Award"],
      Cubs: ["Cubs Chief Scout's Silver Award"],
      Scouts: ["Scouts Chief Scout's Gold Award"],
      Explorers: ["Explorers Chief Scout's Platinum Award", "Explorers Chief Scout's Diamond Award", "King's Scout Award"]
    }
  },
  {
    title: "Awards celebrations",
    url: "https://www.scouts.org.uk/activities/awards-celebrations/",
    details: {
      time: "1 hr",
      cost: "£",
      location: "Indoors / Outdoors / Online",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers Chief Scout's Bronze Award"],
      Cubs: ["Cubs Chief Scout's Silver Award"],
      Scouts: ["Scouts Chief Scout's Gold Award"],
      Explorers: ["Explorers Chief Scout's Platinum Award", "Explorers Chief Scout's Diamond Award", "King's Scout Award"]
    }
  },
  {
    title: "Badge bingo bonanza",
    url: "https://www.scouts.org.uk/activities/badge-bingo-bonanza/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs", "Scouts"]
    },
    countsTowards: {
      Beavers: ["Beavers My Adventure Challenge Award"],
      Cubs: ["Cubs Our Adventure Challenge Award"],
      Scouts: ["Scouts Adventure Challenge Award"]
    }
  },
  {
    title: "Bake Brazilian brigadeiros",
    url: "https://www.scouts.org.uk/activities/bake-brazilian-brigadeiros/",
    details: {
      time: "1 hr",
      cost: "£",
      location: "Indoors / At home",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Beavers: ["Beavers Cook Activity Badge", "Beavers International Activity Badge"],
      Cubs: ["Cubs Chef Activity Badge", "Cubs International Activity Badge"],
      Scouts: ["Scouts Chef Activity Badge", "Scouts International Activity Badge"],
      Explorers: ["Explorers Chef Activity Badge", "Explorers International Activity Badge"]
    }
  },
  {
    title: "Bake or boil?",
    url: "https://www.scouts.org.uk/activities/bake-or-boil/",
    details: {
      time: "1 hr",
      cost: "£",
      location: "Outdoors",
      groupSize: "Small groups",
      suitableFor: ["Cubs", "Scouts", "Explorers"]
    },
    countsTowards: {
      Cubs: ["Cubs Backwoods Cooking Activity Badge"],
      Scouts: ["Scouts Backwoods Cooking Activity Badge"],
      Explorers: ["Explorers Survival Skills Activity Badge"]
    }
  },
  {
    title: "Balancing act",
    url: "https://www.scouts.org.uk/activities/balancing-act/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers My Skills Challenge Award"],
      Cubs: ["Cubs Our Skills Challenge Award"]
    }
  },
  {
    title: "Balloon balance battle",
    url: "https://www.scouts.org.uk/activities/balloon-balance-battle/",
    details: {
      time: "15 mins",
      cost: "£",
      location: "Indoors",
      groupSize: "Whole section",
      suitableFor: ["Beavers", "Cubs"]
    },
    countsTowards: {
      Beavers: ["Beavers My Skills Challenge Award"],
      Cubs: ["Cubs Our Skills Challenge Award"]
    }
  },
  {
    title: "BP phone home",
    url: "https://www.scouts.org.uk/activities/bp-phone-home/",
    details: {
      time: "15 mins",
      cost: "Free",
      location: "Indoors",
      groupSize: "Small groups",
      suitableFor: ["Beavers", "Cubs", "Scouts"]
    },
    countsTowards: {
      Beavers: ["Beavers Communicator Activity Badge"],
      Cubs: ["Cubs Communicator Activity Badge"],
      Scouts: ["Scouts Communicator Activity Badge"]
    }
  }
  // Add more activity objects here later
];

export default activities;
