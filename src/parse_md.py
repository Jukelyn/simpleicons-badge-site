# pylint: disable=E0401
"""
Downloads and parses the markdown file. Once parsed, the badges and urls are
saved to a json file.
"""
import json
import logging
import requests
import markdown
from bs4 import BeautifulSoup
from src.utils import timestamp

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

logger = logging.getLogger(__name__)

BASE_URL = "https://raw.githubusercontent.com/"
URL = BASE_URL + "Ileriayo/markdown-badges/refs/heads/master/README.md"
MARKDOWN_FILE = "data/markdown_readme.md"


def get_readme(url: str = URL) -> str:
    """
    Downloads the markdown file from the URL.

    Args:
        url (str, optional): The URL of the markdown file to download.
                             Defaults to URL.

    Returns:
        (str): This filename.

    Raises:
        requests.exceptions.RequestException: If the HTTP request fails.
    """
    try:
        response = requests.get(url, stream=True, timeout=10)
        response.raise_for_status()  # Check for HTTP errors

        with open(MARKDOWN_FILE, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        logger.info("File downloaded successfully to %s", MARKDOWN_FILE)
    except requests.exceptions.RequestException as e:
        logger.error("Error downloading file: %s", e)

    return MARKDOWN_FILE


def parse_markdown_tables(file_path: str) -> list[dict]:
    """
    Parses the markdown file to extract badge data from tables.

    Args:
        file_path (str): The path of the file to be parsed.

    Returns:
        list[dict]: A list of the markdown badges.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        logger.error("File not found: %s", file_path)
        return []

    html_content = markdown.markdown(content, extensions=['tables'])
    soup = BeautifulSoup(html_content, 'html.parser')

    badge_data = []

    for table in soup.find_all('table'):
        headers = [header.get_text(strip=True)
                   for header in table.find_all('th')]
        if 'Name' in headers and 'Badge' in headers and 'Markdown' in headers:
            rows = table.find_all('tr')[1:]  # Skip the header row

            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 3:
                    name = cols[0].get_text(strip=True)
                    badge_tag = cols[1].find('img')
                    badge_url = badge_tag['src'] if badge_tag else ''
                    badge_data.append({"badge": name, "badgeURL": badge_url})

    logger.info("Found %s badges.", len(badge_data))
    return badge_data


def save_to_json(data: list, file_name: str = 'data/badges.json') -> None:
    """
    Saves the extracted badge data to a JSON file.

    Args:
        data (list): The data to be written.
        file_name (str, optional): The filename. Defaults to 'badges.json'.

    Returns:
        (None): This function does not return a value.
    """

    try:
        filtered_data = [
            entry for entry in data if entry.get('badge', '').strip()]

        sorted_data = sorted(filtered_data, key=lambda x: x['badge'].lower())

        with open(file_name, 'w', encoding='utf-8') as f:
            json.dump(sorted_data, f, indent=2)
            f.write('\n')

        logger.info("Data successfully saved to %s", file_name)
    except IOError as e:
        logger.error("Error saving to JSON file: %s", e)
    except KeyError as e:
        logger.error(
            "'badge' key not found in one or more data entries: %s", e)

    current_time = timestamp.get_time()

    with open("data/last_updated.txt", "w", encoding="utf-8") as f:
        f.write(current_time)

    logger.info("File updated at %s", current_time)


if __name__ == "__main__":
    get_readme()
    badges = parse_markdown_tables(MARKDOWN_FILE)
    save_to_json(badges)
