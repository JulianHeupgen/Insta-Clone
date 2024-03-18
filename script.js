let posts = [

    { "accountImg": "./img/postAccount1.jpg",
      "name": "sophie.haller34",
      "uploadImg": "./img/postPic1.jpg",
      "heart": "./img/heart.png",
      "likes": 113,
      "hashtag": "#urlaub #sonnenschein #sorgenfrei &#128519",
      "follower": ["anneVonNeustaett", "sarahhaller99"],
      "comments": ["Viel Spaß euch allen!", "WOW bin gespannt auf weitere schöne Fotos &#128525"]
    },

    { "accountImg": "./img/postAccount2.jpg",
      "name": "kikki_82",
      "uploadImg": "./img/postPic2.jpg",
      "heart": "./img/heart.png",
      "likes": 54,
      "hashtag": "#Don't worry, be happy &#128584",
      "follower": ["manuel_Freiburg76"],
      "comments": [":-)"]
    },

    { "accountImg": "./img/postAccount3.jpg",
      "name": "luc.neustaetter",
      "uploadImg": "./img/postPic3.jpg",
      "heart": "./img/heart.png",
      "likes": 65,
      "hashtag": "#NYC &#128522",
      "follower": ["mareike91fee", "brunnerSven999"],
      "comments": ["Wunderschönes Foto. Weiterhin viel Spaß in New York !", "Einfach nur WOW"]
    },

    { "accountImg": "./img/postAccount4.jpg",
      "name": "fotografMeierBerlin",
      "uploadImg": "./img/postPic4.jpg",
      "heart": "./img/heart.png",
      "likes": 2458,
      "hashtag": "#nature #grandcanyon &#128247",
      "follower": ["pasCalMuelleR_41"],
      "comments": ["Vielen Dank für dieses Wahnsinns-Foto. USA Reise für nächstes Jahr ist gebucht !"]
    }

]


load();


function render() {

    let feed = document.getElementById('feed');
    feed.innerHTML = '';

    for(let i=0; i < posts.length; i++) {

        feed.innerHTML += generateHTML(i);
      
        renderComments(i);
   }
}


function generateHTML(i) {

      return  `<div class="post">
               <div class="post-head">
                <div class="accountInfos">
                  <img src="${posts[i]["accountImg"]}">
                  <span>${posts[i]["name"]}</span>
                </div>
                <div class="options">...</div>
                </div>
                  <img class="uploadPic" src="${posts[i]["uploadImg"]}">
                <div class="icons">
                  <div class="icons-left">
                    <img id="heart${i}" class="icon-left" src="${posts[i]["heart"]}" onclick="like(${i})">
                    <img class="icon-left" src="./img/comment.jpg" onclick="focusInput(${i})">
                    <img class="icon-left" src="./img/send.jpg">
                  </div>
                <div>
                    <img class="icon-right" src="./img/save.jpg">
                </div>
                </div>
                  <span class="likes">Gefällt ${posts[i]["likes"]} Mal</span>
                <div class="own">
                  <span class="name">${posts[i]["name"]}</span>
                  <span class="comment">${posts[i]["hashtag"]}</span>
                </div>
                <div id="comments${i}" class="comment-section"></div>
                  <div class="leaveComment">
                    <textarea id="input${i}" class="input-style" placeholder="Kommentar hinzufügen..."></textarea>
                    <button class="post-button" onclick="addComment(${i})">Posten</button>
                  </div>
              </div>`;

}


function renderComments(i) {

let comments = document.getElementById(`comments${i}`);              

       for(let j=0; j < posts[i]["follower"].length; j++) {
         let person = posts[i]["follower"][j];
         let comment = posts[i]["comments"][j];
       
         comments.innerHTML += `<div class="comment-container">
                                <span class="name">${person}</span><span class="comment">${comment}</span>
                                </div>`;
       }
}


function like(i) {

  let heartSrc = document.getElementById(`heart${i}`).getAttribute('src');
   
  if(heartSrc == './img/heart.png') {
      posts[i]["heart"] = './img/heartRed.jpg';
      posts[i]["likes"]++;
  }else {
      posts[i]["heart"] = './img/heart.png';
      posts[i]["likes"]--;
  }

  render();
  save();
}


function focusInput(i) {

  let input = document.getElementById(`input${i}`);
  input.focus();
}


function addComment(i) {

  let textarea = document.getElementById(`input${i}`);
  let comment = textarea.value;

  if(comment == '') {
      alert('Du hast deinen Kommentar vergessen  :-)');
  }else {

   posts[i]["follower"].push('julian_heupgen92');
   posts[i]["comments"].push(comment);

   render();
   save();
  }
}


function save() {

  for(let i=0; i < posts.length; i++) {

    let heart = posts[i]["heart"];
    let heartAsString = JSON.stringify(heart);
    localStorage.setItem(`heart${i}`, heartAsString);

    let follower = posts[i]["follower"];
    let followerAsString = JSON.stringify(follower);
    localStorage.setItem(`follower${i}`, followerAsString);

    let comments = posts[i]["comments"];
    let commentsAsString = JSON.stringify(comments);
    localStorage.setItem(`comments${i}`, commentsAsString);
  }

}


function load() {

  for(let i=0; i < posts.length; i++) {

    let heartAsString = localStorage.getItem(`heart${i}`);
    if(heartAsString) {
    let heart = JSON.parse(heartAsString);
    posts[i]["heart"] = heart;
    }

    let followerAsString = localStorage.getItem(`follower${i}`);
    if(followerAsString) {
    let follower = JSON.parse(followerAsString);
    posts[i]["follower"] = follower;
    }

    let commentsAsString = localStorage.getItem(`comments${i}`);
    if(commentsAsString) {
    let comments = JSON.parse(commentsAsString);
    posts[i]["comments"] = comments;
    }
    
  }

}

