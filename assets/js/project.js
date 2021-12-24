function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../../data/list-projects.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function (response) {
    const actual_JSON = JSON.parse(response);

    const table = document.createElement('table');
    for (let i=0; i<actual_JSON.length; i++) {
        const child = actual_JSON[i];
        if (i === 0) {
            addHeaders(table, Object.keys(child));
        }
        const row = table.insertRow();
        Object.keys(child).forEach( (val) => {
            console.log(val, child[val]);
            const cell = row.insertCell();
            const td = document.createTextNode(child[val]);

            if (val === 'Link') {
                const aLink = document.createElement('a');
                aLink.setAttribute('href', child[val]);
                aLink.appendChild(td);
                cell.appendChild(aLink);
            } else {
                cell.appendChild(td);
            }
        })
    }

    document.getElementById('list-project').appendChild(table);
  });
}

function addHeaders(table, keys) {
    const row = table.insertRow();
    for (let i=0; i<keys.length; i++) {
        const cell = row.insertCell();
        cell.appendChild(document.createTextNode(keys[i]));
    }
}