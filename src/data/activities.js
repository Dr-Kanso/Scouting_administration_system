/**
 * Scout Activities Database
 * 
 * IMPORTANT: When adding activities, ensure that badge names EXACTLY match 
 * the names used in beaverBadges.js, cubBadges.js, and scoutBadges.js
 * This is critical for the badge filtering to work correctly.
 */

let activities = [ // Changed const to let to allow reassignment
  {
    id: 'whats-the-drill',
    name: "What's the Drill",
    type: "Sports",
    description: "Learn and practice rugby drills and skills",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/what-s-the-drill/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Sports" }, // Standardized name
      { section: "Cubs", name: "Sports Enthusiast" }, // Standardized name
      { section: "Scouts", name: "Sports" } // Standardized name
    ]
  },
  // Adding first 50 activities from activities-1.txt
  {
    id: 'a-virtual-remembrance-reflection',
    name: "A Virtual Remembrance Reflection",
    type: "Creative",
    description: "Reflect on remembrance in a virtual setting",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/a-virtual-remembrance-reflection/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'accessibility-barriers-scavenger-hunt',
    name: "Accessibility Barriers Scavenger Hunt",
    type: "Awareness",
    description: "Find and identify accessibility barriers in your surroundings",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/accessibility-barriers-scavenger-hunt/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Disability Awareness" },
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'adventure-responsibly',
    name: "Adventure Responsibly",
    type: "Outdoors",
    description: "Learn about responsible outdoor adventuring",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/adventure-responsibly/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'advert-savvy',
    name: "Advert Savvy",
    type: "Skills",
    description: "Learn to recognize advertising techniques",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/advert-savvy/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Citizen" },
      { section: "Scouts", name: "Media Relations" }
    ]
  },
  {
    id: 'aerial-runway',
    name: "Aerial Runway",
    type: "Adventure",
    description: "Build and use a simple aerial runway",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/aerial-runway/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'air-pollution-detectives',
    name: "Air Pollution Detectives",
    type: "Environment",
    description: "Investigate and learn about air pollution in your area",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/air-pollution-detectives/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'airfield-hazard-game',
    name: "Airfield Hazard Game",
    type: "Games",
    description: "Learn about airfield safety through an interactive game",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/airfield-hazard-game/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Air Activities" },
      { section: "Scouts", name: "Air Spotter" }
    ]
  },
  {
    id: 'alexs-promise',
    name: "Alex's Promise",
    type: "Values",
    description: "Activity about the Scout Promise and its meaning",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/alexs-promise/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Promise Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'all-aboard-the-train',
    name: "All Aboard the Train",
    type: "Games",
    description: "A fun train-themed teamwork activity",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/all-aboard-the-train/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'all-the-rights-moves',
    name: "All the Rights Moves",
    type: "Awareness",
    description: "Learn about children's rights through movement and games",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/all-the-rights-moves/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'all-tied-up',
    name: "All Tied Up",
    type: "Skills",
    description: "Practice useful knot-tying skills",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/all-tied-up/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'amelias-aeroplane-olympics',
    name: "Amelia's Aeroplane Olympics",
    type: "Creative",
    description: "Create and compete with paper aeroplanes",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/amelia-s-aeroplane-olympics/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Air Activities" },
      { section: "Cubs", name: "Air Activities" }
    ]
  },
  {
    id: 'an-in-tents-year',
    name: "An In-Tents Year",
    type: "Outdoors",
    description: "Plan a year of camping activities",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/an-in-tents-year/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'animal-detectives',
    name: "Animal Detectives",
    type: "Nature",
    description: "Track and identify animals in your local area",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/animal-detectives/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Animal Friend" },
      { section: "Cubs", name: "Animal Carer" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'animal-diary',
    name: "Animal Diary",
    type: "Nature",
    description: "Learn about and document animal behavior",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/animal-diary/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Animal Friend" },
      { section: "Cubs", name: "Animal Carer" }
    ]
  },
  {
    id: 'animal-friends',
    name: "Animal Friends",
    type: "Nature",
    description: "Activities to learn about animals and their needs",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/animal-friends/",
    suitable: ["Beavers"],
    badges: [
      { section: "Beavers", name: "Animal Friend" }
    ]
  },
  {
    id: 'animal-tales',
    name: "Animal Tales",
    type: "Creative",
    description: "Create stories featuring animal characters",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/animal-tales/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'art-apart',
    name: "Art Apart",
    type: "Creative",
    description: "Collaborative art activity that can be done remotely",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/art-apart/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'as-quiet-as-a-train',
    name: "As Quiet as a Train",
    type: "Games",
    description: "A stealth and coordination game with a train theme",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/as-quiet-as-a-train/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'ask-big-questions-about-science',
    name: "Ask Big Questions About Science",
    type: "STEM",
    description: "Explore scientific concepts through inquiry and discussion",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/ask-big-questions-about-science/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'ask-big-questions-about-writing',
    name: "Ask Big Questions About Writing",
    type: "Creative",
    description: "Explore storytelling and writing through discussions",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/ask-big-questions-about-writing/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Writer" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'aviation-designation',
    name: "Aviation Designation",
    type: "STEM",
    description: "Learn about aviation codes and terminology",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/aviation-designation/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Air Activities" },
      { section: "Scouts", name: "Air Spotter" }
    ]
  },
  {
    id: 'awarding-top-awards',
    name: "Awarding Top Awards",
    type: "Celebration",
    description: "Learn how to recognize achievements with special ceremonies",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/awarding-top-awards/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Personal Challenge" },
      { section: "Cubs", name: "Personal Challenge" },
      { section: "Scouts", name: "Personal Challenge" }
    ]
  },
  {
    id: 'awards-celebrations',
    name: "Awards Celebrations",
    type: "Celebration",
    description: "Organize special ceremonies to celebrate achievements",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/awards-celebrations/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Challenge Award" },
      { section: "Cubs", name: "Our Challenge Award" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'bp-phone-home',
    name: "BP Phone Home",
    type: "Communication",
    description: "Learn about communication through a fun scouting-themed activity",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/bp-phone-home/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Communicator" },
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Communicator" }
    ]
  },
  {
    id: 'badge-bingo-bonanza',
    name: "Badge Bingo Bonanza",
    type: "Games",
    description: "Play bingo while learning about Scout badges",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/badge-bingo-bonanza/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'bake-brazilian-brigadeiros',
    name: "Bake Brazilian Brigadeiros",
    type: "Cooking",
    description: "Learn to make delicious Brazilian chocolate treats",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/bake-brazilian-brigadeiros/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Cook" },
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'bake-or-boil',
    name: "Bake or Boil",
    type: "Cooking",
    description: "Learn different cooking methods for outdoor cooking",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/bake-or-boil/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'balancing-act',
    name: "Balancing Act",
    type: "Physical",
    description: "Practice balance and coordination skills",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/balancing-act/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Health and Fitness" },
      { section: "Cubs", name: "Physical Recreation" }
    ]
  },
  {
    id: 'balloon-balance-battle',
    name: "Balloon Balance Battle",
    type: "Games",
    description: "Fun team game involving balloon balancing",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/balloon-balance-battle/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'banding-together',
    name: "Banding Together",
    type: "Music",
    description: "Create music together using simple instruments",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/banding-together/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Musician" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'bark-worse-than-their-bite',
    name: "Bark Worse Than Their Bite",
    type: "Nature",
    description: "Learn about trees and their bark through fun activities",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/bark-worse-than-their-bite/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'be-a-food-detective',
    name: "Be a Food Detective",
    type: "Health",
    description: "Learn about food ingredients and nutrition labels",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-a-food-detective/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'be-a-top-banana-with-a-message-of-kindness',
    name: "Be a Top Banana with a Message of Kindness",
    type: "Values",
    description: "Create kindness messages using bananas",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/be-a-top-banana-with-a-message-of-kindness/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'be-an-autism-friendly-champion',
    name: "Be an Autism Friendly Champion",
    type: "Awareness",
    description: "Learn about autism and how to be inclusive",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-autism-friendly-champion/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Disability Awareness" },
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'be-an-emergency-aider-burns',
    name: "Be an Emergency Aider: Burns",
    type: "First Aid",
    description: "Learn how to treat burn injuries in emergency situations",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-burns/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-choking',
    name: "Be an Emergency Aider: Choking",
    type: "First Aid",
    description: "Learn how to respond to choking emergencies",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-choking/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-circulation',
    name: "Be an Emergency Aider: Circulation",
    type: "First Aid",
    description: "Learn how to check and maintain circulation in emergencies",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-circulation/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-extreme-temperatures',
    name: "Be an Emergency Aider: Extreme Temperatures",
    type: "First Aid",
    description: "Learn how to respond to heat and cold-related emergencies",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-extreme-temperatures/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-head-injuries',
    name: "Be an Emergency Aider: Head Injuries",
    type: "First Aid",
    description: "Learn how to respond to head injury emergencies",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-head-injuries/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-heart-attacks-and-strokes',
    name: "Be an Emergency Aider: Heart Attacks and Strokes",
    type: "First Aid",
    description: "Learn how to recognize and respond to heart attacks and strokes",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-heart-attacks-and-strokes/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-primary-survey',
    name: "Be an Emergency Aider: Primary Survey",
    type: "First Aid",
    description: "Learn how to conduct a primary survey in emergencies",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-primary-survey/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-spinal-injuries',
    name: "Be an Emergency Aider: Spinal Injuries",
    type: "First Aid",
    description: "Learn how to respond to suspected spinal injuries",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-spinal-injuries/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-an-emergency-aider-sprains-strains-and-broken-bones',
    name: "Be an Emergency Aider: Sprains, Strains, and Broken Bones",
    type: "First Aid",
    description: "Learn how to respond to limb injuries",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-an-emergency-aider-sprains-strains-and-broken-bones/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'be-the-change',
    name: "Be the Change",
    type: "Community",
    description: "Plan and implement positive changes in your community",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/be-the-change/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'be-thaw-you-go',
    name: "Be Thaw You Go",
    type: "Winter Sports",
    description: "Learn about ice safety and rescue techniques",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/be-thaw-you-go/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'beach-bingo',
    name: "Beach Bingo",
    type: "Outdoors",
    description: "Beach exploration activity using bingo cards",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/beach-bingo/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'become-a-kindness-champion',
    name: "Become a Kindness Champion",
    type: "Values",
    description: "Activities promoting kindness in the community",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/become-a-kindness-champion/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'become-a-walk-and-talk-ambassador',
    name: "Become a Walk and Talk Ambassador",
    type: "Health",
    description: "Promote walking and talking for mental wellbeing",
    duration: "50 minutes",
    url: "https://www.scouts.org.uk/activities/become-a-walk-and-talk-ambassador/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Physical Recreation" },
      { section: "Scouts", name: "Physical Recreation" }
    ]
  },
  // Adding activities 51-100
  {
    id: 'bed-making-relay',
    name: "Bed Making Relay",
    type: "Skills",
    description: "Learn and practice bed making skills through a fun relay race",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/bed-making-relay/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'bedtime-stories',
    name: "Bedtime Stories",
    type: "Creative",
    description: "Create and share bedtime stories",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/bedtime-stories/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Writer" }
    ]
  },
  {
    id: 'behind-the-disguise',
    name: "Behind the Disguise",
    type: "Creative",
    description: "Create disguises and explore identity",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/behind-the-disguise/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'best-behaviour',
    name: "Best Behaviour",
    type: "Skills",
    description: "Learn about proper behavior in different situations",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/best-behaviour/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'best-concert-ever',
    name: "Best Concert Ever",
    type: "Music",
    description: "Plan and perform a musical concert",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/best-concert-ever/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Musician" },
      { section: "Scouts", name: "Musician" }
    ]
  },
  {
    id: 'best-foot-forward',
    name: "Best Foot Forward",
    type: "Skills",
    description: "Learn about proper footwear and foot care for hiking",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/best-foot-forward/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Hikes Away" },
      { section: "Scouts", name: "Hikes Away" }
    ]
  },
  {
    id: 'best-paw-forward',
    name: "Best Paw Forward",
    type: "Nature",
    description: "Learn about animal footprints and tracking",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/best-paw-forward/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Animal Friend" },
      { section: "Cubs", name: "Naturalist" }
    ]
  },
  {
    id: 'better-mental-health-bingo',
    name: "Better Mental Health Bingo",
    type: "Health",
    description: "Learn about mental health through an engaging bingo game",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/better-mental-health-bingo/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'better-mental-health-for-all-performance',
    name: "Better Mental Health For All Performance",
    type: "Health",
    description: "Create performances to raise awareness about mental health",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/better-mental-health-for-all-performance/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'better-mental-health-for-all-postcards',
    name: "Better Mental Health For All Postcards",
    type: "Health",
    description: "Create postcards with positive mental health messages",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/better-mental-health-for-all-postcards/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'bike-balance-gymnastics',
    name: "Bike Balance Gymnastics",
    type: "Physical",
    description: "Improve cycling skills through balance exercises",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/bike-balance-gymnastics/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Cyclist" },
      { section: "Scouts", name: "Cyclist" }
    ]
  },
  {
    id: 'cook-billy-can-breakfast-beans',
    name: "Cook Billy Can Breakfast Beans",
    type: "Cooking",
    description: "Cook breakfast beans using a billy can over a campfire",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/cook-billy-can-breakfast-beans/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'blast-from-the-past',
    name: "Blast From The Past",
    type: "Heritage",
    description: "Explore local history through interactive activities",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/blast-from-the-past/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Local Knowledge" },
      { section: "Scouts", name: "Local Knowledge" }
    ]
  },
  {
    id: 'blue-sky-thinking',
    name: "Blue Sky Thinking",
    type: "Creative",
    description: "Encourage creative problem solving through brainstorming",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/blue-sky-thinking/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Creative" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'body-puzzle',
    name: "Body Puzzle",
    type: "Education",
    description: "Explore the human body through interactive puzzles",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/body-puzzle/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'bogus-bulletins',
    name: "Bogus Bulletins",
    type: "Communication",
    description: "Create fun, fake bulletins to learn media literacy",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/bogus-bulletins/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Citizen" },
      { section: "Scouts", name: "Media Relations" }
    ]
  },
  {
    id: 'book-in-a-bag',
    name: "Book in a Bag",
    type: "Creative",
    description: "Assemble a collection of stories using various books",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/book-in-a-bag/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Writer" }
    ]
  },
  {
    id: 'boss-the-green-cross-code',
    name: "Boss the Green Cross Code",
    type: "Safety",
    description: "Learn road safety by mastering the Green Cross Code",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/boss-the-green-cross-code/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Road Safety" },
      { section: "Scouts", name: "Road Safety" }
    ]
  },
  {
    id: 'bouldering',
    name: "Bouldering",
    type: "Outdoors",
    description: "Learn basic bouldering techniques in a safe environment",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/bouldering/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'break-the-ice',
    name: "Break the Ice",
    type: "Games",
    description: "Fun activities to get to know each other",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/break-the-ice/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'broken-telephone',
    name: "Broken Telephone",
    type: "Communication",
    description: "A game to illustrate how messages can change",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/broken-telephone/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Communicator" }
    ]
  },
  {
    id: 'brownsea-island-discs',
    name: "Brownsea Island Discs",
    type: "Creative",
    description: "Create a radio show about scouting history",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/brownsea-island-discs/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Communicator" }
    ]
  },
  {
    id: 'bubble-wrapping',
    name: "Bubble Wrapping",
    type: "STEM",
    description: "Learn about protection and insulation through bubble wrap experiments",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/bubble-wrapping/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Experiment" },
      { section: "Cubs", name: "Science" }
    ]
  },
  {
    id: 'budget-building',
    name: "Budget Building",
    type: "Life Skills",
    description: "Learn about budgeting and financial management",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/budget-building/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'build-a-bee-hotel',
    name: "Build a Bee Hotel",
    type: "Environment",
    description: "Create a habitat for solitary bees",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-bee-hotel/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'build-a-bottle-boat',
    name: "Build a Bottle Boat",
    type: "STEM",
    description: "Create a small boat using recycled plastic bottles",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-bottle-boat/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Nautical Skills" }
    ]
  },
  {
    id: 'build-a-bulletin-board',
    name: "Build a Bulletin Board",
    type: "Community",
    description: "Create an information board for your community",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-bulletin-board/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  {
    id: 'build-a-crafty-computer',
    name: "Build a Crafty Computer",
    type: "STEM",
    description: "Learn about computer components through craft",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-crafty-computer/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Digital Maker" },
      { section: "Cubs", name: "Digital Maker" }
    ]
  },
  {
    id: 'build-a-mini-paddle-boat',
    name: "Build a Mini Paddle Boat",
    type: "STEM",
    description: "Create a small working paddle boat from recycled materials",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-mini-paddle-boat/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'build-a-model-lung',
    name: "Build a Model Lung",
    type: "STEM",
    description: "Create a working model to understand how lungs function",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-model-lung/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'build-a-star-fire',
    name: "Build a Star Fire",
    type: "Outdoors",
    description: "Learn how to build and light a star-shaped campfire",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-star-fire/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'build-a-sustainable-future',
    name: "Build a Sustainable Future",
    type: "Environment",
    description: "Create models of sustainable communities",
    duration: "50 minutes",
    url: "https://www.scouts.org.uk/activities/build-a-sustainable-future/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'build-teeny-tiny-twig-rafts',
    name: "Build Teeny Tiny Twig Rafts",
    type: "Outdoors",
    description: "Create small rafts from natural materials",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/build-teeny-tiny-twig-rafts/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Our Outdoors Challenge" }
    ]
  },
  {
    id: 'build-your-squad',
    name: "Build Your Squad",
    type: "Teamwork",
    description: "Develop team-building skills through collaborative activities",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/build-your-squad/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Team Leader Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'building-balance',
    name: "Building Balance",
    type: "Physical",
    description: "Improve balance and coordination through fun exercises",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/building-balance/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Health and Fitness" },
      { section: "Cubs", name: "Physical Recreation" }
    ]
  },
  {
    id: 'building-memories',
    name: "Building Memories",
    type: "Creative",
    description: "Create a memory box or scrapbook of scouting adventures",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/building-memories/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'bungee-running',
    name: "Bungee Running",
    type: "Physical",
    description: "Challenging physical activity using bungee cords",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/bungee-running/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Physical Recreation" }
    ]
  },
  {
    id: 'buoyancy-aid-relays',
    name: "Buoyancy Aid Relays",
    type: "Water Activities",
    description: "Learn about water safety equipment through relay races",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/buoyancy-aid-relays/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Swimmer" },
      { section: "Scouts", name: "Swimmer" }
    ]
  },
  {
    id: 'busy-as-a-beaver',
    name: "Busy as a Beaver",
    type: "Nature",
    description: "Learn about beavers and their habitats through activities",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/busy-as-a-beaver/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Animal Friend" },
      { section: "Cubs", name: "Naturalist" }
    ]
  },
  {
    id: 'buzzing-chords',
    name: "Buzzing Chords",
    type: "Music",
    description: "Learn about musical chords using straws",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/buzzing-chords/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Musician" },
      { section: "Scouts", name: "Musician" }
    ]
  },
  {
    id: 'bystander-effect-and-first-aid',
    name: "Bystander Effect and First Aid",
    type: "First Aid",
    description: "Learn about the bystander effect and how to overcome it in emergencies",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/bystander-effect-and-first-aid/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'cache-and-dash',
    name: "Cache and Dash",
    type: "Navigation",
    description: "Geocaching-inspired activity to find hidden treasures",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/cache-and-dash/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'calamity-kitchen',
    name: "Calamity Kitchen",
    type: "Safety",
    description: "Learn to identify and prevent kitchen hazards",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/calamity-kitchen/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Home Safety" }
    ]
  },
  {
    id: 'calculate-the-speed-of-light',
    name: "Calculate the Speed of Light",
    type: "STEM",
    description: "Simple experiment to calculate the speed of light using a microwave",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/calculate-the-speed-of-light/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'call-of-the-wild',
    name: "Call of the Wild",
    type: "Outdoors",
    description: "Learn about animal calls and communication in nature",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/call-of-the-wild/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'camera',
    name: "Camera",
    type: "Creative",
    description: "Learn about photography and camera techniques",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/camera/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Photographer" },
      { section: "Scouts", name: "Photographer" }
    ]
  },
  {
    id: 'camp-kitchen-pitchin',
    name: "Camp Kitchen Pitch-In",
    type: "Camping",
    description: "Learn how to set up and organize a camp kitchen",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/camp-kitchen-pitchin/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'campfire-chocolate-oranges',
    name: "Campfire Chocolate Oranges",
    type: "Cooking",
    description: "Cook delicious chocolate-filled oranges on a campfire",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/campfire-chocolate-oranges/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'campfire-director',
    name: "Campfire Director",
    type: "Outdoors",
    description: "Learn how to lead and organize a successful campfire program",
    duration: "50 minutes",
    url: "https://www.scouts.org.uk/activities/campfire-director/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'campfire-pancakes',
    name: "Campfire Pancakes",
    type: "Cooking",
    description: "Cook pancakes over an open fire",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/campfire-pancakes/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  // Adding activities 101-150
  {
    id: 'campfires',
    name: "Campfires",
    type: "Outdoors",
    description: "Learn how to safely build, light, and extinguish campfires",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/campfires/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'can-the-stain-take-the-strain',
    name: "Can the Stain Take the Strain?",
    type: "STEM",
    description: "Test the strength of different materials in a fun engineering challenge",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/can-the-stain-take-the-strain/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'canal-canoe-chaos',
    name: "Canal Canoe Chaos",
    type: "Water Activities",
    description: "Learn canoeing skills on calm canal waters",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/canal-canoe-chaos/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Paddle Sports" }
    ]
  },
  {
    id: 'captains-clock',
    name: "Captain's Clock",
    type: "Games",
    description: "A fun team game to practice directions and coordination",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/captain-s-clock/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'capture-the-flag',
    name: "Capture the Flag",
    type: "Games",
    description: "Classic outdoor team game of strategy and stealth",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/capture-the-flag/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Team Leader Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'car-radiator-check-up',
    name: "Car Radiator Check-up",
    type: "Skills",
    description: "Learn about car maintenance by checking radiator levels",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/car-radiator-check-up/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Mechanic" }
    ]
  },
  {
    id: 'cardboard-captains',
    name: "Cardboard Captains",
    type: "Creative",
    description: "Design and build miniature boats from cardboard",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/cardboard-captains/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'carve-a-wooden-toasting-fork',
    name: "Carve a Wooden Toasting Fork",
    type: "Outdoors",
    description: "Learn wood carving skills to make a useful campfire tool",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/carve-a-wooden-toasting-fork/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'catch-the-dragons-tail',
    name: "Catch the Dragon's Tail",
    type: "Games",
    description: "Fun team game where players form a dragon and try to catch their own tail",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/catch-the-dragon-s-tail/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'cave-painting',
    name: "Cave Painting",
    type: "Creative",
    description: "Create prehistoric-style art using natural materials",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/cave-painting/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'celebrate-holi-with-a-colourful-scavenger-hunt',
    name: "Celebrate Holi with a Colourful Scavenger Hunt",
    type: "Cultural",
    description: "Learn about the Hindu festival of Holi through a colorful scavenger hunt",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/celebrate-holi-with-a-colourful-scavenger-hunt/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'celtic-comics',
    name: "Celtic Comics",
    type: "Creative",
    description: "Create comic strips inspired by Celtic mythology",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/celtic-comics/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'centre-assistant',
    name: "Centre Assistant",
    type: "Skills",
    description: "Learn how to help manage a Scout center or campsite",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/centre-assistant/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'chair-football',
    name: "Chair Football",
    type: "Games",
    description: "Accessible football game played while sitting",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/chair-football/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Disability Awareness" },
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'change-a-car-bulb',
    name: "Change a Car Bulb",
    type: "Skills",
    description: "Learn how to safely replace car headlight bulbs",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/change-a-car-bulb/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Mechanic" }
    ]
  },
  {
    id: 'change-of-plan',
    name: "Change of Plan",
    type: "Life Skills",
    description: "Learn how to adapt when things don't go according to plan",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/change-of-plan/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'changing-chairs',
    name: "Changing Chairs",
    type: "Games",
    description: "Fun team-building activity involving quick seating changes",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/changing-chairs/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'changing-your-coat',
    name: "Changing Your Coat",
    type: "Nature",
    description: "Learn about how and why animals change their coats with the seasons",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/changing-your-coat/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Animal Friend" },
      { section: "Cubs", name: "Naturalist" }
    ]
  },
  {
    id: 'channel-your-inner-journalist',
    name: "Channel Your Inner Journalist",
    type: "Communication",
    description: "Practice journalism skills by creating a news story",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/channel-your-inner-journalist/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Media Relations" }
    ]
  },
  {
    id: 'charcoal-creations',
    name: "Charcoal Creations",
    type: "Creative",
    description: "Create art using homemade or natural charcoal",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/charcoal-creations/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'chase-the-ace',
    name: "Chase the Ace",
    type: "Games",
    description: "Simple and fun card game that teaches probability",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/chase-the-ace/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'chase-the-shape',
    name: "Chase the Shape",
    type: "Games",
    description: "Active game where players follow shape-based instructions",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/chase-the-shape/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'chat-for-change',
    name: "Chat for Change",
    type: "Community",
    description: "Discuss and plan community action projects",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/chat-for-change/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  {
    id: 'chatty-charities',
    name: "Chatty Charities",
    type: "Community",
    description: "Research and discuss local charities and their work",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/chatty-charities/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'cheesy-rolling',
    name: "Cheesy Rolling",
    type: "Games",
    description: "Have fun with a cheese rolling competition",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/cheesy-rolling/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'chief-scout-award-activity-scrapbook',
    name: "Chief Scout Award Activity Scrapbook",
    type: "Skills",
    description: "Create a scrapbook to track progress toward the Chief Scout Award",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/chief-scout-award-activity-scrapbook/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Personal Challenge" },
      { section: "Cubs", name: "Personal Challenge" },
      { section: "Scouts", name: "Personal Challenge" }
    ]
  },
  {
    id: 'chief-scouts-award-kims-game',
    name: "Chief Scout's Award Kim's Game",
    type: "Games",
    description: "Memory game to learn about Chief Scout Award requirements",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/chief-scout-s-award-kim-s-game/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'chinese-calligraphy',
    name: "Chinese Calligraphy",
    type: "Cultural",
    description: "Learn and practice the art of Chinese calligraphy",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/chinese-calligraphy/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "International" }
    ]
  },
  {
    id: 'chinese-window-flowers',
    name: "Chinese Window Flowers",
    type: "Cultural",
    description: "Create traditional Chinese paper window decorations",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/chinese-window-flowers/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "International" }
    ]
  },
  {
    id: 'choose-the-right-tools-for-the-job',
    name: "Choose the Right Tools for the Job",
    type: "Skills",
    description: "Learn about different tools and their appropriate uses",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/choose-the-right-tools-for-the-job/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "DIY" }
    ]
  },
  {
    id: 'choose-your-challenge',
    name: "Choose Your Challenge",
    type: "Skills",
    description: "Plan and complete a personal challenge",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/choose-your-challenge/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Personal Challenge" },
      { section: "Cubs", name: "Personal Challenge" },
      { section: "Scouts", name: "Personal Challenge" }
    ]
  },
  {
    id: 'chopstick-relay',
    name: "Chopstick Relay",
    type: "Games",
    description: "Practice using chopsticks in a fun relay race",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/chopstick-relay/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "International" },
      { section: "Scouts", name: "International" }
    ]
  },
  {
    id: 'circle-storytelling',
    name: "Circle Storytelling",
    type: "Creative",
    description: "Create collaborative stories as a group",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/circle-storytelling/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Writer" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'circle-tag',
    name: "Circle Tag",
    type: "Games",
    description: "Fast-paced circle game that develops reflexes",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/circle-tag/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'citrus-switch',
    name: "Citrus Switch",
    type: "STEM",
    description: "Create a simple battery using citrus fruits",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/citrus-switch/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'clean-confetti',
    name: "Clean Confetti",
    type: "Environment",
    description: "Make environmentally friendly, biodegradable confetti",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/clean-confetti/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'clean-screen-machine',
    name: "Clean Screen Machine",
    type: "STEM",
    description: "Learn how to properly clean electronic screens",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/clean-screen-machine/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Maker" },
      { section: "Scouts", name: "Digital Maker" }
    ]
  },
  {
    id: 'clean-up-a-local-waterway-or-marine-area',
    name: "Clean Up a Local Waterway or Marine Area",
    type: "Environment",
    description: "Organize and participate in a waterway cleanup project",
    duration: "90 minutes",
    url: "https://www.scouts.org.uk/activities/clean-up-a-local-waterway-or-marine-area/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'climbing-essentials',
    name: "Climbing Essentials",
    type: "Outdoors",
    description: "Learn the basic skills and safety procedures for climbing",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/climbing-essentials/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Climbing" },
      { section: "Scouts", name: "Climbing" }
    ]
  },
  {
    id: 'closing-a-beaver-meeting',
    name: "Closing a Beaver Meeting",
    type: "Ceremonies",
    description: "Learn how to properly close a Beaver Scout meeting",
    duration: "10 minutes",
    url: "https://www.scouts.org.uk/activities/closing-a-beaver-meeting/",
    suitable: ["Beavers"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" }
    ]
  },
  {
    id: 'closing-a-cub-meeting',
    name: "Closing a Cub Meeting",
    type: "Ceremonies",
    description: "Learn how to properly close a Cub Scout meeting",
    duration: "10 minutes",
    url: "https://www.scouts.org.uk/activities/closing-a-cub-meeting/",
    suitable: ["Cubs"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'closing-a-scout-meeting',
    name: "Closing a Scout Meeting",
    type: "Ceremonies",
    description: "Learn how to properly close a Scout meeting",
    duration: "10 minutes",
    url: "https://www.scouts.org.uk/activities/closing-a-scout-meeting/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'clued-up-collections',
    name: "Clued Up Collections",
    type: "Skills",
    description: "Create and organize personal collections",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/clued-up-collections/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Collector" },
      { section: "Cubs", name: "Collector" }
    ]
  },
  {
    id: 'codemakers',
    name: "Codemakers",
    type: "STEM",
    description: "Create and solve secret codes and ciphers",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/codemakers/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Citizen" },
      { section: "Scouts", name: "Digital Maker" }
    ]
  },
  {
    id: 'combat-loneliness-with-kindness',
    name: "Combat Loneliness with Kindness",
    type: "Community",
    description: "Plan and carry out activities to help combat loneliness in your community",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/combat-loneliness-with-kindness/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  {
    id: 'come-dine-online',
    name: "Come Dine Online",
    type: "Cooking",
    description: "Host a virtual dinner party or cooking session",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/come-dine-online/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'commitment-stones',
    name: "Commitment Stones",
    type: "Values",
    description: "Create stones to represent personal commitments and values",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/commitment-stones/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Promise Challenge" },
      { section: "Cubs", name: "Promise Challenge" },
      { section: "Scouts", name: "Promise Challenge" }
    ]
  },
  {
    id: 'community-autism-pledge',
    name: "Community Autism Pledge",
    type: "Awareness",
    description: "Create a pledge to make your community more autism-friendly",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/community-autism-pledge/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'community-begins-at-home',
    name: "Community Begins at Home",
    type: "Skills",
    description: "Learn how to contribute to household tasks and family life",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/community-begins-at-home/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'community-bingo',
    name: "Community Bingo",
    type: "Community",
    description: "Learn about community roles and services through a bingo game",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/community-bingo/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" }
    ]
  },
  {
    id: 'community-collage',
    name: "Community Collage",
    type: "Creative",
    description: "Create a collage representing your local community",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/community-collage/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Our World Challenge" }
    ]
  },
  {
    id: 'community-connections',
    name: "Community Connections",
    type: "Community",
    description: "Map out and explore connections between community groups",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/community-connections/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  {
    id: 'community-impact-the-movie',
    name: "Community Impact: The Movie",
    type: "Community",
    description: "Create a short film about a community impact project",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/community-impact-the-movie/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  {
    id: 'community-wellbeing-map',
    name: "Community Wellbeing Map",
    type: "Health",
    description: "Create a map showing health and wellbeing resources in your community",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/community-wellbeing-map/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  // Adding activities 151-200
  {
    id: 'compass-coding',
    name: "Compass Coding",
    type: "Navigation",
    description: "Use compass directions to create and solve coded messages",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/compass-coding/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'compass-coding-tech-free-version',
    name: "Compass Coding: Tech-Free Version",
    type: "Navigation",
    description: "Learn compass directions through non-digital coding activities",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/compass-coding-tech-free-version/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'compass-crafting',
    name: "Compass Crafting",
    type: "Skills",
    description: "Make a simple compass and learn how it works",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/compass-crafting/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'compass-drawings',
    name: "Compass Drawings",
    type: "Creative",
    description: "Create artwork using compass directions as guides",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/compass-drawings/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'computers-in-the-real-world',
    name: "Computers in the Real World",
    type: "STEM",
    description: "Explore how computers are used in everyday life",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/computers-in-the-real-world/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Citizen" },
      { section: "Scouts", name: "Digital Citizen" }
    ]
  },
  {
    id: 'condensation-station',
    name: "Condensation Station",
    type: "STEM",
    description: "Explore the water cycle by creating condensation",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/condensation-station/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Experiment" },
      { section: "Cubs", name: "Science" }
    ]
  },
  {
    id: 'considerate-cycling',
    name: "Considerate Cycling",
    type: "Skills",
    description: "Learn about cycling safety and etiquette",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/considerate-cycling/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Cyclist" },
      { section: "Scouts", name: "Cyclist" }
    ]
  },
  {
    id: 'construct-a-campfire',
    name: "Construct a Campfire",
    type: "Outdoors",
    description: "Learn different methods for building effective campfires",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/construct-a-campfire/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'contour-creations',
    name: "Contour Creations",
    type: "Navigation",
    description: "Learn about topographic maps and contour lines",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/contour-creations/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'control-surface-cargo',
    name: "Control Surface Cargo",
    type: "STEM",
    description: "Learn about control surfaces in aviation using paper airplanes",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/control-surface-cargo/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Air Activities" },
      { section: "Scouts", name: "Air Activities" }
    ]
  },
  {
    id: 'cook-camp-stove-doughnuts',
    name: "Cook Camp Stove Doughnuts",
    type: "Cooking",
    description: "Make simple doughnuts using a camp stove",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/cook-camp-stove-doughnuts/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'cook-campfire-apples',
    name: "Cook Campfire Apples",
    type: "Cooking",
    description: "Prepare delicious baked apples on a campfire",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/cook-campfire-apples/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'cool-crafty-constellations',
    name: "Cool Crafty Constellations",
    type: "STEM",
    description: "Create models of star constellations and learn about astronomy",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/cool-crafty-constellations/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Space" },
      { section: "Cubs", name: "Astronomer" },
      { section: "Scouts", name: "Astronomer" }
    ]
  },
  {
    id: 'cops-and-robbers',
    name: "Cops and Robbers",
    type: "Games",
    description: "Active team game involving pursuit and strategy",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/cops-and-robbers/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'cosmic-kingdom',
    name: "Cosmic Kingdom",
    type: "STEM",
    description: "Explore the solar system and create a model",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/cosmic-kingdom/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Space" },
      { section: "Cubs", name: "Astronomer" }
    ]
  },
  {
    id: 'cosmic-quest',
    name: "Cosmic Quest",
    type: "STEM",
    description: "Explore space and astronomy through games and activities",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/cosmic-quest/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Space" },
      { section: "Cubs", name: "Astronomer" },
      { section: "Scouts", name: "Astronomer" }
    ]
  },
  {
    id: 'craft-a-cotton-poppy-for-ve-80',
    name: "Craft a Cotton Poppy for VE 80",
    type: "Creative",
    description: "Create poppies to commemorate VE Day",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/craft-a-cotton-poppy-for-ve-80/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'craft-a-leaf-crown',
    name: "Craft a Leaf Crown",
    type: "Outdoors",
    description: "Create a crown using natural materials found outdoors",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/craft-a-leaf-crown/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Our Outdoors Challenge" }
    ]
  },
  {
    id: 'crafty-obstacle-course',
    name: "Crafty Obstacle Course",
    type: "Physical",
    description: "Design and build an obstacle course using craft materials",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/crafty-obstacle-course/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" }
    ]
  },
  {
    id: 'create-fridas-four-corner-masterpiece',
    name: "Create Frida's Four Corner Masterpiece",
    type: "Creative",
    description: "Create artwork inspired by Mexican artist Frida Kahlo",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/create-frida-s-four-corner-masterpiece/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'create-a-buddhist-prayer-flag',
    name: "Create a Buddhist Prayer Flag",
    type: "Cultural",
    description: "Learn about Buddhist culture by creating prayer flags",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-buddhist-prayer-flag/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Faith" },
      { section: "Cubs", name: "My Faith" },
      { section: "Scouts", name: "World Faiths" }
    ]
  },
  {
    id: 'create-a-breathing-buddy',
    name: "Create a Breathing Buddy",
    type: "Wellbeing",
    description: "Make a tool to help practice mindful breathing techniques",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-breathing-buddy/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Health and Fitness" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'create-a-campsite',
    name: "Create a Campsite",
    type: "Outdoors",
    description: "Design and plan an ideal campsite",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-campsite/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'create-a-community-library-with-encanto',
    name: "Create a Community Library with Encanto",
    type: "Community",
    description: "Build a small community library inspired by the film Encanto",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-community-library-with-encanto/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "Community Impact" }
    ]
  },
  {
    id: 'create-a-fire-breathing-dragon',
    name: "Create a Fire-Breathing Dragon",
    type: "Creative",
    description: "Craft a dragon puppet that appears to breathe fire",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-fire-breathing-dragon/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'create-a-group-dance-routine',
    name: "Create a Group Dance Routine",
    type: "Performing Arts",
    description: "Choreograph and perform a dance routine as a team",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-group-dance-routine/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Performer" },
      { section: "Scouts", name: "Performing Arts" }
    ]
  },
  {
    id: 'create-a-planetscape',
    name: "Create a Planetscape",
    type: "STEM",
    description: "Create artwork depicting alien landscapes on other planets",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-planetscape/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Space" },
      { section: "Cubs", name: "Astronomer" },
      { section: "Scouts", name: "Astronomer" }
    ]
  },
  {
    id: 'create-a-seasonal-four-corner-picture',
    name: "Create a Seasonal Four-Corner Picture",
    type: "Creative",
    description: "Create artwork representing the four seasons",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-seasonal-four-corner-picture/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'create-a-star-map',
    name: "Create a Star Map",
    type: "STEM",
    description: "Make a map of the night sky and learn about stars",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-star-map/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Astronomer" },
      { section: "Scouts", name: "Astronomer" }
    ]
  },
  {
    id: 'create-a-technology-timeline',
    name: "Create a Technology Timeline",
    type: "STEM",
    description: "Explore the history of technology through a visual timeline",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-technology-timeline/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Maker" },
      { section: "Scouts", name: "Digital Maker" }
    ]
  },
  {
    id: 'create-a-wildlife-reserve',
    name: "Create a Wildlife Reserve",
    type: "Environment",
    description: "Design and build a model wildlife reserve",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/create-a-wildlife-reserve/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'create-an-autism-awareness-charter',
    name: "Create an Autism Awareness Charter",
    type: "Awareness",
    description: "Develop a charter to promote autism awareness and inclusion",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/create-an-autism-awareness-charter/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'create-festive-bottles',
    name: "Create Festive Bottles",
    type: "Creative",
    description: "Decorate bottles for festive occasions",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/create-festive-bottles/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'create-origami-scout-uniforms',
    name: "Create Origami Scout Uniforms",
    type: "Creative",
    description: "Make miniature scout uniforms using origami techniques",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/create-origami-scout-uniforms/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'create-spoon-puppet-superheroes',
    name: "Create Spoon Puppet Superheroes",
    type: "Creative",
    description: "Make superhero puppets using wooden spoons",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/create-spoon-puppet-superheroes/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'create-tin-can-insects',
    name: "Create Tin Can Insects",
    type: "Creative",
    description: "Repurpose tin cans to make insect sculptures",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/create-tin-can-insects/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'create-your-dream-scouts-camp',
    name: "Create Your Dream Scouts Camp",
    type: "Outdoors",
    description: "Plan and design your ideal scouting camp experience",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/create-your-dream-scouts-camp/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'creating-your-own-activity',
    name: "Creating Your Own Activity",
    type: "Skills",
    description: "Learn how to design and lead your own Scout activities",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/creating-your-own-activity/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'cross-correct',
    name: "Cross Correct",
    type: "Games",
    description: "Fun game combining quizzes with physical activity",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/cross-correct/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'crossing-the-giants-causeway',
    name: "Crossing the Giant's Causeway",
    type: "Games",
    description: "Team challenge game inspired by the Giant's Causeway",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/crossing-the-giant-s-causeway/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'cubs-in-catalonia',
    name: "Cubs in Catalonia",
    type: "Cultural",
    description: "Learn about Catalonian culture and traditions",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/cubs-in-catalonia/",
    suitable: ["Cubs"],
    badges: [
      { section: "Cubs", name: "International" }
    ]
  },
  {
    id: 'cup-it-up',
    name: "Cup It Up",
    type: "Games",
    description: "Quick-thinking team game using plastic cups",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/cup-it-up/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'cycle-safety',
    name: "Cycle Safety",
    type: "Skills",
    description: "Learn essential cycling safety skills",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/cycle-safety/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Cyclist" },
      { section: "Scouts", name: "Cyclist" }
    ]
  },
  {
    id: 'cycling-through-the-seasons',
    name: "Cycling Through The Seasons",
    type: "Skills",
    description: "Learn about cycling in different weather conditions",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/cycling-through-the-seasons/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Cyclist" },
      { section: "Scouts", name: "Cyclist" }
    ]
  },
  {
    id: 'czech-champions',
    name: "Czech Champions",
    type: "Cultural",
    description: "Learn about Czech culture through games and activities",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/czech-champions/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "International" },
      { section: "Scouts", name: "International" }
    ]
  },
  {
    id: 'damper-snakes',
    name: "Damper Snakes",
    type: "Cooking",
    description: "Make bread dough snakes over a campfire",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/damper-snakes/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Cook" },
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'dancing-in-the-dark',
    name: "Dancing in the Dark",
    type: "Games",
    description: "Movement game played in dark or low-light conditions",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/dancing-in-the-dark/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Adventure Challenge" }
    ]
  },
  {
    id: 'danger-zone',
    name: "Danger Zone",
    type: "Safety",
    description: "Learn to identify and avoid household hazards",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/danger-zone/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Home Safety" }
    ]
  },
  {
    id: 'dangerous-sculptures',
    name: "Dangerous Sculptures",
    type: "Creative",
    description: "Create sculptures that communicate hazards and dangers",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/dangerous-sculptures/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'dashing-digits',
    name: "Dashing Digits",
    type: "Games",
    description: "Quick mathematical game that combines physical activity with numeracy",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/dashing-digits/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'dear-future-me',
    name: "Dear Future Me",
    type: "Values",
    description: "Write letters to your future self",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/dear-future-me/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Personal Challenge" },
      { section: "Scouts", name: "Personal Challenge" }
    ]
  },
  // Adding activities 201-250
  {
    id: 'debate-the-sustainable-development-goals',
    name: "Debate the Sustainable Development Goals",
    type: "Global Issues",
    description: "Discuss and debate the UN's Sustainable Development Goals",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/debate-the-sustainable-development-goals/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'decode-the-countryside',
    name: "Decode the Countryside",
    type: "Outdoors",
    description: "Learn to read and understand countryside signs and codes",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/decode-the-countryside/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'decorate-biscuit-characters',
    name: "Decorate Biscuit Characters",
    type: "Cooking",
    description: "Create character designs on biscuits using icing and decorations",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/decorate-biscuit-characters/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Cook" },
      { section: "Cubs", name: "Chef" }
    ]
  },
  {
    id: 'deliciously-nutritious',
    name: "Deliciously Nutritious",
    type: "Health",
    description: "Learn about nutrition while preparing healthy snacks",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/deliciously-nutritious/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Chef" }
    ]
  },
  {
    id: 'describe-and-draw',
    name: "Describe and Draw",
    type: "Communication",
    description: "Practice clear communication by describing images for others to draw",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/describe-and-draw/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Communicator" },
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Communicator" }
    ]
  },
  {
    id: 'design-an-app-to-help-others',
    name: "Design an App to Help Others",
    type: "STEM",
    description: "Conceptualize and design an app that could help people in your community",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/design-an-app-to-help-others/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Maker" },
      { section: "Scouts", name: "Digital Maker" }
    ]
  },
  {
    id: 'design-your-own-battery-recycling-box',
    name: "Design Your Own Battery Recycling Box",
    type: "Environment",
    description: "Create a container to collect used batteries for recycling",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/design-your-own-battery-recycling-box/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My World Challenge" },
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'design-your-own-coin',
    name: "Design Your Own Coin",
    type: "Creative",
    description: "Design a commemorative coin representing your values or interests",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/design-your-own-coin/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'design-your-own-comic-book',
    name: "Design Your Own Comic Book",
    type: "Creative",
    description: "Create an original comic book with characters and storyline",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/design-your-own-comic-book/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'designing-solutions',
    name: "Designing Solutions",
    type: "STEM",
    description: "Apply design thinking to solve everyday problems",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/designing-solutions/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'digital-detectives',
    name: "Digital Detectives",
    type: "STEM",
    description: "Learn how to evaluate online information for accuracy and trustworthiness",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/digital-detectives/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Citizen" },
      { section: "Scouts", name: "Digital Citizen" }
    ]
  },
  {
    id: 'digital-leaf-identifier',
    name: "Digital Leaf Identifier",
    type: "STEM",
    description: "Use digital tools to identify different types of leaves",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/digital-leaf-identifier/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'disability-detectives',
    name: "Disability Detectives",
    type: "Awareness",
    description: "Learn about different disabilities through interactive activities",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/disability-detectives/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'disaster-stations',
    name: "Disaster Stations",
    type: "Safety",
    description: "Learn how to prepare for and respond to different types of emergencies",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/disaster-stations/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'disastrous-diy',
    name: "Disastrous DIY",
    type: "Safety",
    description: "Learn about home repair safety by identifying unsafe DIY practices",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/disastrous-diy/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "DIY" }
    ]
  },
  {
    id: 'discover-muslim-inventors',
    name: "Discover Muslim Inventors",
    type: "Cultural",
    description: "Learn about the contributions of Muslim inventors throughout history",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/discover-muslim-inventors/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "My Faith" },
      { section: "Scouts", name: "World Faiths" }
    ]
  },
  {
    id: 'discover-how-scouts-have-always-helped',
    name: "Discover How Scouts Have Always Helped",
    type: "Heritage",
    description: "Explore the history of Scouting's community service",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/discover-how-scouts-have-always-helped/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our World Challenge" },
      { section: "Scouts", name: "World Challenge" }
    ]
  },
  {
    id: 'discover-how-accessible-your-meeting-place-is',
    name: "Discover How Accessible Your Meeting Place Is",
    type: "Awareness",
    description: "Assess and improve accessibility at your scout meeting location",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/discover-how-accessible-your-meeting-place-is/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'discover-how-to-keep-a-tent-tidy',
    name: "Discover How to Keep a Tent Tidy",
    type: "Outdoors",
    description: "Learn organization skills for camping and tent maintenance",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/discover-how-to-keep-a-tent-tidy/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'discover-the-power-of-digital-persuasion',
    name: "Discover the Power of Digital Persuasion",
    type: "STEM",
    description: "Learn how digital media uses techniques to persuade and influence",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/discover-the-power-of-digital-persuasion/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Digital Citizen" }
    ]
  },
  {
    id: 'discovery-treasure-hunt',
    name: "Discovery Treasure Hunt",
    type: "Outdoors",
    description: "Create and complete a treasure hunt with educational challenges",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/discovery-treasure-hunt/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Adventure Challenge" }
    ]
  },
  {
    id: 'distinguishing-disability',
    name: "Distinguishing Disability",
    type: "Awareness",
    description: "Learn about different types of disabilities and inclusive practices",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/distinguishing-disability/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Disability Awareness" },
      { section: "Scouts", name: "Disability Awareness" }
    ]
  },
  {
    id: 'distracted-youve-crossed-the-line',
    name: "Distracted? You've Crossed the Line",
    type: "Safety",
    description: "Learn about the dangers of distraction in traffic situations",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/distracted-you-ve-crossed-the-line/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Road Safety" },
      { section: "Scouts", name: "Road Safety" }
    ]
  },
  {
    id: 'dodgeball-dream-team',
    name: "Dodgeball Dream Team",
    type: "Physical",
    description: "Play and develop skills in the game of dodgeball",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/dodgeball-dream-team/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Physical Recreation" },
      { section: "Scouts", name: "Physical Recreation" }
    ]
  },
  {
    id: 'dogs-in-the-bogs',
    name: "Dogs in the Bogs",
    type: "Environment",
    description: "Learn about the impact of dog waste on the environment",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/dogs-in-the-bogs/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'dont-be-faced-with-food-waste',
    name: "Don't Be Faced with Food Waste",
    type: "Environment",
    description: "Learn about food waste and ways to reduce it",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/don-t-be-faced-with-food-waste/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'dont-rock-the-boat',
    name: "Don't Rock the Boat",
    type: "Games",
    description: "A team balance game requiring coordination and cooperation",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/don-t-rock-the-boat/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'dont-wake-the-pirate',
    name: "Don't Wake the Pirate",
    type: "Games",
    description: "A stealth game where players try not to wake the 'sleeping pirate'",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/don-t-wake-the-pirate/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'double-trouble',
    name: "Double Trouble",
    type: "Games",
    description: "A fun, fast-paced team game involving coordination and quick thinking",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/double-trouble/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'draw-and-score',
    name: "Draw and Score",
    type: "Games",
    description: "Combination of drawing and active games to earn points",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/draw-and-score/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'dream-building',
    name: "Dream Building",
    type: "Values",
    description: "Create models or drawings of your dream places",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/dream-building/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'drie-blikkies',
    name: "Drie Blikkies",
    type: "Games",
    description: "Play a traditional South African can-stacking game",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/drie-blikkies/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "International" },
      { section: "Cubs", name: "International" },
      { section: "Scouts", name: "International" }
    ]
  },
  {
    id: 'drip-drip-drop',
    name: "Drip Drip Drop",
    type: "Games",
    description: "A water-themed version of 'Duck Duck Goose'",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/drip-drip-drop/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" }
    ]
  },
  {
    id: 'dye-another-day',
    name: "Dye Another Day",
    type: "Creative",
    description: "Create patterns using tie-dye techniques",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/dye-another-day/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'eco-friendly-climbing',
    name: "Eco-Friendly Climbing",
    type: "Outdoors",
    description: "Learn environmentally responsible climbing practices",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/eco-friendly-climbing/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Climbing" }
    ]
  },
  {
    id: 'egg-parachutes',
    name: "Egg Parachutes",
    type: "STEM",
    description: "Design and build parachutes to safely land an egg",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/egg-parachutes/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'egg-cellent-races',
    name: "Egg-cellent Races",
    type: "Games",
    description: "Participate in various egg-and-spoon style races",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/egg-cellent-races/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" }
    ]
  },
  {
    id: 'egg-ceptional-towers',
    name: "Egg-ceptional Towers",
    type: "STEM",
    description: "Build towers that can safely hold an egg",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/egg-ceptional-towers/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'egg-traordinary-senses',
    name: "Egg-traordinary Senses",
    type: "STEM",
    description: "Use eggs to explore sensory perception and scientific principles",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/egg-traordinary-senses/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Experiment" },
      { section: "Cubs", name: "Science" }
    ]
  },
  {
    id: 'electing-sixers-and-seconders',
    name: "Electing Sixers and Seconders",
    type: "Leadership",
    description: "Hold democratic elections for Cub Pack leadership roles",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/electing-sixers-and-seconders/",
    suitable: ["Cubs"],
    badges: [
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'elephant-ball',
    name: "Elephant Ball",
    type: "Games",
    description: "Team game where players mimic elephants to move a ball",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/elephant-ball/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" },
      { section: "Cubs", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'emergency-999',
    name: "Emergency 999",
    type: "Safety",
    description: "Learn how and when to call emergency services",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/emergency-999/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Emergency Aid" }
    ]
  },
  {
    id: 'emergency-loop-chase-game',
    name: "Emergency Loop Chase Game",
    type: "Games",
    description: "Learn emergency procedures through an active game",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/emergency-loop-chase-game/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'emergency-scenario-bingo',
    name: "Emergency Scenario Bingo",
    type: "First Aid",
    description: "Learn emergency responses through a bingo-style game",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/emergency-scenario-bingo/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  },
  {
    id: 'emergency-superheroes',
    name: "Emergency Superheroes",
    type: "Creative",
    description: "Create superhero characters based on emergency services",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/emergency-superheroes/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Emergency Aid" }
    ]
  },
  {
    id: 'emoji-charades',
    name: "Emoji Charades",
    type: "Games",
    description: "Play charades using emoji expressions and emotions",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/emoji-charades/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Communicator" },
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Communicator" }
    ]
  },
  {
    id: 'emoji-maps',
    name: "Emoji Maps",
    type: "Navigation",
    description: "Create and follow maps using emoji symbols",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/emoji-maps/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Navigator" }
    ]
  },
  {
    id: 'enchanted-athletics',
    name: "Enchanted Athletics",
    type: "Games",
    description: "Magical-themed athletic activities and challenges",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/enchanted-athletics/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Health and Fitness" },
      { section: "Cubs", name: "Physical Recreation" }
    ]
  },
  {
    id: 'energy-diaries',
    name: "Energy Diaries",
    type: "Environment",
    description: "Track and reduce energy usage at home",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/energy-diaries/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Environmental Conservation" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'escape-route-planning',
    name: "Escape Route Planning",
    type: "Safety",
    description: "Create and practice home fire escape plans",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/escape-route-planning/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Fire Safety" },
      { section: "Scouts", name: "Fire Safety" }
    ]
  },
  // Adding activities 251-300
  {
    id: 'evaluation-postcards',
    name: "Evaluation Postcards",
    type: "Skills",
    description: "Create postcards to evaluate activities and share feedback",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/evaluation-postcards/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'evening-stroll',
    name: "Evening Stroll",
    type: "Outdoors",
    description: "Experience the outdoors at dusk and observe nature at night",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/evening-stroll/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'every-picture-tells-a-story',
    name: "Every Picture Tells a Story",
    type: "Creative",
    description: "Use photographs to create and share stories",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/every-picture-tells-a-story/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Photographer" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'everything-you-need-nothing-you-dont',
    name: "Everything You Need, Nothing You Don't",
    type: "Outdoors",
    description: "Learn about essential packing for outdoor adventures",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/everything-you-need-nothing-you-don-t/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'exciting-experiments',
    name: "Exciting Experiments",
    type: "STEM",
    description: "Conduct fun and educational science experiments",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/exciting-experiments/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Experiment" },
      { section: "Cubs", name: "Science" }
    ]
  },
  {
    id: 'experiment-development',
    name: "Experiment Development",
    type: "STEM",
    description: "Design and develop scientific experiments",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/experiment-development/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'exploration-mission',
    name: "Exploration Mission",
    type: "Outdoors",
    description: "Plan and execute an expedition to explore a local area",
    duration: "90 minutes",
    url: "https://www.scouts.org.uk/activities/exploration-mission/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Expedition Challenge" }
    ]
  },
  {
    id: 'explore-and-draw',
    name: "Explore and Draw",
    type: "Outdoors",
    description: "Discover nature through observation and drawing",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/explore-and-draw/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Artist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'explore-different-water-worlds',
    name: "Explore Different Water Worlds",
    type: "Environment",
    description: "Learn about various water ecosystems and their importance",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/explore-different-water-worlds/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'explore-gravity-in-space',
    name: "Explore Gravity in Space",
    type: "STEM",
    description: "Understand how gravity works in space through fun experiments",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/explore-gravity-in-space/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Astronomer" },
      { section: "Scouts", name: "Astronomer" }
    ]
  },
  {
    id: 'explore-on-a-woodland-wildlife-hunt',
    name: "Explore on a Woodland Wildlife Hunt",
    type: "Nature",
    description: "Search for and identify wildlife in woodland areas",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/explore-on-a-woodland-wildlife-hunt/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'explore-the-impact-of-online-content',
    name: "Explore the Impact of Online Content",
    type: "Digital",
    description: "Understand how online content affects us and our communities",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/explore-the-impact-of-online-content/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Digital Citizen" }
    ]
  },
  {
    id: 'explore-the-shore',
    name: "Explore the Shore",
    type: "Environment",
    description: "Discover coastal ecosystems and learn about marine conservation",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/explore-the-shore/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'express-yourself',
    name: "Express Yourself",
    type: "Wellbeing",
    description: "Creative activities to express emotions and build self-awareness",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/express-yourself/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'extinguisher-distinguishers',
    name: "Extinguisher Distinguishers",
    type: "Safety",
    description: "Learn about different types of fire extinguishers and their uses",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/extinguisher-distinguishers/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Fire Safety" },
      { section: "Scouts", name: "Fire Safety" }
    ]
  },
  {
    id: 'extreme-sleeps',
    name: "Extreme Sleeps",
    type: "Outdoors",
    description: "Plan and set up unusual or challenging camping locations",
    duration: "60 minutes",
    url: "https://www.scouts.org.uk/activities/extreme-sleeps/",
    suitable: ["Scouts"],
    badges: [
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'eye-to-i-spy',
    name: "Eye to I Spy",
    type: "Games",
    description: "Observation game to develop awareness of surroundings",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/eye-to-i-spy/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Skills Challenge" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'fabulous-fancy-frames',
    name: "Fabulous Fancy Frames",
    type: "Creative",
    description: "Create decorated picture frames using various materials",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/fabulous-fancy-frames/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Artist" }
    ]
  },
  {
    id: 'fairway-fiends',
    name: "Fairway Fiends",
    type: "Sports",
    description: "Learn golf skills and etiquette through fun activities",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/fairway-fiends/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Sports Enthusiast" },
      { section: "Scouts", name: "Sports" }
    ]
  },
  {
    id: 'faith-feathers',
    name: "Faith Feathers",
    type: "Values",
    description: "Create colorful feathers representing different elements of faith",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/faith-feathers/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Faith" },
      { section: "Cubs", name: "My Faith" },
      { section: "Scouts", name: "World Faiths" }
    ]
  },
  {
    id: 'false-advertising',
    name: "False Advertising",
    type: "Media",
    description: "Learn to identify misleading advertisements and understand media literacy",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/false-advertising/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Digital Citizen" },
      { section: "Scouts", name: "Media Relations" }
    ]
  },
  {
    id: 'famous-faces',
    name: "Famous Faces",
    type: "Games",
    description: "Fun guessing game to identify well-known personalities",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/famous-faces/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Skills Challenge" }
    ]
  },
  {
    id: 'fan-tastic-interview',
    name: "Fan-tastic Interview",
    type: "Communication",
    description: "Practice interviewing skills through role play activities",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/fan-tastic-interview/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Communicator" },
      { section: "Scouts", name: "Communicator" }
    ]
  },
  {
    id: 'fantastic-haggi-and-where-to-find-them',
    name: "Fantastic Haggi and Where to Find Them",
    type: "Cultural",
    description: "Explore Scottish culture through the tradition of haggis",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/fantastic-haggi-and-where-to-find-them/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "International" },
      { section: "Scouts", name: "International" }
    ]
  },
  {
    id: 'fantasy-diners',
    name: "Fantasy Diners",
    type: "Creative",
    description: "Design your dream restaurant with unique menus and themes",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/fantasy-diners/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Chef" },
      { section: "Scouts", name: "Creative" }
    ]
  },
  {
    id: 'fashion-a-fender',
    name: "Fashion a Fender",
    type: "Water Activities",
    description: "Create boat fenders from recycled materials",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/fashion-a-fender/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Skills Challenge" },
      { section: "Scouts", name: "Nautical Skills" }
    ]
  },
  {
    id: 'fashion-reflective',
    name: "Fashion Reflective",
    type: "Safety",
    description: "Design and create reflective items for visibility in the dark",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/fashion-reflective/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Road Safety" },
      { section: "Scouts", name: "Road Safety" }
    ]
  },
  {
    id: 'feed-the-butterflies',
    name: "Feed the Butterflies",
    type: "Environment",
    description: "Create butterfly feeders to support local populations",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/feed-the-butterflies/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Environmental Conservation" }
    ]
  },
  {
    id: 'feel-good-chatterboxes',
    name: "Feel Good Chatterboxes",
    type: "Wellbeing",
    description: "Create origami chatterboxes with positive messages and activities",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/feel-good-chatterboxes/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Skills Challenge" }
    ]
  },
  {
    id: 'feeling-the-pressure',
    name: "Feeling the Pressure",
    type: "STEM",
    description: "Explore air pressure through hands-on experiments",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/feeling-the-pressure/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Science" },
      { section: "Scouts", name: "Science" }
    ]
  },
  {
    id: 'fill-the-stocking',
    name: "Fill the Stocking",
    type: "Games",
    description: "Active relay game with a festive theme",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/fill-the-stocking/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" }
    ]
  },
  {
    id: 'find-food',
    name: "Find Food",
    type: "Outdoors",
    description: "Learn about edible plants and foraging safely",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/find-food/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Survival Skills" }
    ]
  },
  {
    id: 'find-me-follow-you',
    name: "Find Me, Follow You",
    type: "Navigation",
    description: "Practice navigation and tracking skills through fun games",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/find-me-follow-you/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'find-my-fortune',
    name: "Find My Fortune",
    type: "Games",
    description: "Exciting treasure hunt with a twist",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/find-my-fortune/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" }
    ]
  },
  {
    id: 'find-your-favourite-flora-or-fauna',
    name: "Find Your Favourite Flora or Fauna",
    type: "Nature",
    description: "Search for and learn about plants and animals in the local area",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/find-your-favourite-flora-or-fauna/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Outdoors Challenge" },
      { section: "Cubs", name: "Naturalist" },
      { section: "Scouts", name: "Naturalist" }
    ]
  },
  {
    id: 'find-your-fit-in-the-team',
    name: "Find Your Fit in the Team",
    type: "Team Building",
    description: "Discover individual strengths and how they contribute to a team",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/find-your-fit-in-the-team/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Team Leader Challenge" },
      { section: "Scouts", name: "Team Leader Challenge" }
    ]
  },
  {
    id: 'find-your-fleet',
    name: "Find Your Fleet",
    type: "Water Activities",
    description: "Learn about different types of boats and their uses",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/find-your-fleet/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Water Activities" },
      { section: "Scouts", name: "Nautical Skills" }
    ]
  },
  {
    id: 'find-your-way',
    name: "Find Your Way",
    type: "Navigation",
    description: "Practice map reading and navigation skills",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/find-your-way/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Navigator" },
      { section: "Scouts", name: "Navigator" }
    ]
  },
  {
    id: 'finding-your-way',
    name: "Finding Your Way",
    type: "Navigation",
    description: "Learn to use a compass and basic navigation techniques",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/finding-your-way/",
    suitable: ["Beavers", "Cubs"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Navigator" }
    ]
  },
  {
    id: 'fire-ball',
    name: "Fire Ball",
    type: "Games",
    description: "High-energy team game with a fire safety theme",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/fire-ball/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" },
      { section: "Cubs", name: "Our Adventure Challenge" },
      { section: "Scouts", name: "Adventure Challenge" }
    ]
  },
  {
    id: 'fire-finders',
    name: "Fire Finders",
    type: "Safety",
    description: "Learn to identify fire hazards in different environments",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/fire-finders/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Safety" },
      { section: "Cubs", name: "Fire Safety" },
      { section: "Scouts", name: "Fire Safety" }
    ]
  },
  {
    id: 'fire-rescue-reporters',
    name: "Fire Rescue Reporters",
    type: "Role Play",
    description: "Create news reports about fire safety and rescue operations",
    duration: "40 minutes",
    url: "https://www.scouts.org.uk/activities/fire-rescue-reporters/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Fire Safety" },
      { section: "Scouts", name: "Fire Safety" }
    ]
  },
  {
    id: 'fire-free-campfire',
    name: "Fire-Free Campfire",
    type: "Creative",
    description: "Create a flameless campfire for indoor use or fire-restricted areas",
    duration: "35 minutes",
    url: "https://www.scouts.org.uk/activities/fire-free-campfire/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Creative" },
      { section: "Cubs", name: "Our Outdoors Challenge" },
      { section: "Scouts", name: "Outdoor Challenge" }
    ]
  },
  {
    id: 'first-aid-kit-kims-game',
    name: "First Aid Kit Kim's Game",
    type: "First Aid",
    description: "Learn about first aid kit contents through a memory game",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/first-aid-kit-kim-s-game/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Health and Fitness" },
      { section: "Cubs", name: "Emergency Aid" },
      { section: "Scouts", name: "Emergency Aid" }
    ]
  }
];

export default activities;
