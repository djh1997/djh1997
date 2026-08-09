const FullRulesText = '<p><button style="padding: 1%;" onclick="Rules()">Hide Rules</button></p>'+
'<h1>Prep</h1><ul>'+
'<li>Click "Assign Roles".</li>'+
'<li>For each player:<ul>'+
'<li>Click on your name to reveal your role.Commoner,Game Master,Imposter (if there is 8 or more players there are 2 Imposters)</li>'+
'<li>Click either you name again or "Hide Role" to hide your role.</li>'+
'<li>Pass the phone to the next player.</li></ul></li>'+
'<li>Once everybody has there role pass the phone back to the game master.</li>'+
'<li>When the game master is ready they start the timer.</li></ul>'+
'<h1>Phase 1: Guess the Word</h1><ul>'+
'<li>The group has about 5 minutes to discover the secret word.</li>'+
'<li>Players ask the Master questions.</li>'+
'<li>The Master can only answer:<ul><li>Yes</li><li>No</li><li>I don\'t know</li></ul></li>'+
'<li>The Imposter asks questions and makes suggestions that subtly steer the group toward the correct answer.</li></ul>'+
'<h1>Phase 2: Find the Imposter</h1>'+
'<p>If the word is guessed before time runs out:</p><ul>'+
'<li>Everyone discusses who they think the Imposter is.</li>'+
'<li>Players look for suspicious behaviour, such as:<ul>'+
'<li>Asking unusually helpful questions.</li>'+
'<li>Steering the conversation too accurately.</li>'+
'<li>Making suggestions that seem to reveal hidden knowledge.</li></ul></li></ul>'+
'<h1>Winning</h1><ul>'+
'<li>Commons and Master win if:<ul>'+
'<li>The group guesses the word and Correctly identifies the Imposter.</li></ul></li>'+
'<li>Imposter wins if:<ul><li>The group guesses the word but fails to identify them.</li></ul></li>'+
'<li>Everyone loses if:<ul>'+
'<li>The word is not guessed before the timer runs out.</li></ul></li></ul>'
const HiddenRulesText = '<p id="Rules"><button style="padding: 1%;" onclick="Rules()">Rules</button></p>'
var RulesText = HiddenRulesText
var timerInterval;
var timerDuration = 5 *60;
var timeLeft = timerDuration;

function Rules() {
  var rules = document.getElementById("Rules");
  if (RulesText == FullRulesText) {
    RulesText = HiddenRulesText;
  }else{
    RulesText = FullRulesText;
  }
  rules.innerHTML = RulesText;
}

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
  var PlayerButtons = '<button style="padding: 1%;" onclick="DisplayRole(\'\')">Hide Role</button><br>'
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
  PlayerButtons += '<br><p id="timer"><button style="padding: 1%;" onclick="StartTimer()">Start Timer</button></p>'
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

function StartTimer() {
  clearInterval(timerInterval);
  UpdateTimerDisplay(timeLeft);
  timerInterval = setInterval(function() {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      var timer = document.getElementById('timer');
      if (timer) {
        timer.innerHTML = 'Time is up!<br><button style="padding: 1%;" onclick="ExtendTimer()">Extend Timer</button><br>'+
        '<button style="padding: 1%;" onclick="Reset()">Play Again</button>';
      }
      return;
    }
    UpdateTimerDisplay(timeLeft);
  }, 1000);
}

function UpdateTimerDisplay(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  var formatted = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  var timer = document.getElementById('timer');
  timer.innerHTML = 'Timer: ' + formatted;
}

function ExtendTimer() {
  timeLeft += 60;
  StartTimer(timeLeft);
}

function Reset() {
  timeLeft = timerDuration;
  var output = document.getElementById("output");
  output.innerHTML = '<button style="padding: 1%;" onclick="Build()">Assign Roles</button>';
  DisplayRole('');
}
