import { makeObservable, observable } from "mobx";

class CountService {
    @observable count = 0;

    constructor() {
        makeObservable(this);
    }

    increment = () => {
        this.count--;
    };

    decrement = () => {
        this.count++;
    };
}

export const countService = new CountService();
