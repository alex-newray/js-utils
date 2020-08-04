from flask import Flask, jsonify, request, render_template, abort
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/methods", methods=['GET', 'POST'])
def test_methods():
    if request.method == 'POST':
        return 'POST'
    else:
        return 'GET'

@app.route("/json")
def json():
    return jsonify({'name':'Elon Reeve Musk'})\

@app.route("/error404")
def e404():
    return abort(404)

@app.route("/error500")
def e500():
    return abort(500)


if __name__ == '__main__':
    app.run(debug=True)
