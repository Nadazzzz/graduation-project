from flask import Flask, request, jsonify
import pymongo
from bson import ObjectId  # Import ObjectId from bson module
import pandas as pd

app = Flask(__name__)

uri = "mongodb+srv://apiuser:api12345@projectwastend.agv1kks.mongodb.net/?retryWrites=true&w=majority&appName=ProjectWastend"

client = pymongo.MongoClient(uri)

db = client["Wastend"]

ratings_collection = db["ratings"]


def provide_default_recommendations():
    return ["a" , "b" , "C"]
# Define a function to process the MongoDB data and make recommendations

def process_mongodb_and_recommend(user_id):
    print("Id" , user_id)
    try:
        user_object_id = ObjectId(user_id)
        user_ratings_cursor = ratings_collection.find({"user": user_object_id})
        user_ratings_df = pd.DataFrame(list(user_ratings_cursor))

        if user_ratings_df.empty:
            return provide_default_recommendations()
        columns_to_drop = ['_id', '__v', 'comments', 'timestamp']
        existing_columns = set(user_ratings_df.columns)
        columns_to_drop = [col for col in columns_to_drop if col in existing_columns]
        user_ratings_df = user_ratings_df.drop(columns=columns_to_drop)

        user_ratings_df = user_ratings_df.rename(columns={'meal': 'id', 'category': 'category', 'score': 'score'})
        user_ratings_df['score'] = pd.to_numeric(user_ratings_df['score'], errors='coerce')
        user_ratings_df = user_ratings_df.dropna(subset=['score'])

        final_ratings_matrix = user_ratings_df.pivot(index='id', columns='category', values='score').fillna(0)

        def top_n_products(final_rating, n, min_interaction):
            recommendations = final_rating[final_rating['avg_rating'] > min_interaction]
            recommendations = recommendations.sort_values('avg_rating', ascending=False)
            print("recc" , recommendations)
            return recommendations.index[:n]
        
        average_rating = user_ratings_df.groupby('category')['score'].mean()
        count_rating = user_ratings_df.groupby('category')['score'].count()
        final_rating = pd.DataFrame({'avg_rating': average_rating, 'rating_count': count_rating})
        final_rating = final_rating.sort_values(by='avg_rating', ascending=False)

        final_rating.index.name = 'category'
        
        recommendations = list(top_n_products(final_rating, 5, 5))
        print(recommendations)
        return recommendations

    except Exception as e:
        return f"An error occurred: {str(e)}"

# Define a route to receive the user ID and respond with recommendations
@app.route('/recommend', methods=['GET'])
def get_recommendations():
    try:
        if not request.json or 'user_id' not in request.json:
            return jsonify({'error': 'User ID is required in JSON format'}), 400
        
        user_id = request.json['user_id']
        recommendations = process_mongodb_and_recommend(user_id)
        print(recommendations)

        if isinstance(recommendations, list):
            return jsonify({'recommendations': recommendations})
        else:
            return jsonify({'error': recommendations}), 500

    except Exception as e:
        return jsonify({'error': f"An internal server error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5000)
