var string = "リリイ・シュシュのすべて";

var unicodeRange = [0x00A1, 0x02B8];

var newString = new String;
for(var i=0; i<string.length; i++) {
    newString += String.fromCharCode(unicodeRange[0] + Math.random() * (unicodeRange[1]-unicodeRange[0]+1))
}

document.write(newString);
