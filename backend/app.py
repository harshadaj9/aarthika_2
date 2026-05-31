from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/health-score", methods=["POST"])
def health_score():

    print("HEALTH SCORE API HIT")

    data = request.json

    print("REQUEST:", data)

    income = float(data["income"])
    expenses = float(data["expenses"])

    savings = income - expenses

    score = (savings / income) * 100

    if score > 60:
        advice = "Excellent Financial Health"
    elif score > 40:
        advice = "Good Financial Health"
    else:
        advice = "Reduce unnecessary expenses"

    return jsonify({
        "score": round(score),
        "savings": savings,
        "advice": advice
    })

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )