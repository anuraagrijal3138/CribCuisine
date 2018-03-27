export class Cuisine {
    public name: string;
    public intro: string;
    public imagePath: string;

    constructor(name: string, intro: string, imagePath: string) {
        this.name = name;
        this.intro = intro;
        this.imagePath = imagePath;
    }
}
