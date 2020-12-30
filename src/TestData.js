export default{
    placeholderText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis congue arcu a faucibus sagittis. Nulla sed pretium dolor. Nullam eget iaculis lectus, ac pulvinar ligula. Nulla eros neque, rhoncus vel scelerisque a, rutrum quis odio. Ut in placerat lectus, eget rutrum augue. Integer scelerisque nibh vel diam malesuada, ac cursus diam venenatis. Sed dignissim mollis quam vel eleifend. Maecenas porta commodo aliquam. Ut blandit fermentum metus sit amet pellentesque.",
    
    headerProps: {
    title: { text: "PixelChain", class: "title" },
    subtitle: { text: "Blockchain digital art marketplace", class: "subtitle" },

    buttons: [
        /*
        {
            text: 'Prvi gumb',
            class: "ButtonDesign2S",
            btnFunction: () => { console.log(1) },
        },
        */
    ],
    carouselImages: [
        'https://images.unsplash.com/photo-1495954222046-2c427ecb546d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
        'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1555397430-57791c75748a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1534076355207-1717511180ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
    ]				
},

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

generateTestImages(){
    let testImages = [];
    for(let i = 0; i < 15; i++){
        const newImage = {}

        newImage.id = Date.now() + "" + Math.round(Math.random() * 1000);
        newImage.imgSrc = this.getImgUrl();
        newImage.author = "John Smith";
        newImage.description = this.placeholderText.split(" ").slice(0, 5).join(" ");
        newImage.views = Math.round(Math.random() * 100);
        newImage.timestamp = Date.now();
        newImage.comments = this.getComments();
        
        testImages.push(newImage);
    }

    this.images = testImages;
},

getComments(){
    const nComments = Math.round(Math.random() * (10 - 1) + 1);
    let comments = []

    for(let i = 0; i < nComments; i++){
        const newComment = {};

        newComment.text = this.placeholderText.split(" ").slice(0, 10).join(" ");
        newComment.author = "Smith John";
        newComment.timestamp = Date.now();

        comments.push(newComment);
    }

    return comments;
},

getImgUrl(){
    const max = 400;
    const min = 300;

    const width = Math.round(Math.random() * (max - min) + min);
    const height =  Math.round(Math.random() * (max - min) + min);
    
    return 'https://source.unsplash.com/random/' + width + '+' + height;
},
}
