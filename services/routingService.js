export class routingService {
    constructor() {
        this.appName = "AiTranslator";
    }
    async navigateToLocation(locationArray) {
        if (locationArray[0] !== "aitranslator-page") {
            console.error("Invalid URL structure.");
            return;
        }
        const webComponentName = locationArray[locationArray.length - 1];
        const pageUrl = `${webSkel.currentUser.space.id}/${this.appName}/${locationArray.join("/")}`;
        await webSkel.changeToDynamicPage(webComponentName, pageUrl);
    }
}