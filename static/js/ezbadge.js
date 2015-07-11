function createBadge(){
    if ( checkUrl() ) {
        showBadge()
    }
}

function checkUrl() {

    var url = document.getElementById('url').value.split("/")
    var urlDiv = document.getElementById('urlDiv')

    if (url.indexOf("github.com") == -1 || url.length != 5) {
        urlDiv.className = 'has-error'
        urlHelp.innerHTML = "That does not appear to be a valid GitHub repo, please try again!"
    } else {
        urlDiv.className = 'has-success'
        urlHelp.innerHTML = "" 
        return true; 
    }

}

function showBadge() {

    $('#badgeModal').modal('show')
    var url = document.getElementById('url').value.split("/")
    var repo = url[4]
    var owner = url[3]

    badgeMd = "[![CI](https://circleci.com/gh/" + owner + "/" + repo + ".svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/" + owner + "/" + repo + ")"

    modalUrl.innerHTML = badgeMd  

    modalPreview.innerHTML = marked( badgeMd ) 
}
