import requests

# Define the URL of the Flask app
url = 'http://127.0.0.1:5000/recommend'

# Define the user ID you want to send in the request
user_id = '66353ad5b757b80b942e8201'

# Define the request payload
payload = {'user_id': user_id}

# Send the POST request
response = requests.post(url, json=payload)

# Print the response
print(response.json())
