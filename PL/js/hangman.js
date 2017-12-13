//Array with puzzles is in puzzles.js file
//Puzzles randomizer
var randomNumber = Math.floor((Math.random()*5));
var puzzle = puzzles[randomNumber];

puzzle = puzzle.toUpperCase();

var puzzleLength = puzzle.length;
var fails = 0;
var fails1 = 0; 

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var puzzle1 = "";
var puzzleLength1 = puzzle1.length;

// replace characters with _ sign and preserving empty spaces
for (i=0; i<puzzleLength; i++)
		{
			if(puzzle.charAt(i)==" ")puzzle1 = puzzle1 + " ";
			else puzzle1 = puzzle1 + "_";
		}

function showPuzzle()
		{
			document.getElementById("board").innerHTML = puzzle1;
		}

window.onload = start;

var letters1 = new Array(35);
var letters = ["A","Ą","B", "C", "Ć","D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N","Ń", "O","Ó", "P","Q","R", "S","Ś", "T", "U", "V","W", "X", "Y", "Z", "Ź", "Ż"];﻿

String.prototype.setCharacter = function(place, character)
		{
			if(place>this.length - 1) return this.toString();
			else return this.substr(0,place)+character+this.substr(place + 1);
		}
// checking if clicked letter is in puzzle solution
function check(nr)
		{
			var scored = false;
			for (i=0; i<puzzleLength; i++)
				{
					if(puzzle.charAt(i)==letters[nr])
						{
							puzzle1 = puzzle1.setCharacter(i,letters[nr]);
							scored = true;
						}
				}

			if(scored==true)
			{	
				yes.play();
				var element = "lett" + nr;
				document.getElementById(element).style.background = "#003300";
				document.getElementById(element).style.color = "#00C000";
				document.getElementById(element).style.border = "3px solid #00C000";
				document.getElementById(element).style.cursor = "default";

				
				showPuzzle();
			}
			else
			{
				no.play();
				var element = "lett" + nr;
				document.getElementById(element).style.background = "#330000";
				document.getElementById(element).style.color = "#C00000";
				document.getElementById(element).style.border = "3px solid #C00000";
				document.getElementById(element).style.cursor = "default";
				document.getElementById(element).setAttribute("onclick",";");

				//fail
				fails++;
				fails1++;
				
				//storing positions in table of failed letters for maintaining colors after 9 fails 
				letters1.push(letters[nr]);
				

				var picture = "img/s"+fails+".jpg";
				document.getElementById("gibbet").innerHTML='<img src="'+picture+'" alt="" id="gibbetImg"/>błędy: '+fails+'/9';
			}

			//won
			if(puzzle==puzzle1){
			document.getElementById("alphabet").innerHTML = "BRAWO! PODAŁEŚ PRAWIDŁOWE ROZWIĄZANIE "+puzzle+'<br /><br /><span class="reset" onclick="location.reload()">ROZWIĄŻ KOLEJNĄ ZAGADKE</span>';
			document.getElementById("solutionBtn").style.visibility = "hidden";
			
			}
			//lost

			if(fails1===9){
			
			document.getElementById("alphabet").innerHTML = "You Lost: "+'<br /><br /><span class="reset" onclick="start()">KONTYNUUJ ROZWIAZEYWANIE TEJ ZAGADKI?</span><br /><br />ALBO<br /><br /><span class="reset" onclick="location.reload()">ZACZNIJ NOWĄ ZAGADKE</span>';
			document.getElementById("solutionBtn").style.visibility = "hidden";
			
			fails1++;
			}
			//after nine fails
			if(fails>9)
				{
					var picture = "img/s"+fails+".jpg";
				document.getElementById("gibbet").innerHTML='<img src="img/s9.jpg" alt="" id="gibbetImg" />błędy: '+fails+'/9';
				}
		}

// Creating divs with letters
function start()
		{	
			var divContent = "";

			for (var i=0; i<=34; i++)
				{
					var element = "lett" + i;
					divContent = divContent + '<div class="letter" onclick="check('+i+')"id="'+element+'">'+letters[i]+'</div>';
					if ((i+1)%7==0)divContent = divContent +'<div style="clear:both;"></div>';						
				}

			document.getElementById("alphabet").innerHTML = divContent;	
				document.getElementById("solutionBtn").style.visibility = "visible";
	
			colors();			
			showPuzzle();
			colors1();
		}

// colors settings after nine fails green changing colors of div of all letters wrom already uncovered puzzle1

function colors()
{
		for (var i=0; i<=34; i++)
			{
				for (var j=0; j <= puzzle1.length; j++)
					{
						if (letters[i] == puzzle1.charAt(j))
							{
								var element = "lett" + i;
								document.getElementById(element).style.background = "#003300";
								document.getElementById(element).style.color = "#00C000";
								document.getElementById(element).style.border = "3px solid #00C000";
								document.getElementById(element).style.cursor = "default";
								document.getElementById(element).setAttribute("onclick",";");	
						}	
					}	
			}
}

// colors settings after nine fails red changing colors of div of all letters from letters1 table 
function colors1()
{
		for (var i=0; i<=34; i++)
			{
				for (var j=0; j <= letters1.length; j++)
					{
						if (letters[i] == letters1[j])
							{
								var element = "lett" + i;
								document.getElementById(element).style.background = "#330000";
								document.getElementById(element).style.color = "#C00000";
								document.getElementById(element).style.border = "3px solid #C00000";
								document.getElementById(element).style.cursor = "default";
								document.getElementById(element).setAttribute("onclick",";");	
						}	
					}	
			}
}


// prompt for typing a solution 
function solution() {
	var sol = prompt("Type in a solution:", "");
	sol = sol.toUpperCase();

	if(sol==puzzle)
	{
	document.getElementById("alphabet").innerHTML = "BRAWO! PODAŁEŚ PRAWIDŁOWE ROZWIĄZANIE "+puzzle+'<br /><br /><span class="reset" onclick="location.reload()">ROZPOCZNIJ NOWĄ ZAGADKĘ</span>';
	document.getElementById("board").innerHTML = puzzle;
	document.getElementById("solutionBtn").style.visibility = "hidden";
	
	}
	else
	{
		fails++;
		fails1++;
		no.play();
		var picture = "img/s"+fails+".jpg";
		document.getElementById("gibbet").innerHTML='<img src="'+picture+'" alt="" id="gibbetImg" />błędy: '+fails+'/9';
	}
}



