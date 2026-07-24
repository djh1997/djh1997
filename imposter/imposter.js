function PopRandElm(arr){

  if (arr.length === 0 ) return undefined;
  const index = Math.floor(Math.random()*arr.length);
  return arr.splice(index,1)[0];

}

function Build(){

  var form = document.getElementById("frm1");
  var input = form.elements.name.value.trim();
  var output = document.getElementById("output");
  var inputs = input.split(/,/).filter(Boolean);
  var numbeOfPlayers = inputs.length
  var roles = 'Game Master,Imposter'
  var PlayerButtons = ''
  var slecetedrole = ''
  var slecetedWord = SelectWord()
  for (var i = 0;  i < numbeOfPlayers-2; i++){
    roles += ',Commoner';
  }
  roles = roles.split(/,/).filter(Boolean);
  for (var x = 0;  x < numbeOfPlayers; x++){
    slecetedrole = PopRandElm(roles)
    if (slecetedrole === 'Game Master' || slecetedrole === 'Imposter') {
      PlayerButtons += '<button onclick="DisplayRole(\''+inputs[x]+' your Role is '+slecetedrole+' and the secret word is '+slecetedWord+'\')">'+inputs[x]+'</button>  ';
      continue;
    }
    PlayerButtons += '<button onclick="DisplayRole(\''+inputs[x]+' your Role is '+slecetedrole+'\')">'+inputs[x]+'</button>  ';
  }
  
  output.innerHTML = PlayerButtons

}

function DisplayRole(name){
  var role = document.getElementById("role");
  
  if ('Role: '+name === role.innerHTML ) {
    role.innerHTML = '' ;
  }else{
    role.innerHTML = 'Role: '+name
}
}

function SelectWord(){
  var words = '1,2,3,4,5,6,7,8,9,0'
  words = words.split(/,/).filter(Boolean);
  if (words.length === 0 ) return undefined;
  const index = Math.floor(Math.random()*words.length);
  return words.splice(index,1)[0];
}
