import markdown 

from flask import Flask, request, redirect, render_template, Markup 
app = Flask(__name__)

@app.route('/')
def home(): 
    return render_template('index.html')

@app.route('/badgify', methods=['GET', 'POST'])
def badgify():
    if request.method == 'POST':
        url = request.form['url'] 
        split = url.split('/')

        if 'github.com' not in split or len(split) != 5 : 
            error = 'That does not appear to be a valid GitHub repo, please try again' 
            return render_template('index.html', warning=error) 
        else: 
            
            repo = split[len(split)-1]
            owner = split[len(split)-2]

            badge_md = "[![CI](https://circleci.com/gh/{0}/{1}.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/{0}/{1})".format( owner, repo )

            md = Markup(markdown.markdown(badge_md))

            return render_template('badge.html', data = badge_md, preview=md)

    else: 

        return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

