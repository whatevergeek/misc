var fretCanvas = document.getElementById('canvas')

function drawFretboard()
{
    context = fretCanvas.getContext("2d")
    context.fillStyle = "#ffc3a0"
    context.fillRect(100, 100, 600, 100)
    context.fillStyle = "#c39797"
    context.fillRect(90, 100, 10, 100)

    //Draw frets
    context.fillStyle = "#c39797"
    for (var i = 1; i <= 15; i++)
    {
        context.fillRect(100 + i*40, 100, 2, 100)
    }

    //Draw strings
    context.fillStyle = "#cbbeb5"
    context.fillRect(100, 100 + 10, 600, 2)
    context.fillRect(100, 100 + 10 + 26.6, 600, 2)
    context.fillRect(100, 100 + 10 + 26.6 +26.6, 600, 2)
    context.fillRect(100, 100 + 90, 600, 2)

    //Draw fretmarks
    context.fillStyle = "#f7fbfc"
    context.beginPath()
    context.arc(100 + 4 * 40 + 20, 100 + 50, 5, 0, 2 * Math.PI)
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(100 + 6 * 40 + 20, 100 + 50, 5, 0, 2 * Math.PI)
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(100 + 9 * 40 + 20, 100 + 50, 5, 0, 2 * Math.PI)
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(100 + 11 * 40 + 20, 100 + 30, 5, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
    context.beginPath()
    context.arc(100 + 11 * 40 + 20, 100 + 70, 5, 0, 2 * Math.PI)
    context.fill()
    context.closePath()

    context.beginPath()
    context.arc(100 + 14 * 40 + 20, 100 + 50, 5, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
}

function drawNote(note, fretnumber, stringnumber)
{
    var basefret = 50
    var basestring = 90
    context.font = '15pt Calibri';
    context.fillText(note, basefret + fretnumber * 40 + 20, basestring+stringnumber*26.6);
}

function getNoteValue(note)
{
    switch (note) {
        case "C": return 1;
        case "C#": return 2;
        case "D": return 3;
        case "D#": return 4;
        case "E": return 5;
        case "F": return 6;
        case "F#": return 7;
        case "G": return 8;
        case "G#": return 9;
        case "A": return 10;
        case "A#": return 11;
        case "B": return 12;

    }
}

function getNoteFromValue(value)
{
    switch (value) {
        case 1: return "C";
		case 2: return "C#";
		case 3: return "D";
        case 4: return "D#";
		case 5: return "E";
		case 6: return "F";
        case 7: return "F#";
		case 8: return "G";
		case 9: return "G#";
        case 10: return "A";
		case 11: return "A#";
		case 12: return "B";		
    }
}

function getInterval(lowNote, highNote)
{
    var lowVal = getNoteValue(lowNote)
    var highVal = getNoteValue(highNote)

    if (highVal < lowVal)
    {
        highVal = highVal + 12
    }

    return highVal - lowVal
}

function drawNoteWF(note) {
    drawNote(note, getInterval("A", note), 1)
    drawNote(note, getInterval("E", note), 2)
    drawNote(note, getInterval("C", note), 3)
    drawNote(note, getInterval("G", note), 4)
    //Print octave
	if (getInterval("A", note) < 1)
	{
		drawNote(note, 12, 1)
	}
	if (getInterval("E", note) < 1)
	{
		drawNote(note, 12, 2)
	}
	if (getInterval("C", note) < 1)
	{
		drawNote(note, 12, 3)
	}
	if (getInterval("G", note) < 1)
	{
		drawNote(note, 12, 4)
	}
}

function getNoteFromInterval(root, interval)
{
	var noteVal = getNoteValue(root) + interval
	if(noteVal > 12)
	{
		noteVal = noteVal - 12
	}
	
	return getNoteFromValue(noteVal)
}

function drawScale(root, intervals)
{
    context.fillStyle = "#ff0000"
	drawNoteWF(root)
	context.fillStyle = "#36465d"
	for (var i = 0, len = intervals.length; i < len; i++) {
		drawNoteWF(getNoteFromInterval(root, intervals[i]))
	}
}

drawFretboard()
//Major Scale
drawScale("G", [2, 4, 5, 7, 9, 11])

//Minor Scale
//drawScale("G", [2, 3, 5, 7, 8, 10])


