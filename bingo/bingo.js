const DefaultListText = "Mullet, Dropped something, fight/argument , Car delivery / pickup, Tricycle, Someone being sick, Dropped food or spilled drink, Beach goth, police car / ambulance / fire truck, Trip, Almost get hit by car, Bachelorette party, Bandage dude, Wheelchair, Selfie, Dumb hat, Offensive t shirt, Nose pick / wedgie pull / crotch grab / spit, Crying, Dancing, Luxury car, Sitting on the ground, Dead Parrot Head, flag clothes, Cowboy hat, Can see FaceTime screen, Aggressive honking, High five, Handshake, Hug, Litterbug, Drunk walk, Jeans and flip flops, Guy-on-guy scooter, Meemaw, Hoofin it, Barefoot, Double fisting,Formal attire, Skateboard, Someone yells to wait up, Twerking, J-walk coward, Separated at the crosswalk, Yawning, Matching outfits, Chug, Dickhead truck, Head sheen, Overstayed your welcome, New boot goofing, Camo, Sports Jersey, Sweet Stache, Walks Past 3+ Times, Looks like a Player, Carrying an Instrument, Obviously Dyed Hair, Celebrity Look-Alike, PawPaw, Street Cop, Fist Bump, Fanny Pack, On the Fence about Entering, Scooter Gang 3+, Dog, Cowboy Boots"

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
  var DefaultList = DefaultListText.split(/,/).filter(Boolean)
  while (inputs.length < 24){
    inputs = inputs.concat(PopRandElm(DefaultList));
  }
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

function CopyList(){
  navigator.clipboard.writeText(DefaultListText);
}