const fs = require('fs');

const FS = {
    /**
     * Lee un directorio y nos devuelve un array con los nombres de carpetas y ficheros dentro del directorio.
     * @param {*} path 
     */
    getAllFilesFromDir(path) {
        return fs.readdirSync(path);
    },
    /**
     * Elimina el fichero del path indicado
     * @param {*} path 
     */
    deleteFile(path) {
        fs.unlinkSync(path);
    },
    /**
     * Elimina todos los ficheros de un directorio
     * @param {*} path 
     */
    cleanDirectory(dir_path) {
        const file_names = fs.readdirSync(dir_path);
        for (const file_name of file_names) {
            this.deleteFile(dir_path + file_name);
        }
    },
    /**
     * Lee el contenido de un directorio y elimina todos los ficheros que terminen con la extensión/es indicadas.
     * @param {*} dir_path Directorio que queremos limpiar
     * @param {*} file_extensions_to_delete Extensión de los ficheros a eliminar. Puede ser un String o un Array de Strings.
     */
    deleteFilesWithExtension(dir_path, file_extensions_to_delete) {
        if ((typeof file_extensions_to_delete === 'string' || file_extensions_to_delete instanceof String)) {
            file_extensions_to_delete = [file_extensions_to_delete];
        }
        const file_names = fs.readdirSync(dir_path);
        for (const file_name of file_names) {
            for (const file_extension_to_delete of file_extensions_to_delete) {
                if (file_name.endsWith(file_extension_to_delete)) {
                    this.deleteFile(dir_path + file_name);
                }
            }
        }
    },
    /**
     * Cambia el nombre de un fichero. También puede mover el fichero si cambiamos el path.
     * @param {*} path 
     * @param {*} new_path 
     */
    renameFile(path, new_path) {
        try {
            fs.renameSync(path, new_path);
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * Lee los files de un directorio y renombra los nombres a mayúsculas
     * @param {*} dir_path 
     */
    dirNamesToUpperCase(dir_path) {
        if (!dir_path.endsWith("/")) dir_path += "/";
        const dir_names = this.getAllFilesFromDir(dir_path);
        for (const dir_name of dir_names) {
            this.renameFile(dir_path + dir_name, dir_path + dir_name.toUpperCase());
        }
    },
};

module.exports = FS;
