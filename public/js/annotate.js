var notAllowed = [',', ' ', '.'];
var vowels = ['a', 'e', 'i', 'o', 'u'];
function trim(s, c) {
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
        "^[" + c + "]+|[" + c + "]+$", "g"
    ), "");
}

function highlightText() {
    if (window.getSelection) {
        window.selection = window.getSelection();
    } else if (document.selection) {
        window.selection = document.selection.createRange();
    }
    var range = window.selection.getRangeAt(0);
    var res = range.startContainer.textContent;

    let start, end, word, vowel;
    if (range.startOffset != range.endOffset) {
        console.log("start is not equal to end - Check Passed!");
        if (res.trim() != "") {
            console.log("Trimmed wholeText is not empty - Check Passed!");
            if (range.startOffset < range.endOffset) {
                console.log("start is less than end - Check Passed!");
                let selected = res.substr(range.startOffset, range.endOffset - range.startOffset + 1);
                let trimmed = trim(trim(trim(selected, '.'), ' '), ',');
                if (trimmed != "") {
                    let validChar, n, p;
                    console.log("Trimmed Selection is not empty - Check Passed!");
                    let i = range.startOffset;
                    while (i >= 0) {
                        validChar = true;
                        notAllowed.forEach(elem => {
                            if (res[i] === elem) {
                                validChar = false;
                                return false;
                            }
                        });
                        if (validChar) {
                            n = true;
                            if (p == n) {
                                start = i;
                                break;
                            }
                            i--;
                        } else {
                            p = true;
                            i++;
                        }
                    }
                    console.log(start);
                    let k = start;
                    while (k >= start) {
                        validChar = true;
                        notAllowed.forEach(elem => {
                            if (res[i] === elem) {
                                validChar = false;
                                return false;
                            }
                        });
                        if (validChar) {
                            i++;
                        } else {
                            end = i - 1;
                            break;
                        }
                    }
                    console.log(end);
                    word = res.substr(start, end - start + 1);
                    console.log(word);
                    vowel = false;
                    let firstChar = word[0].toLowerCase();
                    vowels.forEach(elem => {
                        if (elem == firstChar) {
                            vowel = true;
                            return false;
                        }
                    });
                    let container = document.getElementById("container");
                    let beforeSelection, afterSelection;
                    if (typeof beforeContent === 'undefined' && typeof afterSelection === 'undefined') {
                        beforeSelection = res.substr(0, start);
                        afterSelection = res.substr(end + 1, res.length);
                    } else if (afterContent.length - prevWord.length == res.length) {
                        beforeSelection = beforeContent + res.substr(0, start);
                        afterSelection = res.substr(end + 1, res.length);
                    } else if (beforeContent.length - prevWord.length == res.length) {
                        beforeSelection = res.substr(0, start);
                        afterSelection = res.substr(end + 1, res.length) + afterContent;
                    }
                    container.innerHTML = beforeSelection + `<span class= highlight-vowel-${vowel}>${word}</span>` + afterSelection;
                    beforeContent = beforeSelection + word;
                    afterContent = word + afterSelection;
                    prevWord = word;
                    let params = `beforeContent=${beforeContent}&afterContent=${afterContent}&prevWord=${prevWord}&text=<p id='container'>${container.innerHTML}</p>`;
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', '/track' + '?' + params, true);
                    xhr.onload = function (e) {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                console.log("updated");
                            } else {
                                console.error("update failed");
                            }
                        }
                    }
                    xhr.onerror = function (e) {
                        console.error("update failed");
                    }
                    xhr.send(null);
                } else {
                    console.log("Trimmed selection contains only not allowed chars - Check failed");
                }
            } else if (range.endOffset < range.startOffset) {
                console.log("Will need to write this bit");
            }
        }
    }
    // if (range.startOffset != 0 && range.)
    console.log(range);
    var parent = selection.anchorNode;
    while (parent != null && parent.localName != "P") {
        parent = parent.parentNode;
    }
    if (parent == null) {
        return "";
    } else {
        return parent.innerText || parent.textContent;
    }
}
document.addEventListener("mouseup", highlightText);