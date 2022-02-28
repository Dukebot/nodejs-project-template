const Utils = {
    /**
     * Nos retorna un array con los parámetros que se han utilizado para ejecutar el proceso.
     */
    getArguments() {
        var process_arguments = process.argv.slice(2);
        console.log('process_arguments: ', process_arguments);
        return process_arguments;
    },
    /**
     * Nos indica si una variable es de tipo String
     * @param {*} variable 
     */
    isString(variable) {
        return (typeof variable === 'string' || variable instanceof String);
    },
    /**
     * Nos indica si el objeto que se ha proporcionado por parámetro es un objeto vacío
     * @param {*} obj 
     */
    isEmptyObject(obj) {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    /**
     * Nos indica si una variable es un objeto
     * @param {*} obj 
     */
    isObject(variable) {
        return typeof variable === 'object'
            && !Array.isArray(variable)
            && variable !== null
    },
    /**
     * Dado un array de elementos y el nombre de una propiedad, crea un mapa indexado por esa propiedad.
     * Si la propiedad es un String, hacemos un trim
     * @param {*} dataArray 
     * @param {*} propertyName 
     */
    buildMap(dataArray, propertyName, trimKey = false) {
        const map = {};
        for (const data of dataArray) {
            let key = data[propertyName];
            if (trimKey && typeof key === 'string') {
                key = key.trim();
            }
            map[key] = data;
        }
        return map;
    },
    /**
     * Igual que el anterior pero acumula en un array los elementos con el mismo valor en la propiedad. 
     * @param {*} dataArray 
     * @param {*} propertyName 
     */
    buildMapAccum(dataArray, propertyName, trimKey = false) {
        const map = {};
        for (const data of dataArray) {
            let key = data[propertyName];
            if (trimKey && typeof key === 'string') {
                key = key.trim();
            }
            if (!map[key]) {
                map[key] = [];
            }
            map[key].push(data);
        }
        return map;
    },
    /**
     * Dado un objeto de propiedades indexadas, accedemos a una propiedad por índice (como si fuera un array)
     * @param {*} obj 
     * @param {*} index 
     */
    getObjPropertyByIndex(obj, index) {
        let count = 0;
        for (const key in obj) {
            if (count === index) {
                return obj[key];
            }
            count++;
        }
        console.error("getObjPropertyByIndex -> The number provided it's greater than the map elements.");
    },
    /**
     * Dado un objeto y un array con nombre de propiedades nos retorna otro objeto con solo las propiedades indicadas.
     * @param {*} object 
     * @param {*} property_array 
     */
    getSubObject(object, property_array) {
        const new_object = {};
        for (const property of property_array) {
            new_object[property] = object[property];
        }
        return new_object;
    },
    /**
     * Nos quita los acentos de un String
     */
    removeAccents(string) {
        const accents = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
        return string.split('').map(letter => accents[letter] || letter).join('').toString();
    },
    /**
     * Dado un array de Strings o de Objetos, nos concatenara esos strings en uno solo, separado por el separador indicado.
     * En el caso de pasar un array de objetos, deberemos indicar el nombre de la propiedad del objeto que queremos concaternar.
     * @param {*} array Un array de Strings o Objetos
     * @param {*} property Nombre de la propiedad a concaternar (en el caso de array de objetos)
     * @param {*} separator Separador que usaremo sen cada elemento que concatenamos
     */
    concatStrings(array, property = "", separator = ", ") {
        let out = "";
        for (const item of array) {
            if (out !== "") out += separator;
            if (this.isObject(item)) {
                out += item[property];
            } else if (typeof item === 'string') {
                out += item;
            } else {
                throw Error("This method expects an array of strings or array of objects.");
            }
        }
        return out;
    },
    /**
     * Dada una hora en formato String nos devuelve su valor en decimal
     * @param {*} hours 
     */
    hoursToDecimal(hours) {
        if (hours) {
            hours_splitted = hours.split(':');
            return +hours_splitted[0] + (+hours_splitted[1] / 60);
        }
        return null;
    },
    /**
     * Nos dice si dos valores son proximos definiendo un umbral de lo que consideramos proximo.
     * @param {*} value1
     * @param {*} value2 
     * @param {*} precision_umbral 
     */
    isApproxValue(value1, value2, precision_umbral = 0.1) {
        return (Math.abs(value1 - value2) <= precision_umbral);
    },
}

module.exports = Utils;
