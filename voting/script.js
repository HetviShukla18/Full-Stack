 const votes = {
      javascript: 0,
      python: 0,
      java: 0
    };

    function vote(language) {
      votes[language]++;
      document.getElementById("javascript").innerText = `JavaScript: ${votes.javascript}`;
      document.getElementById("python").innerText = `Python: ${votes.python}`;
      document.getElementById("java").innerText = `Java: ${votes.java}`;
    }