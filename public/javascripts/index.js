function LilyType() {
    this.messages;

    this.unicodeRange = [0x00BF, 0x02B8];
    this.brackets = "「」";
    this.offset = 1;
    this.typingSpeed = 50;
    this.targetId = "script";
    this.translateId = "translate";
    this.isDialogue = false;

    this.translate = "korean";
}

LilyType.prototype.setScript = function(script) {
    this.messages = script;
};

LilyType.prototype.print = function(message) {
    var self = this;

    var seq;
    var outputString = "";

    var timer = new Tock({
        countdown: true,
        complete: function() {
            targetObj = document.getElementById(self.targetId);
            translateObj = document.getElementById(self.translateId);

            targetObj.innerHTML = "";
            translateObj.innerHTML = "";

            // Set background color
            var rand = Math.random();
            var backgroundColor = "white";
            var fontColor = "#333";
            var translateColor = "#666";

            if(rand >= 0.25) {
                backgroundColor = "black"
                fontColor = "#fff";
                translateColor = "#777";
            }

            document.body.style.backgroundColor = backgroundColor;
            targetObj.style.color = fontColor;
            translateObj.style.color = translateColor;

            if(!message.string) {
                outputString = "";
                return;
            }

            for (var j = 0; j < message.string.length + self.offset; j++) {
                outputString += String.fromCharCode(self.unicodeRange[0] + Math.random() * (self.unicodeRange[1] - self.unicodeRange[0] + 1));
            }

            seq = 0;

            var printer = setInterval(function() {
                targetObj.innerHTML += outputString[seq];

                seq++;

                if (seq >= outputString.length - 2 + self.offset) {
                    clearInterval(printer);

                    targetObj.innerHTML = "《" + message.string + "》";

                    if(self.translate && message[self.translate]) {
                        translateObj.innerHTML = message[self.translate];
                    }
                }
            }, self.typingSpeed);
        }
    }).start(message.timing);
};

LilyType.prototype.printAll = function() {
    for (var i = 0; i < this.messages.length; i++) {
        this.print(this.messages[i]);
    }
};

LilyType.prototype.getScript = function(url, cb) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                cb(JSON.parse(xmlhttp.responseText));
            } else {
                alert('Error, Refresh the page F5.');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};