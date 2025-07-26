 # from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import requests

# def search_with_selenium(phone_name):
#     options = Options()
#     # options.add_argument("--headless")  # Run browser in headless mode
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)  # Wait for page to load

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     driver.quit()

#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         return None

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         return None

#     # Fuzzy match: find closest match
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         return None

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 URL: https://www.gsmarena.com/{best_href}")

#     return f"https://www.gsmarena.com/{best_href}"

# def scrape_phone_specs(phone_url):
#     headers = {"User-Agent": "Mozilla/5.0"}
#     res = requests.get(phone_url, headers=headers)
#     soup = BeautifulSoup(res.content, "html.parser")

#     title = soup.select_one("h1.specs-phone-name-title")
#     if title:
#         print(f"\n📱 Phone: {title.text.strip()}")
#     else:
#         print("❌ Phone title not found.")
#         return

#     specs = {}
#     spec_tables = soup.select("table")

#     for table in spec_tables:
#         category_tag = table.find_previous_sibling("h2")
#         if not category_tag:
#             continue
#         category = category_tag.text.strip()
#         specs[category] = {}

#         for row in table.select("tr"):
#             if row.th and row.td:
#                 key = row.th.text.strip()
#                 value = row.td.text.strip()
#                 specs[category][key] = value

#     print("\n📋 Main Specifications:")
#     for category, items in specs.items():
#         print(f"\n🔹 {category}")
#         for k, v in items.items():
#             print(f" - {k}: {v}")

# # 🔍 Main Usage
# phone_name = "iPhone X"
# url = search_with_selenium(phone_name)
# if url:
#     scrape_phone_specs(url)


# HTML Scrapper 

# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import re

# def slugify(text):
#     # Converts text to a safe filename
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def save_html_to_file(html, phone_name):
#     filename = slugify(phone_name) + ".html"
#     with open(filename, "w", encoding="utf-8") as file:
#         file.write(html)
#     print(f"✅ HTML content saved to: {filename}")

# def search_and_save_html(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)  # Wait for page load

#     soup = BeautifulSoup(driver.page_source, "html.parser")

#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         driver.quit()
#         return None

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         driver.quit()
#         return None

#     # Step 2: Get Best Match
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         driver.quit()
#         return None

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 Navigating to: {full_url}")

#     # Step 3: Navigate to phone page and save HTML
#     driver.get(full_url)
#     time.sleep(2)

#     phone_html = driver.page_source
#     save_html_to_file(phone_html, best_match)

#     driver.quit()

# # Run it
# search_and_save_html("Samsung Galaxy S24")


# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import csv
# import re

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def search_and_scrape_all_data_to_csv(phone_name):
#     options = Options()
#     # options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search for the phone
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         driver.quit()
#         return

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         driver.quit()
#         return

#     # Step 2: Match phone name
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         driver.quit()
#         return

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 Navigating to: {full_url}")

#     # Step 3: Go to phone page and scrape all data
#     driver.get(full_url)
#     time.sleep(2)
#     phone_html = driver.page_source
#     driver.quit()

#     soup = BeautifulSoup(phone_html, "html.parser")

#     title = soup.select_one("h1.specs-phone-name-title")
#     if title:
#         phone_title = title.text.strip()
#     else:
#         phone_title = best_match

#     # Step 4: Scrape all content (text and HTML)
#     all_data = []

#     for element in soup.find_all(True):  # True means all tags
#         if element.name:  # Ensure it's an HTML element
#             text = element.get_text(strip=True)
#             if text:  # Skip empty text elements
#                 html_tag = element.name
#                 all_data.append({
#                     "HTML Tag": html_tag,
#                     "Content": text
#                 })

#     # Step 5: Save to CSV
#     filename = slugify(phone_title) + ".csv"
#     with open(filename, mode="w", newline="", encoding="utf-8") as csvfile:
#         fieldnames = ["HTML Tag", "Content"]
#         writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#         writer.writeheader()
#         writer.writerows(all_data)

