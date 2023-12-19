# ------------------------------------------------------------------------------
# Aggregrate a collection of `workshops.yml` files into a single feed document.
#
# Valid XML documents should have (1) a single root element, and (2) unique
# elements within each level of a given branch. Python loads the contents of
# each `workshops.yml` file into a collection of lists and dictionaries that may
# not satisfy these criteria. We will restructure the contents into into a
# single nested dictionary that we can convert into valid XML.
#
# You can browse the feeds at:
#   <site>/feeds/workshops.xml
#   <site>/feeds/workshops.json
#
# This may not work in all browsers; for example, Safari will open a newsreader
# any time you try to read XML.
# ------------------------------------------------------------------------------

# Load base Python modules
import json
import pprint
from pathlib import Path

# Load third-party modules
import xmltodict
import yaml

# Create a pretty printer for debugging
pp = pprint.PrettyPrinter(compact=True)

# Create Path objects for input and output directories
input_path = Path.cwd().parent.joinpath("_data")
output_path = Path.cwd().parent.joinpath("feeds")

workshops = {}

# Load all `workshops.yml` files from the `_data` directory
input_files = sorted(p.joinpath("workshops.yml") for p in input_path.glob("yml_20*"))
print("Loading the following files:")
pp.pprint(input_files)

for filename in input_files:
    if filename.is_file():
        with open(filename, "r") as f:
            # Load `workshops.yml` file as a list of dictionaries
            yaml_list = yaml.safe_load(f)

            # Create a more readable label for the current year;
            # e.g., "yml_2021" -> "year_2021"
            year_str = "_".join(["year", filename.parts[-2].split("yml_")[-1]])

            workshop_dict = {}

            for workshop in yaml_list:
                # Get unique key for each workshop
                workshop_name = workshop["name"]

                # Update any workshop workshop key that begins with a digit to
                # make it legal XML
                if workshop_name[0].isnumeric():
                    workshop_name = "_".join(["str", workshop_name])

                workshop_dict[workshop_name] = workshop

            # Add complete workshop_dict for current year to master dictionary
            workshops[year_str] = workshop_dict

# Create a document with a unique root
document = {"workshops": workshops}

# Write the document to XML and JSON format
xml_doc = xmltodict.unparse(document, pretty = True, indent = "  ")
json_doc = json.dumps(document, indent = 2).replace('\\"', "'")

# Save each document to file
xml_file = output_path.joinpath("workshops.xml")
json_file = output_path.joinpath("workshops.json")

with open(xml_file, "w") as fxml, open(json_file, "w") as fjson:
    fxml.write(xml_doc)
    fjson.write(json_doc)
