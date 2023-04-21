function shakeBall() {
    var question = document.getElementById("question").value;
    if (question.trim() === "") {
        alert("Don't be lazy and type something, I refuse to answer unless you said something");
        return;
    }

	var answers = [
		"Just Don't",
        "Definitely not",
        "Signs point to nope",
        "Sorry, try again",
        "Not looking good",
        "Outlook not so good",
        "Don't even try",
        "Come on I just told you don't even try, believe me",
        "My sources say no",
        "Don't count on it",
        "Very doubtful"
	];
	var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
	document.getElementById("answer").innerHTML = randomAnswer;
}