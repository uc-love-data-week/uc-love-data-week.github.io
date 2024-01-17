# Orientation

The `feedbuilder.py` script aggregates workshop descriptions from current and prior Love Data Week events. It publishes these descriptions in a public, machine-readable feed. The feed is available in two formats, XML and JSON.

The feed endpoints are:

1. <sitename>/feeds/workshops.xml
2. <sitename>/feeds/workshops.json

# Prerequisites

You will need a recent version of Python 3 (as a point of reference, the script was developed using Python 3.9).

In addition to base Python, you will need to install the following third-party libraries:

1. [PyYAML](https://pypi.org/project/PyYAML/)
2. [xmltodict](https://pypi.org/project/xmltodict/)

These should be available using your preferred installation method (e.g., conda, pip, etc.).

# How to run the script

1. Open your preferred terminal application
2. Change your location to the `_utilities/` directory
3. Run the command `python -X utf8 feedbuilder.py` (running Python with the `-X utf8` flag avoids character encoding problems that can occur when executing the script on Windows. For more information, see https://peps.python.org/pep-0540/ ).

(You can also run the script in your code editor if it's able to directly execute Python code).

## Output

1. You should see the message "Loading the following files". It will be followed by a list of files ending in `workshops.yml`.
2. When the script has finished running, you should see two updated files (`workshops.xml` and `workshops.json`) in the `feeds/` directory.

# How the script works

Valid XML documents need to have (1) a single root element, and (2) unique elements within each level of a given branch. The `workshops.yml` files don't satistfy these criteria. The script solves this by loading the files and reorganizing their contents into a single nested dictionary that can be converted into valid XML.

The original workshop files are loaded from `_data/yml_<year>/workshops.yml`.

The output files are written to `feeds/workshops.[json|xml]`.
