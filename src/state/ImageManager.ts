

class ImageManager{
    private images: {[k:string]:HTMLImageElement|null} = {}
    constructor(){}
    async loadImage(key: string, uri: string){
        new Promise<HTMLImageElement>((resolve, reject) => {
            try{
                const image = new window.Image();
                image.src = uri;
                image.addEventListener('load', () => {
                    this.images[key] = image;
                });
                image.addEventListener('error', reject)
            }
            catch(e){
                console.error("Unable to load image", uri)
            }
        }).catch(
            error => {
                console.error("Unable to load image", uri);
                console.error(error);
            }
        );
    }
    freeimage(key: string){
        delete this.images[key];
    }
    get(key: string): HTMLImageElement{
        return this.images[key] as HTMLImageElement;
    }

}

export default new ImageManager();