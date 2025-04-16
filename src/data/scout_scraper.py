import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import time
import json

# Load links from your text files
def load_links(file_paths):
    links = set()
    for path in file_paths:
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                url = line.strip()
                if url.startswith("https://www.scouts.org.uk/activities/"):
                    links.add(url)
    return list(links)

# Extract activity data
def scrape_activity(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Detect if blocked
        if "Sorry, you have been blocked" in soup.text:
            return {
                "title": "Blocked",
                "description": "Blocked by website",
                "url": url,
                "duration": None,
                "location": None,
                "cost": None,
                "sections": [],
                "outcomes": None,
                "badges": []
            }

        title = soup.find('h1').text.strip()
        description_tag = soup.find("meta", attrs={"name": "description"})
        description = description_tag["content"].strip() if description_tag else "No description"

        # Extract basic fields using known labels on page
        def get_labelled_value(label):
            tag = soup.find("dt", string=label)
            return tag.find_next("dd").text.strip() if tag else None

        duration = get_labelled_value("Time")
        location = get_labelled_value("Where")
        cost = get_labelled_value("Cost")
        sections = get_labelled_value("Suitable for")
        outcomes = get_labelled_value("Activity outcomes")

        # Extract badge links
        badges = []
        badge_tags = soup.select("a[href*='/badges/']")
        for tag in badge_tags:
            badge = tag.text.strip()
            if badge and badge not in badges:
                badges.append(badge)

        return {
            "title": title,
            "description": description,
            "url": url,
            "duration": duration,
            "location": location,
            "cost": cost,
            "sections": sections.split(", ") if sections else [],
            "outcomes": outcomes,
            "badges": badges
        }

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return {
            "title": "Error",
            "description": str(e),
            "url": url,
            "duration": None,
            "location": None,
            "cost": None,
            "sections": [],
            "outcomes": None,
            "badges": []
        }

# Main routine
def scrape_all(file_paths, limit=50):  # Limit can be changed to None for full scrape
    links = load_links(file_paths)
    activities = []

    for i, url in enumerate(tqdm(links[:limit])):
        data = scrape_activity(url)
        activities.append(data)
        time.sleep(3)  # polite delay

    return activities

if __name__ == "__main__":
    file_paths = [
        "activities-1.txt",
        "activities-2.txt",
        "activities-3.txt",
        "activities-4.txt",
        "activities-5.txt"
    ]

    print("Starting scrape...")
    results = scrape_all(file_paths, limit=50)  # change to None or 1319 later

    # Save to JS format
    with open("activities.js", "w", encoding="utf-8") as f:
        f.write("export const activities = ")
        json.dump(results, f, indent=2)
        f.write(";")

    print("✅ Scraping complete. Data saved to activities.js")
