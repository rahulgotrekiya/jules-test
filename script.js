const words = [
    'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it',
    'that', 'for', 'they', 'I', 'with', 'as', 'not', 'on', 'she', 'at',
    'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one',
    'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can',
    'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up',
    'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year',
    'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like',
    'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over',
    'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many',
    'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where',
    'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because',
    'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place',
    'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life',
    'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between',
    'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move',
    'thing', 'general', 'school', 'never', 'same', 'another', 'begin',
    'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want',
    'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against',
    'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open',
    'public', 'follow', 'during', 'present', 'without', 'again', 'hold',
    'govern', 'around', 'possible', 'head', 'consider', 'word', 'program',
    'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan',
    'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase',
    'early', 'course', 'change', 'help', 'line'
];

const wordsContainer = document.getElementById('words');
const inputArea = document.getElementById('input-area');
const timerEl = document.getElementById('timer');
const resultsEl = document.querySelector('.results');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const testAreaEl = document.querySelector('.test-area');

let timer;
let timeLeft = 15;
let currentWordIndex = 0;
let correctChars = 0;
let totalChars = 0;
let testActive = false;

function getRandomWords() {
    return words.sort(() => Math.random() - 0.5).slice(0, 30);
}

function displayWords() {
    wordsContainer.innerHTML = '';
    const randomWords = getRandomWords();
    randomWords.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        wordsContainer.appendChild(span);
    });
}

function startTest() {
    displayWords();
    inputArea.value = '';
    inputArea.focus();
    testActive = true;
    resultsEl.style.display = 'none';
    testAreaEl.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft === 0) {
        endTest();
    }
}

function endTest() {
    clearInterval(timer);
    testActive = false;
    inputArea.disabled = true;
    const wpm = Math.round((correctChars / 5) / (15 / 60));
    const accuracy = totalChars === 0 ? 0 : Math.round((correctChars / totalChars) * 100);
    wpmEl.innerText = wpm;
    accuracyEl.innerText = accuracy;
    resultsEl.style.display = 'block';
    testAreaEl.style.display = 'none';
}

inputArea.addEventListener('input', () => {
    if (!testActive) {
        startTest();
    }

    const typedValue = inputArea.value;
    const wordSpans = wordsContainer.querySelectorAll('span');
    const currentSpan = wordSpans[currentWordIndex];
    const currentWord = currentSpan.innerText.trim();

    totalChars++;

    if (typedValue.endsWith(' ')) {
        if (typedValue.trim() === currentWord) {
            correctChars += currentWord.length + 1; // +1 for space
            currentSpan.classList.add('correct');
        } else {
            currentSpan.classList.add('incorrect');
        }
        currentWordIndex++;
        inputArea.value = '';
    } else {
        if (typedValue === currentWord.substring(0, typedValue.length)) {
            currentSpan.classList.remove('incorrect');
            currentSpan.classList.add('correct');
        } else {
            currentSpan.classList.add('incorrect');
        }
    }
});

restartBtn.addEventListener('click', () => {
    timeLeft = 15;
    currentWordIndex = 0;
    correctChars = 0;
    totalChars = 0;
    inputArea.disabled = false;
    startTest();
});

startTest();
