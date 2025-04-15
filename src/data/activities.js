/**
 * Scout Activities Database
 * 
 * IMPORTANT: When adding activities, ensure that badge names EXACTLY match 
 * the names used in beaverBadges.js, cubBadges.js, and scoutBadges.js
 * This is critical for the badge filtering to work correctly.
 */

const activities = [
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
  {
    id: 'tennis-warm-up',
    name: "Try a Tennis Warm-up",
    type: "Sports",
    description: "Fun tennis-inspired warm-up activities",
    duration: "15 minutes",
    url: "https://www.scouts.org.uk/activities/try-a-tennis-warm-up/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Health and Fitness" }, // Standardized name
      { section: "Cubs", name: "Sports Enthusiast" }, // Standardized name
      { section: "Scouts", name: "Physical Recreation" } // Standardized name
    ]
  },
  {
    id: 'racket-free-hack',
    name: "Racket-free Hack",
    type: "Sports",
    description: "Tennis-inspired games without rackets",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/racket-free-hack/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Sports" }, // Standardized name
      { section: "Cubs", name: "Sports Enthusiast" }, // Standardized name
      { section: "Scouts", name: "Sports" } // Standardized name
    ]
  },
  {
    id: 'toss-n-cross',
    name: "Toss n Cross",
    type: "Sports",
    description: "Practice throwing and catching skills",
    duration: "20 minutes",
    url: "https://www.scouts.org.uk/activities/toss-n-cross/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Athletics" }, // Standardized name
      { section: "Cubs", name: "Sports Enthusiast" }, // Standardized name
      { section: "Scouts", name: "Athletics Plus" } // Standardized name
    ]
  },
  {
    id: 'try-time',
    name: "Play Try Time",
    type: "Sports",
    description: "Rugby-inspired game focusing on teamwork",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/play-try-time/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Teamwork Challenge" }, // Standardized name
      { section: "Cubs", name: "Team Leader Challenge" }, // Standardized name
      { section: "Scouts", name: "Team Leader Challenge" } // Standardized name
    ]
  },
  {
    id: 'racket-skills',
    name: "Racket Skills",
    type: "Sports",
    description: "Develop racket sports coordination",
    duration: "25 minutes",
    url: "https://www.scouts.org.uk/activities/racket-skills/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Sports Enthusiast" }, // Standardized name
      { section: "Scouts", name: "Sports" } // Standardized name
    ]
  },
  {
    id: 'sitting-volleyball',
    name: "Play Sitting Volleyball",
    type: "Sports",
    description: "Inclusive volleyball game played while sitting",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/play-sitting-volleyball/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "Disability Awareness" }, // Standardized name
      { section: "Cubs", name: "Disability Awareness" }, // Standardized name
      { section: "Scouts", name: "Disability Awareness" } // Standardized name
    ]
  },
  {
    id: 'silly-sports-day',
    name: "Have a Silly Sports Day",
    type: "Games",
    description: "Fun, non-competitive sport activities",
    duration: "45 minutes",
    url: "https://www.scouts.org.uk/activities/have-a-silly-sports-day/",
    suitable: ["Beavers", "Cubs", "Scouts"],
    badges: [
      { section: "Beavers", name: "My Adventure Challenge" }, // Standardized name
      { section: "Cubs", name: "Our Adventure Challenge" }, // Standardized name
      { section: "Scouts", name: "Team Leader Challenge" } // Standardized name
    ]
  },
  {
    id: 'kwik-cricket',
    name: "Kwik Cricket Crew",
    type: "Sports",
    description: "Simplified cricket game for all ages",
    duration: "30 minutes",
    url: "https://www.scouts.org.uk/activities/kwik-cricket-crew/",
    suitable: ["Cubs", "Scouts"],
    badges: [
      { section: "Cubs", name: "Sports Enthusiast" }, // Standardized name
      { section: "Scouts", name: "Sports" } // Standardized name
    ]
  }
];

export default activities;
