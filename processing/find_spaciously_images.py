# Import necessary libraries
from bs4 import BeautifulSoup
import pandas as pd

existing_df = pd.read_csv('spaciously_experiences.csv')

# initialize a list to store all events
all_events = []

# list of HTML files to parse
html_files = [
    'spaciously_scrape_1.html',
    'spaciously_scrape_2.html',
    'spaciously_scrape_3.html',
    'spaciously_scrape_4.html',
    'spaciously_scrape_5.html',
    'spaciously_scrape_6.html'
]

# Function to parse HTML and extract events
# the resulting df has two columns: slug and image-url
def parse_html(file_name):
    with open(f"html/{file_name}", 'r') as file:
        html_content = file.read()
    soup = BeautifulSoup(html_content, 'html.parser')
    list_items = soup.find_all('div', role='listitem')
    events = []
    for item in list_items:
        link_block = item.find('a', class_='link-block')
        if link_block:
            slug = link_block.get('href', '').split('/')[-1]
            image_tag = item.find('img', class_='experience-image')
            if image_tag:
                image_url = image_tag.get('src', '')
                events.append({'slug': slug, 'image-url': image_url})
    return events

for html_file in html_files:
    events = parse_html(html_file)
    all_events.extend(events)

# convert the list of all events to a df
all_events_df = pd.DataFrame(all_events)

# merge all_events_df with existing_df using the 'Webflow Slug' column as the identifier
merged_all_events_df = all_events_df.merge(existing_df, on='Webflow Slug', how='left')

# drop duplicate rows based on the 'Webflow Slug' column and drop the 'Image 1' column
merged_all_events_df_unique = merged_all_events_df.drop_duplicates(subset='Webflow Slug')
merged_all_events_df_unique = merged_all_events_df_unique.drop('Image 1', axis=1)

# save the new df to a csv file
merged_all_events_df_unique.to_csv('spaciously_experiences_updated.csv', index=False)
