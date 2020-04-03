//Post preview, must set background of id "main" and css "blur"



export function displayPreview(p){
  let main = document.querySelector("#main");
  main.className = "blur";

  //outer layer
  let postContainer = document.createElement("div");
  postContainer.className = "curPost";


  //title question
  let question = document.createElement("h2");
  question.innerText = p.question;
  postContainer.appendChild(question);

  //comment section
  let chatarea = document.createElement("div");
  chatarea.className = "card";
  postContainer.appendChild(chatarea);

  // card body
  let card_body = document.createElement("div");
  card_body.className = "cardbody";
  postContainer.appendChild(chatarea);

  //answers
  for (let i=0; i < p.answers.length; i++){
    //answer container
    let ansContainer = document.createElement("li");
    ansContainer.className = "left clearfix";
    chatarea.appendChild(ansContainer);

    // chat body
    let chat_body = document.createElement("div");
    ansContainer.appendChild(chat_body);

    // actual context
    let context = document.createElement("p");
    context.innerText = p.answers[i].content



    let author = document.createElement("div");
    author.innerText = "Someone answered: " + '"'+ p.answers[i].content + '"';

    postContainer.appendChild(ansContainer);
    postContainer.appendChild(author);
  }

  document.body.appendChild(postContainer);

  function myFunc(e){
    if (!postContainer.contains(e.target)){
      main.className = "";
      postContainer.remove();
      window.removeEventListener("click", myFunc);}
  }

  
  setTimeout(()=>{window.addEventListener("click", myFunc);}, 200);
 }