from flask import Flask, render_template, request, jsonify # type: ignore
from googletrans import Translator # type: ignore

app = Flask(__name__)
translator = Translator()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text")
    src = data.get("source")
    dest = data.get("target")

    try:
        translation = translator.translate(text, src=src, dest=dest)
        return jsonify({"translated_text": translation.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
