// Text analyzer functionality
document.addEventListener("DOMContentLoaded", function () {
    // Enhanced text analyzer functionality
    window.analyzeText = function() {
        const inputText = document.getElementById("inputText").value;
        
        if (!inputText) {
            alert("Please enter some text to analyze.");
            return;
        }
        
        // 1. Calculate basic text metrics
        const letters = (inputText.match(/[a-zA-Z]/g) || []).length;
        const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
        const spaces = (inputText.match(/\s/g) || []).length;
        const newlines = (inputText.match(/\n/g) || []).length;
        const specialSymbols = (inputText.match(/[^\w\s]/g) || []).length;
        
        // 2. List of pronouns to check
        const pronouns = [
            'i', 'me', 'my', 'mine', 'myself',
            'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself',
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            'this', 'that', 'these', 'those',
            'who', 'whom', 'whose', 'which', 'what'
        ];
        
        // 3. List of prepositions to check
        const prepositions = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at',
            'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
            'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into',
            'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
            'past', 'regarding', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath',
            'until', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        // 4. List of indefinite articles
        const articles = ['a', 'an', 'the'];
        
        // Function to count occurrences
        function countOccurrences(text, wordList) {
            const words = text.toLowerCase().match(/\b\w+\b/g) || [];
            const counts = {};
            
            words.forEach(word => {
                if (wordList.includes(word)) {
                    counts[word] = (counts[word] || 0) + 1;
                }
            });
            
            return counts;
        }
        
        // Get counts
        const pronounCount = countOccurrences(inputText, pronouns);
        const prepositionCount = countOccurrences(inputText, prepositions);
        const articleCount = countOccurrences(inputText, articles);
        
        // Display character analysis
        document.getElementById('char-analysis').innerHTML = `
            <p><strong>Letters:</strong> ${letters}</p>
            <p><strong>Words:</strong> ${words}</p>
            <p><strong>Spaces:</strong> ${spaces}</p>
            <p><strong>Newlines:</strong> ${newlines}</p>
            <p><strong>Special Symbols:</strong> ${specialSymbols}</p>
        `;
        
        // Display pronouns
        let pronounHTML = '';
        if (Object.keys(pronounCount).length > 0) {
            for (const [pronoun, count] of Object.entries(pronounCount)) {
                pronounHTML += `<p><strong>${pronoun}:</strong> ${count}</p>`;
            }
        } else {
            pronounHTML = '<p>No pronouns found</p>';
        }
        document.getElementById('pronoun-analysis').innerHTML = pronounHTML;
        
        // Display prepositions
        let prepositionHTML = '';
        if (Object.keys(prepositionCount).length > 0) {
            for (const [preposition, count] of Object.entries(prepositionCount)) {
                prepositionHTML += `<p><strong>${preposition}:</strong> ${count}</p>`;
            }
        } else {
            prepositionHTML = '<p>No prepositions found</p>';
        }
        document.getElementById('preposition-analysis').innerHTML = prepositionHTML;
        
        // Display articles
        let articleHTML = '';
        if (Object.keys(articleCount).length > 0) {
            for (const [article, count] of Object.entries(articleCount)) {
                articleHTML += `<p><strong>${article}:</strong> ${count}</p>`;
            }
        } else {
            articleHTML = '<p>No articles found</p>';
        }
        document.getElementById('article-analysis').innerHTML = articleHTML;
        
        // Show results container
        document.getElementById('output-container').style.display = 'block';
    };
    
    // Reset analysis function
    window.resetAnalysis = function() {
        document.getElementById('inputText').value = '';
        document.getElementById('char-analysis').innerHTML = '';
        document.getElementById('pronoun-analysis').innerHTML = '';
        document.getElementById('preposition-analysis').innerHTML = '';
        document.getElementById('article-analysis').innerHTML = '';
    };
});
