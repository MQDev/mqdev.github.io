/*----------------------------
Valida Campos
===================================================== */

const red = '#D20528';
const blue = '#21bd13';

function validaCamposDesk(){
  if(
    validaNomeDesk() &&
    validaEmailDesk() &&
    validaAssuntoDesk() &&
    validaMensagemDesk()
  ){
    console.log("mensagem enviada");
  }
}

function validaEmailDesk(){
  email = document.getElementById("emailDesk").value;
  if(email == ""){
    document.getElementById("emailDesk").style.borderColor = red;
    document.getElementById("avisoEmailDesk").innerHTML = "Qual o seu email?"
    document.getElementById("avisoEmailDesk").style.color = red;
    return false;
  } else {
    document.getElementById("emailDesk").style.borderColor = blue;
    document.getElementById("avisoEmailDesk").innerHTML = "";
    return true;
  }
}

function validaNomeDesk(){
  nome = document.getElementById("nomeDesk").value;
  if(nome == ""){
    document.getElementById("nomeDesk").style.borderColor = red;
    document.getElementById("avisoNomeDesk").innerHTML = "Hey! Qual o seu nome?"
    document.getElementById("avisoNomeDesk").style.color = red;
    return false;
  } else {
    document.getElementById("nomeDesk").style.borderColor = blue;
    document.getElementById("avisoNomeDesk").innerHTML = "";
    return true;
  }
}

function validaTelefoneDesk(){
  email = document.getElementById("foneDesk").value;
  if(email == ""){
    document.getElementById("foneDesk").style.borderColor = red;
    document.getElementById("avisoFoneDesk").innerHTML = "Qual o seu telefone?"
    document.getElementById("avisoFoneDesk").style.color = red;
    return false;
  } else {
    document.getElementById("foneDesk").style.borderColor = blue;
    document.getElementById("avisoFoneDesk").innerHTML = "";
    return true;
  }
}

function validaMensagemDesk(){
  mensagem = document.getElementById("mensagemDesk").value;
  if(mensagem == ""){
    document.getElementById("mensagemDesk").style.borderColor = red;
    document.getElementById("avisoMensagemDesk").innerHTML = "Qual a sua mensagem?"
    document.getElementById("avisoMensagemDesk").style.color = red;
    return false;
  } else {
    document.getElementById("mensagemDesk").style.borderColor = blue;
    document.getElementById("avisoMensagemDesk").innerHTML = "";
    return true;
  }
}

// function validaAssunto(){
//   assunto = document.getElementById("assunto").value;
//   if(assunto == ""){
//     document.getElementById("assunto").style.borderColor = red;
//     document.getElementById("avisoAssunto").innerHTML = "Qual o assunto da mensagem?"
//         document.getElementById("avisoAssunto").style.color = red;
//     return false;
//   } else {
//     document.getElementById("assunto").style.borderColor = blue;
//     document.getElementById("avisoAssunto").innerHTML = "";
//     return true;
//   }
// }

function validaCamposMobile(){
  if(
    validaNomeMobile() &&
    validaEmailMobile() &&
    validaMensagemMobile()
  ){
    console.log("mensagem enviada");
  }
}

function validaEmailMobile(){
  email = document.getElementById("emailMobile").value;
  if(email == ""){
    document.getElementById("emailMobile").style.borderColor = red;
    document.getElementById("avisoEmailMobile").innerHTML = "Qual o seu email?"
    document.getElementById("avisoEmailMobile").style.color = red;
    return false;
  } else {
    document.getElementById("emailMobile").style.borderColor = blue;
    document.getElementById("avisoEmailMobile").innerHTML = "";
    return true;
  }
}

function validaNomeMobile(){
  nome = document.getElementById("nomeMobile").value;
  if(nome == ""){
    document.getElementById("nomeMobile").style.borderColor = red;
    document.getElementById("avisoNomeMobile").innerHTML = "Hey! Qual o seu nome?"
    document.getElementById("avisoNomeMobile").style.color = red;
    return false;
  } else {
    document.getElementById("nomeMobile").style.borderColor = blue;
    document.getElementById("avisoNomeMobile").innerHTML = "";
    return true;
  }
}

function validaTelefoneMobile(){
  email = document.getElementById("foneMobile").value;
  if(email == ""){
    document.getElementById("foneMobile").style.borderColor = red;
    document.getElementById("avisoFoneMobile").innerHTML = "Qual o seu telefone?"
    document.getElementById("avisoFoneMobile").style.color = red;
    return false;
  } else {
    document.getElementById("foneMobile").style.borderColor = blue;
    document.getElementById("avisoFoneMobile").innerHTML = "";
    return true;
  }
}

function validaMensagemMobile(){
  mensagem = document.getElementById("mensagemMobile").value;
  if(mensagem == ""){
    document.getElementById("mensagemMobile").style.borderColor = red;
    document.getElementById("avisoMensagemMobile").innerHTML = "Qual a sua mensagem?"
    document.getElementById("avisoMensagemMobile").style.color = red;
    return false;
  } else {
    document.getElementById("mensagemMobile").style.borderColor = blue;
    document.getElementById("avisoMensagemMobile").innerHTML = "";
    return true;
  }
}