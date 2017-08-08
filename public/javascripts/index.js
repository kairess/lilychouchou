function LilyType() {
    this.messages;

    this.unicodeRange = [0x00A1, 0x02B8];
    this.brackets = "「」";
    this.offset = 3;
    this.typingSpeed = 50;
    this.targetId = "title";
    this.isDialogue = false;
}

LilyType.prototype.setScript = function(script) {
    this.messages = JSON.parse(script);
};

LilyType.prototype.print = function(message) {
    var self = this;

    var seq;
    var outputString = "";

    var timer = new Tock({
        countdown: true,
        complete: function() {
            targetObj = document.getElementById(self.targetId);

            targetObj.innerHTML = "";

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
                cb(xmlhttp.responseText);
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};