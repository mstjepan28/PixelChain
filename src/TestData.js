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


getImgUrls(){
    let imageList = [];
    for(let i = 0; i < 11; i++){
        const max = 400;
        const min = 300;

        const width = Math.round(Math.random() * (max - min) + min);
        const height =  Math.round(Math.random() * (max - min) + min);
        
        imageList.push( 'https://source.unsplash.com/random/' + width + '+' + height );
    }
    
    return imageList;
},
}
