const fs = require('fs');

const JsonUtils = {
    /**
     * Dado un objeto o un texto en formato JSON, nos pone colores y formato al texto.
     * @param {*} json 
     */
    syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    },
    /**
     * Dado un nombre de fichero y un objeto, nos convierte el objeto a JSON y genera un evento para descargar en local el fichero.
     * @param {*} file_name 
     * @param {*} data_obj 
     */
    downloadJsonFile(file_name, data_obj) {
        const data = JSON.stringify(data_obj);
        const blob = new Blob([data], {type: 'text/plain'});
        
        const e = document.createEvent('MouseEvents');
        const a = document.createElement('a');
        
        a.download = file_name;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    },
    /**
     * Genera un fichero JSON a partir de un objeto y lo guarda en el path indicado.
     * @param {*} object 
     * @param {*} path 
     */
    generateJsonFile(object, path) {
        const jsonString = JSON.stringify(object, null, 2);
        try {
            fs.writeFileSync(path, jsonString, "utf8");
        } catch (error) {
            console.error("Error generation JSON file " + path);
            console.error(error);
        }
    },
};

module.exports = JsonUtils;
