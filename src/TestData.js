import moment from 'moment';

export default{
// ------------------------------------------------------------------------------------------------
// MAIN -------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
generateTestData(){
    this.generateImages();
    this.generateReports();
},
placeholderText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue arcu a faucibus sagittis. Nulla sed pretium dolor. Nullam eget iaculis lectus, ac pulvinar ligula. Nulla eros neque, rhoncus vel scelerisque a, rutrum quis odio. Ut in placerat lectus, eget rutrum augue. Integer scelerisque nibh vel diam malesuada, ac cursus diam venenatis. Sed dignissim mollis quam vel eleifend. Maecenas porta commodo aliquam. Ut blandit fermentum metus sit amet pellentesque.",
    


users : [
    {
        id: 1,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0

    },
    {
        id: 2,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0
    },
    {
        id: 3,
        name: "John Smith",
        occupation: "Graphic Designer",
        visits: 0,
        numOfImages: 0
    },
    {
        id: 4,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0
    },
    {
        id: 5,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0
    },
    {
        id: 6,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0
    },
    {
        id: 7,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0
    },
    {
        id: 8,
        name: "John Smith",
        occupation: "Photographer",
        visits: 0,
        numOfImages: 0
    },
],

// ------------------------------------------------------------------------------------------------
// Generate Images --------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
images: [
    /*
    {
        id: "",
        imgSrc: "",
        author: "",
        views: "",
        timestamp: "",
        comments: [
            {
                text: "",
                author: "",
                timestamp: ""
            }
        ]
    }
    */
],

generateImages(){
    let images = new Array(15).fill(0);
    this.images = images.map(() => this.getImage());
},

getImage(){
    let newImage = {};

    newImage.id = this.getRandId();
    newImage.imgSrc = 'https://source.unsplash.com/random/' + this.getRandNum(300, 400) + '+' + this.getRandNum(300, 400);
    newImage.author = 'John Smith',
    newImage.description = this.placeholderText.split(" ").slice(0, 5).join(" ");
    newImage.views = this.getRandNum(0, 100);
    newImage.timestamp = Date.now();
    newImage.comments = this.generateComments();

    return newImage;
},

// ------------------------------------------------------------------------------------------------
// Generate comments ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
generateComments(){
    let comments = new Array(this.getRandNum(1, 10)).fill(0);
    return comments.map(() => this.getComment())
},
getComment(){
    const text = this.placeholderText;

    return {
        text: text.split(" ").slice(0, 10).join(" "),
        author: "Smith John",
        timestamp: Date.now(),
    }
},


// ------------------------------------------------------------------------------------------------
// Generate reports -------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
reports: [
    /*
     {
        id: "",
        reportedImg: "",
        matchingImg: "",
        description: "",

        reportedDate: "",
        reportEndDate: "",

        validReport: "",

        votes: {
            valid: 0,
            invalid: 0
        }
     }
    */
],

generateReports(){
    let reportList = new Array(this.getRandNum(1, 10)).fill(0);
    this.reports = reportList.map(() => this.getReport())
},

getReport(){
    const randImg = this.getImage();
    const valid = this.getRandNum(2, 15);
    const invalid = this.getRandNum(2, 15);
    
    let newReport = {};

    newReport.id = this.getRandId();
    newReport.reportedImg = randImg.imgSrc;
    newReport.matchingImg = randImg.imgSrc;
    newReport.description = this.placeholderText.split(" ").slice(0, 15).join(" ");
    newReport.reportedDate = Date.now();
    newReport.reportEndDate = moment().add(7, 'days').format('LLL'); 
    newReport.validReport = this.getRandNum(0, 10) > 5? true: false; 
    newReport.votes = {valid, invalid}

    return newReport;
},


// ------------------------------------------------------------------------------------------------
// Misc. functions --------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
getRandNum(min, max){
    return Math.round(Math.random() * (max - min) + min);
},
getRandId(){
    return Date.now() + "" + this.getRandNum(1000, 9999);
},
}
