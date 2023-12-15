export default class Strategie {
    constructor(strategie) {
        this.strategie = strategie;
        this.errors = [];
    }

    validate(name, input) {
        this.errors = [];
        this.strategie.forEach(input_strat => {
            if(input_strat.name === name) input_strat.validations.forEach((validation) => {
                let args = validation.split("|");
                switch (args[0]) {
                    case "required": 
                        this.test(this.required(input), `${name} is required.`);
                        break;
                    case "max_lenght":
                        this.test(this.max_lenght(input, args[1]), `${name} must have a max lenght of ${args[1]}.`);
                        break;
                    case "min_lenght":
                        this.test(this.min_lenght(input, args[1]), `${name} must have a min lenght of ${args[1]}`);
                        break;
                }
            });
        });
    }

    test(test, error) {
        if(!test) this.errors.push(error); 
    }

    valide_email(input) {

    }

    min_lenght(input, lenght) {
        if(input.lenght < lenght) return false;
        return true;
    }

    max_lenght(input, lenght) {
        if(input.lenght > args[0]) return false;
        return true;
    }

    required(input) {
        if (input === undefined || input === null || input === "") return false;
        return true;
    }
}