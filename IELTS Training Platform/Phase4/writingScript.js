//COMP 3450:<Zarin, Tazrian, Alex>

function checkWordCount()
			{
			
				var textArea = document.getElementById("user-text");
    var feedback = document.getElementById("feedback");
    var text = textArea.value;

    // Split the text into words based on whitespace
    var words = text.split(/\s+/);

    // Filter out empty strings
    words = words.filter(function(word) {
        return word.trim() !== "";
    });

    var wordCount = words.length;

    if (wordCount < 150) {
        feedback.textContent = "Not enough words";
    } 
	if (wordCount > 150){
        feedback.textContent = "Word count is sufficient";
    }
		  
}
