const moment = require('moment');

const MONTH_NAMES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const DateUtils = {
    /**
     * Dada una fecha en formato String, le suma los días que indiquemos por parámetro.
     * Podemos pasar un número negativo para restar días también.
     * @param {*} date_string Un String con la fecha que queremos sumar/restar días ('YYYY-MM-DD')
     * @param {*} days El número de días que queremos sumar. Pasar un valor negativo para resta.
     * @param {*} format El formato de la fecha String resultante ('YYYY-MM-DD') por defecto
     */
    addDaysToSrtingDate(date_string, days, format = 'YYYY-MM-DD') {
        return moment(date_string).add(days, 'days').format(format);
    },
    /**
     * Dadas dos fechas en formato String, calculamos cual es su diferencia en horas.
     * @param {*} from String date with time
     * @param {*} to String date with time
     */
    getHoursDiff(from, to) {
        from = moment(from);
        to = moment(to);

        let duration = moment.duration(to.diff(from));
        let hours = duration.asHours();

        return hours;
    },
    /**
     * Dadas dos fechas nos dice cuantos días tenemos entre ellas.
     * @param {*} from 
     * @param {*} to 
     */
    getDaysDiff(from, to) {
        from = moment(from);
        to = moment(to);

        let duration = moment.duration(to.diff(from));
        let days = duration.asDays();

        return days;
    },
    /**
     * Nos dice si una fecha en formato string es válida.
     * @param {*} date_string 
     * @param {*} format 
     */
    isValidDate(date_string, format = 'YYYY-MM-DD') {
        const date = moment(date_string, format);
        return date.isValid();
    },
    /**
     * Dado un período en formato 'YYYY-MM' nos devuelve su rango de fechas equivalente
     * @param {*} period 
     */
    getPeriodDateRange(period) {
        if (!moment(period, 'YYYY-MM').isValid()) {
            throw Error("Period must have 'YYYY-MM' format");
        }
        const period_splitted = period.split("-");
        const year = period_splitted[0];
        const month = period_splitted[1];
    
        const from = year + "-" + month + "-" + "01";
        const to = year + "-" + month + "-" + DateUtils.getMonthDayNumber(month);

        return { from, to };
    },
    /**
     * Nos devuelve el from y el to dado un año y el nombre del mes
     * @param {*} year 
     * @param {*} month 
     */
    getMonthDateRange(year, month) {
        if (typeof month === 'string' || month instanceof String) {
            month = month.toLowerCase();
        }
        if (typeof +month === 'number' && !isNaN(+month)) {
            month = +month;
        }

        if (month === "enero" || month === 1) {
            return {
                from: year + '-01-01', 
                to: year + '-01-31'
            };
        } else if (month === "febrero" || month === 2) {
            if (this.isLeapYear(year)) {
                return {
                    from: year + '-02-01',
                    to: year + '-02-29'
                };
            } else {
                return {
                    from: year + '-02-01',
                    to: year + '-02-28'
                };
            }
        } else if (month === "marzo" || month === 3) {
            return {
                from: year + '-03-01',
                to: year + '-03-31'
            };
        } else if (month === "abril" || month === 4) {
            return {
                from: year + '-04-01',
                to: year + '-04-30'
            };
        } else if (month === "mayo" || month === 5) {
            return {
                from: year + '-05-01',
                to: year + '-05-31'
            };
        } else if (month === "junio" || month === 6) {
            return {
                from: year + '-06-01',
                to: year + '-06-30'
            };
        } else if (month === "julio" || month === 7) {
            return {
                from: year + '-07-01',
                to: year + '-07-31'
            };
        } else if (month === "agosto" || month === 8) {
            return {
                from: year + '-08-01',
                to: year + '-08-31'
            };
        } else if (month === "septiembre" || month === 9) {
            return {
                from: year + '-09-01',
                to: year + '-09-30'
            };
        } else if (month === "octubre" || month === 10) {
            return {
                from: year + '-10-01',
                to: year + '-10-31'
            };
        } else if (month === "noviembre" || month === 11) {
            return {
                from: year + '-11-01',
                to: year + '-11-30'
            };
        } else if (month === "diciembre" || month === 12) {
            return {
                from: year + '-12-01',
                to: year + '-12-31'
            };
        } else {
            throw Error("Incorrect month name");
        }
    },
    /**
     * Nos devuelve el número dado el nombre de un mes
     * @param {*} month string with the name of the month
     */
    getMonthNumber(month_name) {
        month_name = month_name.toLowerCase();
        switch (month_name) {
            case "enero": return "01";
            case "febrero": return "02";
            case "marzo": return "03";
            case "abril": return "04";
            case "mayo": return "05";
            case "junio": return "06";
            case "julio": return "07";
            case "agosto": return "08";
            case "septiembre": return "09";
            case "octubre": return "10";
            case "noviembre": return "11";
            case "diciembre": return "12";
            default: throw Error("Incorrect month name ---> " + month);
        }
    },
    /**
     * Dado el número del mes nos devuelve el nombre del mes.
     * @param {*} month_number 
     */
    getMonthName(month_number) {
        month_number = +month_number;
        switch (month_number) {
            case 1: return "Enero";
            case 2: return "Febrero";
            case 3: return "Marzo";
            case 4: return "Abril";
            case 5: return "Mayo";
            case 6: return "Junio";
            case 7: return "Julio";
            case 8: return "Agosto";
            case 9: return "Septiembre";
            case 10: return "Octubre";
            case 11: return "Noviembre";
            case 12: return "Diciembre";
            default: throw Error("Incorrect month number ---> " + month_number);
        }
    },
    /**
     * Nos indica si el nombre indicado es un nombre válido de mes.
     * @param {*} month_name 
     */
    isMonthName(month_name) {
        return MONTH_NAMES.includes(month_name.toLowerCase());
    },
    /**
     * Dado un mes nos devuelve el número de días que tiene el mes.
     * Necesitamos pasar el año ya que febrero puede tener 29 días en los biciestos.
     * @param {*} year 
     * @param {*} month 
     */
    getMonthDayNumber(year, month) {
        if (typeof +month === 'number' && !isNaN(+month)) {
            month = +month;
        }
        if (typeof month === 'string' || month instanceof String) {
            month = +this.getMonthNumber(month);
        }

        switch (month) {
            case 1: return 31;
            case 2: return this.isLeapYear(year) ? 29 : 28;
            case 3: return 31;
            case 4: return 30;
            case 5: return 31;
            case 6: return 30;
            case 7: return 31;
            case 8: return 31;
            case 9: return 30;
            case 10: return 31;
            case 11: return 30;
            case 12: return 31;
            default: throw Error("Incorrect month number ---> " + month_number);
        }
    },
    /**
     * Nos indica si un año es biciesto o no
     * @param {*} year 
     */
    isLeapYear(year) {
        year = +year;
        return (year % 4 === 0) 
            && (year % 100 !== 0 || year % 400 === 0);
    },
};

module.exports = DateUtils;
