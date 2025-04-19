import sys
import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
from keras.models import load_model

def predict_ipc(input_text):
    try:
        # Load the saved model
        model = load_model('text_prediction_model.keras')
        
        # Load the dataset to recreate the vectorizer and label encoder
        df = pd.read_csv('ipc_sec_dataset.csv')
        
        # Extract relevant columns for input features
        X = df[['Offense', 'Punishment']].astype(str).values
        
        # Combine 'Offense' and 'Punishment' into a single text feature
        X_text = X[:, 0] + ' ' + X[:, 1]
        
        # Use CountVectorizer to convert text data to numerical format
        vectorizer = CountVectorizer()
        vectorizer.fit(X_text)
        
        # Recreate the label encoder
        y_combined = df['Description'].astype(str) + "" + df['Section'].astype(str) + "" + df['Punishment'].astype(str)
        label_encoder = LabelEncoder()
        label_encoder.fit(y_combined)
        
        # Split the input text if it contains multiple offenses
        input_texts = input_text.split(" and ")
        
        # Prepare a list to store the predictions
        predictions = []
        
        # Loop through each offense in the input
        for text in input_texts:
            # Convert the input text to numerical format
            input_numerical = vectorizer.transform([text])
            
            # Make a prediction
            prediction = model.predict(input_numerical.toarray())
            
            # Get the predicted class label
            predicted_label = np.argmax(prediction)
            
            # Convert the predicted label back to the original label
            predicted_label_original = label_encoder.inverse_transform([predicted_label])[0]
            
            # Split the combined prediction to get individual components
            parts = predicted_label_original.split("")
            
            # Extract the section and description
            section = parts[1] if len(parts) > 1 else "Unknown"
            description = parts[0] if len(parts) > 0 else "Unknown"
            punishment = parts[2] if len(parts) > 2 else "Unknown"
            
            # Add the prediction to the results
            predictions.append({
                "input": text,
                "section": section,
                "description": description,
                "punishment": punishment,
                "confidence": float(np.max(prediction))
            })
        
        return predictions
    
    except Exception as e:
        return [{"error": str(e)}]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps([{"error": "No input file provided"}]))
        sys.exit(1)
    
    input_file = sys.argv[1]
    with open(input_file, 'r') as f:
        input_text = f.read().strip()
    
    predictions = predict_ipc(input_text)
    print(json.dumps(predictions))

