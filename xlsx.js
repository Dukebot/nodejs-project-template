const xlsx = require('xlsx');

/**
 * Facade para usar la librería xlsx
 */
const XLSX = {
    /**
     * Creates a new workbook object
     */
    new() {
        return xlsx.utils.book_new();
    },
    /**
     * Reads file of given path and returns a workbook object.
     * @param {*} path
     */
    read(path) {
        return xlsx.readFile(path); // returns workbook
    },
    /**
     * Creates a new Excel file given a workbook and a path
     * @param {*} workbook
     * @param {*} path
     */
    create(workbook, path) {
        if (!path.endsWith('.xls') && !path.endsWith('.xlsx'))
            path += '.xlsx';
        xlsx.writeFile(workbook, path);
    },
    /**
     * Generates a single sheet excel given the sheet_data and the path.
     * @param {*} sheet_data 
     * @param {*} path 
     */
    createFromSheet(sheet_data, path) {
        const workbook = this.new();
        this.addSheet(workbook, sheet_data, "sheet" + 0);
        this.create(workbook, path);

    },
    /**
     * Generates an excel with multiple sheets given a sheet array.
     * @param {*} sheet_data_array 
     * @param {*} path 
     */
    createFromSheets(sheet_data_array, path) {
        const workbook = this.new();
        for (let i = 0; i < sheet_data_array.length; i++) {
            this.addSheet(workbook, sheet_data_array[i], "sheet" + i);
        }
        this.create(workbook, path);
    },
    /**
     * Gets a sheet from a workboook.
     * @param {*} workbook 
     * @param {*} index Can be a number representing "sheet_index" or the "sheet_name"
     */
    getSheet(workbook, index) {
        let sheet_name = index;
        if (typeof index === 'number') {
            sheet_name = workbook.SheetNames[index];    
        }
        return workbook.Sheets[sheet_name];
    },
    /**
     * Adds a sheet to a workbook.
     * @param {*} workbook 
     * @param {*} sheet 
     * @param {*} sheet_name 
     */
    addSheet(workbook, sheet, sheet_name) {
        // TODO revisar esto ya que quizás no funciona perfecto...
        if (Array.isArray(sheet)) {
            if (Array.isArray(sheet[0])) {
                sheet = xlsx.utils.aoa_to_sheet(sheet);
            } else {
                sheet = xlsx.utils.json_to_sheet(sheet);
            }
        }
        xlsx.utils.book_append_sheet(workbook, sheet, sheet_name);
    },
    /**
     * Convierte de sheet a JSON
     * @param {*} sheet 
     */
    sheetToJson(sheet) {
        return xlsx.utils.sheet_to_json(sheet);
    },
    /**
     * Convierte de sheet a Array Of Arrays
     * @param {*} sheet 
     */
    sheetToAoA(sheet) {
        return xlsx.utils.sheet_to_json(sheet, { header: 1 });
    },
    /**
     * Convierte un json a sheet
     * @param {*} json 
     */
    jsonToSheet(json) {
        return xlsx.utils.json_to_sheet(json);
    },
    /**
     * Merges multiple excel files into a signle one-
     * @param {*} folder_path Folder where we can to merge excels
     * @param {*} excel_names Names of the excel files that we want to merge (array)
     * @param {*} sheet_index Sheet index that we want to read to merge the excels
     * @param {*} merged_excel_name The resulting excel file name
     */
    mergeExcels(folder_path, excel_names, sheet_index, merged_excel_name) {
        const workbook = this.new();

        if (!folder_path.endsWith('/')) 
            folder_path += '/';
        if (!merged_excel_name.endsWith('.xls') && !merged_excel_name.endsWith('.xlsx'))
            merged_excel_name += '.xlsx';
    
        let index = 0;
        for (const name of excel_names) {
            if (name.endsWith('.xls') || name.endsWith('.xlsx')) {
                const _workbook = this.read(folder_path + name);
                const sheet = this.getSheet(_workbook, sheet_index);
                this.addSheet(workbook, sheet, 'sheet' + index);
                index++;
            }
        }
    
        this.create(workbook, folder_path + merged_excel_name);
    },
    /**
     * Dados dos ficheros excel, los compara y nos dice las diferencias
     */
    compare(path_1, path_2, sheet_index = 0, max_rows = 1000, max_cols = 1000) {
        const workbook_1 = this.read(path_1);
        const workbook_2 = this.read(path_2);

        const sheet_1 = this.getSheet(workbook_1, sheet_index);
        const sheet_2 = this.getSheet(workbook_2, sheet_index);

        const aoa_1 = this.sheetToAoA(sheet_1);
        const aoa_2 = this.sheetToAoA(sheet_2);

        if (aoa_1.length !== aoa_2.length) {
            console.log("Los excel no tienen el mismo número de filas");
        }

        for (let row = 0; row < aoa_1.length; row++) {
            if (aoa_1[row].length !== aoa_2[row].length) {
                console.log("Los excels no tienen las mismas columnas en la fila " + row);
            }
            for (let col = 0; col < aoa_1[row].length; col++) {
                if (aoa_1[row][col] !== aoa_2[row][col]) {
                    console.log("Diferencia detectada en fila " + row + " y columna " + col);
                }
            }
        }
    },
};

module.exports = XLSX;
