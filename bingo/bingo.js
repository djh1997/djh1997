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
  var BingoTable = '<table style="width:100%; height:100%;">';
  for (var i = 0; i < 5; i++) {
    BingoTable += '<tr>';
    for (var x = 0; x < 5; x++) {
      if (i === 2 && x === 2) {
        BingoTable += '<td>Beach<p>&#x1F3D6<p>Bingo</td>';
        continue;
      }
      BingoTable += '<td>' + PopRandElm(inputs) + '</td>';
    }
    BingoTable += '</tr>';
  }
  output.innerHTML = BingoTable

}