#     print(f"✅ All data saved to: {filename}")

# # Run it
# search_and_scrape_all_data_to_csv("Samsung A06")




# JSON CODE


# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import json
# import re

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def search_and_scrape_all_tables_to_json(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search for the phone
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         driver.quit()
#         return

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         driver.quit()
#         return

#     # Step 2: Match phone name
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         driver.quit()
#         return

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 Navigating to: {full_url}")

#     # Step 3: Go to phone page and scrape data
#     driver.get(full_url)
#     time.sleep(2)
#     phone_html = driver.page_source
#     driver.quit()

#     soup = BeautifulSoup(phone_html, "html.parser")

#     # Get the phone title
#     title = soup.select_one("h1.specs-phone-name-title")
#     phone_title = title.text.strip() if title else best_match

#     # Step 4: Extract all <table> data
#     tables = soup.find_all("table")
#     tables_data = {}

#     for idx, table in enumerate(tables, start=1):
#         # Find associated section heading (if available)
#         section_title_tag = table.find_previous("h2")
#         section_title = section_title_tag.get_text(strip=True) if section_title_tag else f"Table_{idx}"
#         section_data = {}

#         for row in table.find_all("tr"):
#             key_td = row.find("td", class_="ttl")
#             value_td = row.find("td", class_="nfo")

#             if key_td and value_td:
#                 key = key_td.get_text(strip=True)
#                 value = value_td.get_text(" ", strip=True)
#                 section_data[key] = value

#         if section_data:
#             tables_data[section_title] = section_data

#     # Step 5: Save all extracted data to JSON
#     json_filename = slugify(phone_title) + "_all_tables_data.json"
#     with open(json_filename, mode="w", encoding="utf-8") as jsonfile:
#         json.dump(tables_data, jsonfile, indent=4, ensure_ascii=False)

#     print(f"✅ All tables data saved to: {json_filename}")

# # Example usage
# search_and_scrape_all_tables_to_json("Samsung Galaxy S24")

# FINAL SCRAP CODE:

# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import json
# import re

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def search_and_scrape_all_tables_to_json(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search for the phone
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         driver.quit()
#         return

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         driver.quit()
#         return

#     # Step 2: Match phone name
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         driver.quit()
#         return

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 Navigating to: {full_url}")

#     # Step 3: Go to phone page and scrape data
#     driver.get(full_url)
#     time.sleep(2)
#     phone_html = driver.page_source
#     driver.quit()

#     soup = BeautifulSoup(phone_html, "html.parser")

#     # Get the phone title
#     title = soup.select_one("h1.specs-phone-name-title")
#     phone_title = title.text.strip() if title else best_match

#     # Step 4: Extract all <table> data
#     tables = soup.find_all("table")
#     tables_data = {}

#     for idx, table in enumerate(tables, start=1):
#         # Try to find section title via <h2>
#         section_title_tag = table.find_previous("h2")
#         if section_title_tag:
#             section_title = section_title_tag.get_text(strip=True)
#         else:
#             # Fallback: use first <th scope="row">
#             th_row = table.find("th", {"scope": "row"})
#             section_title = th_row.get_text(strip=True) if th_row else f"Table_{idx}"

#         section_data = {}
#         for row in table.find_all("tr"):
#             key_td = row.find("td", class_="ttl")
#             value_td = row.find("td", class_="nfo")

#             if key_td and value_td:
#                 key = key_td.get_text(strip=True)
#                 value = value_td.get_text(" ", strip=True)
#                 section_data[key] = value

#         if section_data:
#             tables_data[section_title] = section_data

#     # Step 5: Save all extracted data to JSON
#     json_filename = slugify(phone_title) + "_all_tables_data.json"
#     with open(json_filename, mode="w", encoding="utf-8") as jsonfile:
#         json.dump(tables_data, jsonfile, indent=4, ensure_ascii=False)

#     print(f"✅ All tables data saved to: {json_filename}")

# # Example usage
# search_and_scrape_all_tables_to_json("Samsung Galaxy S24")

# SCRAPPING WITH PICTURES

# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import json
# import re

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def search_and_scrape_all_tables_to_json_and_photo_page(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search for the phone
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         driver.quit()
#         return

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         driver.quit()
#         return

#     # Step 2: Match phone name
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         driver.quit()
#         return

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 Navigating to: {full_url}")

#     # Step 3: Go to phone page and scrape data
#     driver.get(full_url)
#     time.sleep(2)
#     phone_html = driver.page_source
#     soup = BeautifulSoup(phone_html, "html.parser")

#     # Get the phone title
#     title = soup.select_one("h1.specs-phone-name-title")
#     phone_title = title.text.strip() if title else best_match

#     # Step 4: Extract all <table> data
#     tables = soup.find_all("table")
#     tables_data = {}

#     for idx, table in enumerate(tables, start=1):
#         # Try to find section title via <h2>
#         section_title_tag = table.find_previous("h2")
#         if section_title_tag:
#             section_title = section_title_tag.get_text(strip=True)
#         else:
#             th_row = table.find("th", {"scope": "row"})
#             section_title = th_row.get_text(strip=True) if th_row else f"Table_{idx}"

#         section_data = {}
#         for row in table.find_all("tr"):
#             key_td = row.find("td", class_="ttl")
#             value_td = row.find("td", class_="nfo")

#             if key_td and value_td:
#                 key = key_td.get_text(strip=True)
#                 value = value_td.get_text(" ", strip=True)
#                 section_data[key] = value

#         if section_data:
#             tables_data[section_title] = section_data

#     # Step 5: Navigate to the photo page
#     photo_div = soup.find("div", class_="specs-photo-main")
#     photo_link_tag = photo_div.find("a") if photo_div else None
#     image_urls = []

#     if photo_link_tag and photo_link_tag.has_attr("href"):
#         photo_url = f"https://www.gsmarena.com/{photo_link_tag['href']}"
#         print(f"📸 Navigating to photo page: {photo_url}")
#         driver.get(photo_url)
#         time.sleep(2)
#         photo_soup = BeautifulSoup(driver.page_source, "html.parser")

#         # Step 6: Extract image URLs
#         pictures_list = photo_soup.find("div", id="pictures-list")
#         if pictures_list:
#             img_tags = pictures_list.find_all("img")
#             image_urls = [img['src'] for img in img_tags if img.has_attr("src")]

#         # Add to JSON
#         tables_data["Image Gallery"] = image_urls
#         print(f"🖼️ Found {len(image_urls)} image URLs.")
#     else:
#         print("⚠️ No photo link found on the specs page.")
#         tables_data["Image Gallery"] = []

#     # Step 7: Save to JSON
#     json_filename = slugify(phone_title) + "_specs_with_images.json"
#     with open(json_filename, mode="w", encoding="utf-8") as jsonfile:
#         json.dump(tables_data, jsonfile, indent=4, ensure_ascii=False)

#     print(f"✅ All data including images saved to: {json_filename}")
#     driver.quit()

# # Example usage
# search_and_scrape_all_tables_to_json_and_photo_page("Samsung z11")



# FLASK API CODE

# from flask import Flask, request, jsonify
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import re
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app) 

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def get_phone_specs(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")
#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search page
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)
#     soup = BeautifulSoup(driver.page_source, "html.parser")

#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         driver.quit()
#         return {"error": "No search results found."}

#     phone_links = search_block.find_all("a")
#     phone_data = {link.find("strong").text.strip(): link["href"] for link in phone_links if link.find("strong")}

#     matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not matches:
#         driver.quit()
#         return {"error": "No similar phone name found."}

#     best_match = matches[0]
#     best_href = phone_data[best_match]
#     phone_url = f"https://www.gsmarena.com/{best_href}"

#     # Step 2: Phone specs page
#     driver.get(phone_url)
#     time.sleep(2)
#     soup = BeautifulSoup(driver.page_source, "html.parser")

#     # Step 3: Extract specs data from all tables
#     specs_list = soup.find("div", id="specs-list")
#     result_json = {}

#     if specs_list:
#         tables = specs_list.find_all("table")
#         for table in tables:
#             table_rows = table.find_all("tr")
#             if table_rows:
#                 table_title_tag = table.find("th", scope="row")
#                 table_title = table_title_tag.get_text(strip=True) if table_title_tag else "Unnamed_Section"
#                 table_data = {}
#                 for row in table_rows:
#                     key_tag = row.find("td", class_="ttl")
#                     val_tag = row.find("td", class_="nfo")
#                     if key_tag and val_tag:
#                         key = key_tag.get_text(strip=True)
#                         val = val_tag.get_text(strip=True)
#                         table_data[key] = val
#                 result_json[table_title] = table_data

#     # Step 4: Go to image gallery page
#     image_div = soup.find("div", class_="specs-photo-main")
#     image_page_url = None
#     if image_div and image_div.find("a"):
#         image_page_url = "https://www.gsmarena.com/" + image_div.find("a")["href"]
#         driver.get(image_page_url)
#         time.sleep(2)
#         image_soup = BeautifulSoup(driver.page_source, "html.parser")

#         # Extract all image URLs
#         picture_list = image_soup.find("div", id="pictures-list")
#         if picture_list:
#             image_tags = picture_list.find_all("img")
#             image_urls = [img["src"] for img in image_tags if img.get("src")]
#             result_json["Images"] = image_urls

#     driver.quit()
#     return result_json

# @app.route("/get-phone-specs", methods=["GET"])
# def get_specs_api():
#     phone_name = request.args.get("name")
#     if not phone_name:
#         return jsonify({"error": "Please provide a phone name in the 'name' query parameter."}), 400

#     data = get_phone_specs(phone_name)
#     return jsonify(data)

# if __name__ == "__main__":
#     app.run(debug=True)


# Removed the images with Blob:

# from flask import Flask, request, jsonify
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import json
# import re

# app = Flask(__name__)

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def scrape_phone_data(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search for the phone
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         driver.quit()
#         return {"error": "No search results found."}

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         driver.quit()
#         return {"error": "No phone titles found."}

#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         driver.quit()
#         return {"error": "No similar phone name found."}

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     # Step 2: Go to phone specs page
#     driver.get(full_url)
#     time.sleep(2)
#     soup = BeautifulSoup(driver.page_source, "html.parser")

#     # Get phone title
#     title = soup.select_one("h1.specs-phone-name-title")
#     phone_title = title.text.strip() if title else best_match

#     # Step 3: Extract all tables
#     tables = soup.find_all("table")
#     tables_data = {}

#     for idx, table in enumerate(tables, start=1):
#         section_title_tag = table.find_previous("h2")
#         if section_title_tag:
#             section_title = section_title_tag.get_text(strip=True)
#         else:
#             th_row = table.find("th", {"scope": "row"})
#             section_title = th_row.get_text(strip=True) if th_row else f"Table_{idx}"

#         section_data = {}
#         for row in table.find_all("tr"):
#             key_td = row.find("td", class_="ttl")
#             value_td = row.find("td", class_="nfo")

#             if key_td and value_td:
#                 key = key_td.get_text(strip=True)
#                 value = value_td.get_text(" ", strip=True)
#                 section_data[key] = value

#         if section_data:
#             tables_data[section_title] = section_data

#     # Step 4: Navigate to photo page
#     photo_div = soup.find("div", class_="specs-photo-main")
#     photo_link_tag = photo_div.find("a") if photo_div else None
#     image_urls = []

#     if photo_link_tag and photo_link_tag.has_attr("href"):
#         photo_url = f"https://www.gsmarena.com/{photo_link_tag['href']}"
#         driver.get(photo_url)
#         time.sleep(2)
#         photo_soup = BeautifulSoup(driver.page_source, "html.parser")

#         # Step 5: Extract image URLs with matching alt
#         pictures_list = photo_soup.find("div", id="pictures-list")
#         if pictures_list:
#             img_tags = pictures_list.find_all("img")
#             image_urls = [
#                 img['src']
#                 for img in img_tags
#                 if img.has_attr("src") and img.get("alt", "").strip().lower() == phone_name.strip().lower()
#             ]

#         tables_data["Image Gallery"] = image_urls
#     else:
#         tables_data["Image Gallery"] = []

#     driver.quit()
#     return {
#         "phone_name": phone_title,
#         "data": tables_data
#     }

# @app.route("/api/phone_specs", methods=["GET"])
# def get_phone_specs():
#     phone_name = request.args.get("name")
#     if not phone_name:
#         return jsonify({"error": "Missing 'name' parameter"}), 400

#     try:
#         result = scrape_phone_data(phone_name)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # For local development
# if __name__ == "__main__":
#     app.run(debug=True)






# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import json
# import re

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def search_and_scrape_all_tables_to_json_and_photo_page(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     # Step 1: Search for the phone
#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         print("❌ No search results found.")
#         driver.quit()
#         return

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         print("❌ No phone titles found.")
#         driver.quit()
#         return

#     # Step 2: Match phone name
#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         print("❌ No similar phone name found.")
#         driver.quit()
#         return

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     print(f"✅ Best Match: {best_match}")
#     print(f"🔗 Navigating to: {full_url}")

#     # Step 3: Go to phone page and scrape data
#     driver.get(full_url)
#     time.sleep(2)
#     phone_html = driver.page_source
#     soup = BeautifulSoup(phone_html, "html.parser")

#     # Get the phone title
#     title = soup.select_one("h1.specs-phone-name-title")
#     phone_title = title.text.strip() if title else best_match

#     # Step 4: Extract all <table> data
#     tables = soup.find_all("table")
#     tables_data = {}

#     for idx, table in enumerate(tables, start=1):
#         section_title_tag = table.find_previous("h2")
#         if section_title_tag:
#             section_title = section_title_tag.get_text(strip=True)
#         else:
#             th_row = table.find("th", {"scope": "row"})
#             section_title = th_row.get_text(strip=True) if th_row else f"Table_{idx}"

#         section_data = {}
#         for row in table.find_all("tr"):
#             key_td = row.find("td", class_="ttl")
#             value_td = row.find("td", class_="nfo")
#             if key_td and value_td:
#                 key = key_td.get_text(strip=True)
#                 value = value_td.get_text(" ", strip=True)
#                 section_data[key] = value

#         if section_data:
#             tables_data[section_title] = section_data

#     # Step 5: Navigate to the photo page
#     photo_div = soup.find("div", class_="specs-photo-main")
#     photo_link_tag = photo_div.find("a") if photo_div else None
#     image_urls = []
#     photo_div_html = photo_div.prettify() if photo_div else ""

#     if photo_link_tag and photo_link_tag.has_attr("href"):
#         photo_url = f"https://www.gsmarena.com/{photo_link_tag['href']}"
#         print(f"📸 Navigating to photo page: {photo_url}")
#         driver.get(photo_url)
#         time.sleep(2)
#         photo_soup = BeautifulSoup(driver.page_source, "html.parser")

#         # Step 6: Extract image URLs by alt or data-src
#         img_tags = photo_soup.find_all("img")
#         for img in img_tags:
#             alt_text = img.get("alt", "").strip().lower()
#             src = img.get("src")
#             data_src = img.get("data-src")

#             if alt_text == phone_title.lower():
#                 img_url = src if src else data_src
#                 if img_url:
#                     image_urls.append(img_url)

#         print(f"🖼️ Found {len(image_urls)} image URLs for '{phone_title}'.")
#     else:
#         print("⚠️ No photo link found on the specs page.")

#     # Add to JSON
#     tables_data["Image Gallery"] = image_urls
#     tables_data["Specs Photo Main HTML"] = photo_div_html

#     # Step 7: Save to JSON
#     json_filename = slugify(phone_title) + "_specs_with_images.json"
#     with open(json_filename, mode="w", encoding="utf-8") as jsonfile:
#         json.dump(tables_data, jsonfile, indent=4, ensure_ascii=False)

#     print(f"✅ All data including images saved to: {json_filename}")
#     driver.quit()

# # Example usage
# search_and_scrape_all_tables_to_json_and_photo_page("Samsung Galaxy s24")


# from flask import Flask, request, jsonify
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from bs4 import BeautifulSoup
# from difflib import get_close_matches
# import time
# import re
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app) 

# def slugify(text):
#     return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

# def scrape_phone_data(phone_name):
#     options = Options()
#     options.add_argument("--headless")
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")

#     driver = webdriver.Chrome(options=options)

#     search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
#     driver.get(search_url)
#     time.sleep(2)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     search_block = soup.find("div", class_="makers")
#     if not search_block:
#         driver.quit()
#         return {"error": "No search results found."}

#     phone_links = search_block.find_all("a")
#     phone_data = {}

#     for link in phone_links:
#         title_tag = link.find("strong")
#         if title_tag:
#             title = title_tag.text.strip()
#             href = link["href"]
#             phone_data[title] = href

#     if not phone_data:
#         driver.quit()
#         return {"error": "No phone titles found."}

#     closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
#     if not closest_matches:
#         driver.quit()
#         return {"error": "No similar phone name found."}

#     best_match = closest_matches[0]
#     best_href = phone_data[best_match]
#     full_url = f"https://www.gsmarena.com/{best_href}"

#     driver.get(full_url)
#     time.sleep(2)
#     phone_html = driver.page_source
#     soup = BeautifulSoup(phone_html, "html.parser")

#     title = soup.select_one("h1.specs-phone-name-title")
#     phone_title = title.text.strip() if title else best_match

#     tables = soup.find_all("table")
#     tables_data = {}

#     for idx, table in enumerate(tables, start=1):
#         section_title_tag = table.find_previous("h2")
#         if section_title_tag:
#             section_title = section_title_tag.get_text(strip=True)
#         else:
#             th_row = table.find("th", {"scope": "row"})
#             section_title = th_row.get_text(strip=True) if th_row else f"Table_{idx}"

#         section_data = {}
#         for row in table.find_all("tr"):
#             key_td = row.find("td", class_="ttl")
#             value_td = row.find("td", class_="nfo")
#             if key_td and value_td:
#                 key = key_td.get_text(strip=True)
#                 value = value_td.get_text(" ", strip=True)
#                 section_data[key] = value

#         if section_data:
#             tables_data[section_title] = section_data

#     photo_div = soup.find("div", class_="specs-photo-main")
#     photo_link_tag = photo_div.find("a") if photo_div else None
#     photo_div_html = photo_div.prettify() if photo_div else ""
#     image_urls = []

#     if photo_link_tag and photo_link_tag.has_attr("href"):
#         photo_url = f"https://www.gsmarena.com/{photo_link_tag['href']}"
#         driver.get(photo_url)
#         time.sleep(2)
#         photo_soup = BeautifulSoup(driver.page_source, "html.parser")

#         img_tags = photo_soup.find_all("img")
#         for img in img_tags:
#             alt_text = img.get("alt", "").strip().lower()
#             src = img.get("src")
#             data_src = img.get("data-src")

#             if alt_text == phone_title.lower():
#                 img_url = src if src else data_src
#                 if img_url:
#                     image_urls.append(img_url)

#     tables_data["ImageGallery"] = image_urls
#     tables_data["Specs Photo Main HTML"] = photo_div_html

#     driver.quit()
#     return tables_data

# @app.route('/scrape-phone', methods=['GET'])
# def scrape_api():
#     phone_name = request.args.get('name')
#     if not phone_name:
#         return jsonify({"error": "Missing 'name' query parameter."}), 400

#     result = scrape_phone_data(phone_name)
#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True)





from flask import Flask, request, jsonify, send_file
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from difflib import get_close_matches
from io import BytesIO
import requests
import time
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def slugify(text):
    return re.sub(r'[^\w\-_. ]', '_', text).replace(" ", "_").lower()

def scrape_phone_data(phone_name):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=options)

    search_url = f"https://www.gsmarena.com/res.php3?sSearch={phone_name.replace(' ', '+')}"
    driver.get(search_url)
    time.sleep(2)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    search_block = soup.find("div", class_="makers")
    if not search_block:
        driver.quit()
        return {"error": "No search results found."}

    phone_links = search_block.find_all("a")
    phone_data = {}

    for link in phone_links:
        title_tag = link.find("strong")
        if title_tag:
            title = title_tag.text.strip()
            href = link["href"]
            phone_data[title] = href

    if not phone_data:
        driver.quit()
        return {"error": "No phone titles found."}

    closest_matches = get_close_matches(phone_name, phone_data.keys(), n=1, cutoff=0.4)
    if not closest_matches:
        driver.quit()
        return {"error": "No similar phone name found."}

    best_match = closest_matches[0]
    best_href = phone_data[best_match]
    full_url = f"https://www.gsmarena.com/{best_href}"

    driver.get(full_url)
    time.sleep(2)
    phone_html = driver.page_source
    soup = BeautifulSoup(phone_html, "html.parser")

    title = soup.select_one("h1.specs-phone-name-title")
    phone_title = title.text.strip() if title else best_match

    tables = soup.find_all("table")
    tables_data = {}

    for idx, table in enumerate(tables, start=1):
        section_title_tag = table.find_previous("h2")
        if section_title_tag:
            section_title = section_title_tag.get_text(strip=True)
        else:
            th_row = table.find("th", {"scope": "row"})
            section_title = th_row.get_text(strip=True) if th_row else f"Table_{idx}"

        section_data = {}
        for row in table.find_all("tr"):
            key_td = row.find("td", class_="ttl")
            value_td = row.find("td", class_="nfo")
            if key_td and value_td:
                key = key_td.get_text(strip=True)
                value = value_td.get_text(" ", strip=True)
                section_data[key] = value

        if section_data:
            tables_data[section_title] = section_data

    photo_div = soup.find("div", class_="specs-photo-main")
    photo_link_tag = photo_div.find("a") if photo_div else None
    photo_div_html = photo_div.prettify() if photo_div else ""
    image_urls = []

    if photo_link_tag and photo_link_tag.has_attr("href"):
        photo_url = f"https://www.gsmarena.com/{photo_link_tag['href']}"
        driver.get(photo_url)
        time.sleep(2)
        photo_soup = BeautifulSoup(driver.page_source, "html.parser")

        img_tags = photo_soup.find_all("img")
        for img in img_tags:
            alt_text = img.get("alt", "").strip().lower()
            src = img.get("src")
            data_src = img.get("data-src")

            if alt_text == phone_title.lower():
                img_url = src if src else data_src
                if img_url:
                    image_urls.append(img_url)

    tables_data["ImageGallery"] = image_urls
    tables_data["Specs Photo Main HTML"] = photo_div_html

    driver.quit()
    return tables_data

@app.route('/scrape-phone', methods=['GET'])
def scrape_api():
    phone_name = request.args.get('name')
    if not phone_name:
        return jsonify({"error": "Missing 'name' query parameter."}), 400

    result = scrape_phone_data(phone_name)
    return jsonify(result)

# ✅ Proxy route to download images bypassing CORS
@app.route('/download-image')
def download_image():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'Missing URL'}), 400

    try:
        response = requests.get(url)
        response.raise_for_status()

        return send_file(
            BytesIO(response.content),
            mimetype=response.headers.get('Content-Type', 'image/jpeg'),
            as_attachment=False,
            download_name=url.split("/")[-1]
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
