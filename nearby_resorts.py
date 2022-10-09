import json
from nautical_calculations import convert_to_miles, get_distance

with open("data.json", 'r') as my_json:
    json_dict = json.load(my_json)

def nearby_resorts(lat, lng, distance_in_miles):
    """
    Takes lat, lng coordinates, distance(mi) as parameters, then prints out a list of nearby resorts that are
    less than or equal to the passed in distance in miles.
    """

    all_resorts = json_dict["skiAreas"]["skiArea"]
    closest_four = []
    for index in range(len(all_resorts)):

        if all_resorts[index].get('georeferencing') == None:
            continue
        elif all_resorts[index]['georeferencing'].get('@lat') == None:
            continue
        else:
            resort_lat = all_resorts[index]['georeferencing']['@lat']
            resort_lng = all_resorts[index]['georeferencing']['@lng']
            resort_name = all_resorts[index]['name']
            resort_id = all_resorts[index]['@id']

        distance_from_resort = convert_to_miles(get_distance(lat, lng, resort_lat, resort_lng))

        #if distance from resort is less than or equal to 100 miles, print the resort name
        #can change to return resort
        if distance_from_resort <= distance_in_miles:
            if len(closest_four) < 4:
                closest_four.append([resort_name,distance_from_resort,resort_id])
            elif len(closest_four) == 4:
                for x in closest_four:
                    if x[1]>distance_from_resort:
                        closest_four.remove(x)
                        closest_four.append([resort_name,distance_from_resort,resort_id])
                        break

            # print(f'{resort_name}: {round(distance_from_resort, 2)} miles away')
    closest_four_ids=[]
    for x in (closest_four):
        closest_four_ids.append(x[2])
    return closest_four_ids

nearby_resorts(46.42132771689195,-117.02499207849331,100)