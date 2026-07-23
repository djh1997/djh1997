function PopRandElm(arr){
  if (arr.length === 0 ) return undefined;
  const index = Math.floor(Math.random()*arr.length);
  return arr.splice(index,1)[0];
}

function BuildBingo(){

  var form = document.getElementById("frm1");
  var input = form.elements.input.value.trim();
  var output = document.getElementById("output");


  var inputs = input.split(/,/).filter(Boolean);
  output.innerHTML = PopRandElm(inputs)

}