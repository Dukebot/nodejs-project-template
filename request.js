const Request = {
    config(token) {
        return {
            headers: { 
                Authorization: `Bearer ${token}` 
            } 
        };
    },
    buildUrl(url_base, controller, parameters) {
        let params_string = '';
    
        if (parameters) {
            params_string = '?';
            for (const key in parameters) {
                if (params_string === '?') {
                    params_string += key + '=' + parameters[key];
                } else {
                    params_string += '&' + key + '=' + parameters[key];
                }
            }
        }
    
        return url_base + controller + params_string;
    }
};
