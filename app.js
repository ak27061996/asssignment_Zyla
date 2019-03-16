const express = require('express'),
	path = require('path')
var app = express()
var text = `<p id='container'>During an eventful summer, including the supposed drowning of quarterback Jason Blossom on the Fourth of July, Archie Andrews discovers his passion for music. He soon begins his sophomore year and expresses his love for music to Betty Cooper, the sweet girl-next-door who harbors her own secret—her feelings for Archie Andrews. We soon learn that on the Fourth of July, Archie shared a secret rendezvous with the music teacher of Riverdale High, Ms Grundy. Meanwhile, Veronica Lodge, the daughter of Hermione and Hiram, a millionaire facing embezzlement charges, arrives in town, instantly capturing Archie's attention. Despite the fact that a love triangle is developing, Betty and Veronica become fast friends, united when Veronica stands up against the condescending captain of the cheerleading squad, Cheryl Blossom, who may be hiding a secret concerning her brother's death. Archie's former best friend, Jughead Jones, begins to write a novel retelling the events of the summer, including what happened between him and Archie. Kevin Keller and Moose Mason stumble across Jason's body, which has a gunshot wound to the head, by the lake.</p>`;
var beforeContent, afterContent, prevWord;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/text', function (req, res) {
	let script_content;
	if (beforeContent && afterContent && prevWord) {
		script_content = `
			<script>var beforeContent = "${beforeContent}", afterContent = "${afterContent}", prevWord = "${prevWord}";</script>
		`;
	} else {
		script_content = "";
	}
	res.send(`${script_content}<script src="/js/annotate.js"></script><link rel="stylesheet" href="/css/vowels.css">` + text);
})

app.get('/track', function (req, res) {
	beforeContent = req.query.beforeContent;
	afterContent = req.query.afterContent;
	prevWord = req.query.prevWord;
	text = req.query.text;
	console.log(req.query);
	res.send("");
})

app.listen(3000, function () {
	console.log('Exampe app listening on port 3000');
})
