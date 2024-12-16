import requests
import json
import os

supported_countries = [
    "Mexico"
]

STATES_URL = "https://countriesnow.space/api/v0.1/countries/states"

CITIES_URL = "https://countriesnow.space/api/v0.1/countries/state/cities"

def main():
    for country in supported_countries:
        states = get_states(country)

        if not os.path.exists(country):
            os.makedirs(country)

        with open(f"{country}/states.json", "w", encoding='utf-8') as f:
            json.dump(states, f, ensure_ascii=False, indent=4)

        for state in states:
            cities = get_cities(country, state)
            
            with open(f"{country}/{state}.json", "w", encoding='utf-8') as f:
                json.dump(cities, f, ensure_ascii=False, indent=4)


def get_states(country):
    request = requests.post(STATES_URL, json={"country": country})
    data = request.json()['data']['states']

    states = [state['name'] for state in data]

    return states

def get_cities(country, state):
    request = requests.post(CITIES_URL, json={"country": country, "state": state})
    return request.json()['data']

if __name__ == '__main__':
    main()
