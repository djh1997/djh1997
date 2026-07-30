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
  var PlayerButtons = '<button style="padding: 1%;" onclick="DisplayRole(\'\')">hide</button><br>'
  var slecetedrole = ''
  var slecetedWord = SelectWord()
  for (var i = 0;  i < numbeOfPlayers-2; i++){
    roles += ',Commoner';
  }
  roles = roles.split(/,/).filter(Boolean);
  if (numbeOfPlayers >= 8){
    roles.pop();
	roles.push('Imposter');
  }
  for (var x = 0;  x < numbeOfPlayers; x++){
    slecetedrole = PopRandElm(roles)
    if (slecetedrole === 'Game Master' || slecetedrole === 'Imposter') {
      PlayerButtons += '<button onclick="DisplayRole(\''+inputs[x]+' your Role is '+slecetedrole+' and the secret word is '+slecetedWord+'\')">'+inputs[x]+'</button>';
      continue;
    }
    PlayerButtons += '<button onclick="DisplayRole(\''+inputs[x]+' your Role is '+slecetedrole+'\')">'+inputs[x]+'</button>';
  }
  
  output.innerHTML = PlayerButtons

}

function DisplayRole(name){
  var role = document.getElementById("role");
  
  if (name === role.innerHTML ) {
    role.innerHTML = '' ;
  }else{
    role.innerHTML = name
}
}

function SelectWord(){
  var words = 'Elephant,Penguin,Octopus,Kangaroo,Giraffe,Dolphin,Peacock,Hedgehog,Koala,Owl,Camel,Cheetah,Lobster,Polar Bear,Bat,Pizza,Ice Cream,Sushi,Pancake,Watermelon,Avocado,Chocolate,Coffee,Popcorn,Donut,Cheeseburger,Spaghetti,Lemon,Carrot,Milkshake,Toothbrush,Vacuum Cleaner,Lamp,Mirror,Pillow,Microwave,Refrigerator,Scissors,Umbrella,Alarm Clock,Soap,Washing Machine,Kettle,Doorbell,Blanket,Smartphone,Laptop,Headphones,Printer,Robot,Drone,Calculator,Keyboard,Satellite,Video Game,USB Drive,Smartwatch,Webcam,Wi‑Fi,Battery,Airport,Library,Hospital,Zoo,Beach,Castle,Museum,Supermarket,School,Stadium,Cinema,Train Station,Lighthouse,Desert,Waterfall,Doctor,Teacher,Firefighter,Pilot,Chef,Detective,Farmer,Astronaut,Musician,Electrician,Football,Tennis,Swimming,Cycling,Skiing,Golf,Archery,Chess,Fishing,Marathon,Eiffel Tower,Great Wall of China,Moon,Rainbow,Volcano,Pyramid,Mount Everest,Northern Lights,Solar Eclipse,Statue of Liberty,Bicycle,Helicopter,Submarine,Motorcycle,Rocket,Hot Air Balloon,Skateboard,Ferry,Ambulance,Tractor,Tree,Flower,Ocean,Tornado,Glacier,River,Jungle,Coral Reef,Cave,Thunderstorm,Guitar,Movie,Comic Book,Magic Trick,Puzzle,Orchestra,Podcast,Camera,Board Game,Karaoke,Shadow,Time Machine,Treasure Map,Magnet,Compass,Skeleton,Diamond,Fingerprint,Robot Vacuum,Telescope,Secret Door,Snowman,Backpack,Volcano,Lighthouse,Gravity,Democracy,Memory,Echo,Electricity,Inflation,Luck,Jealousy,Reputation,Tradition'
  words = words.split(/,/).filter(Boolean);
  if (words.length === 0 ) return undefined;
  const index = Math.floor(Math.random()*words.length);
  return words.splice(index,1)[0];
}
