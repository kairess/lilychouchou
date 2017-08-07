var messages = [
    {
        string: "リリイ・シュシュのすべて",
        timing: 1000,
    },
    {
        string: "릴리슈슈의 모든것",
        timing: 3000,
    }
];

var unicodeRange = [0x00A1, 0x02B8];
var brackets = "「」";
var offset = 3;
var typingSpeed = 50;
var targetId = "title";
var isDialogue = false;

var outputString = new String;
var printer;
var seq;

var printMessage = function(message) {
    setTimeout(function() {
        targetObj = document.getElementById(targetId);

        targetObj.innerHTML = "";

        for(var j=0; j<message.string.length + offset; j++) {
            outputString += String.fromCharCode(unicodeRange[0] + Math.random() * (unicodeRange[1]-unicodeRange[0]+1));
        }

        seq = 0;

        printer = setInterval(function() {
            targetObj.innerHTML += outputString[seq];

            seq++;

            if(seq >= outputString.length - 2 + offset) {
                clearInterval(printer);

                targetObj.innerHTML = "《" + message.string + "》";
            }
        }, typingSpeed);

    }, message.timing);
};

for(var i=0; i<messages.length; i++) {
    printMessage(messages[i]);
}