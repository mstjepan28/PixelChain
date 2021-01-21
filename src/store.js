import moment from 'moment';
import testData from "./TestData.js"; // TEST

export default{
	// Data 
	images: [],
	currentUser: {},
	users: testData.users,
	reports: testData.reports,

	placeholderText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quisquam tempora provident magnam, repellendus aperiam iure sit praesentium eligendi ad excepturi qui blanditiis totam quos non, voluptate inventore quam dolores molestiae labore perspiciatis repellat, nesciunt laborum? Saepe dicta consequuntur iste magnam voluptatibus provident quod quia eligendi fugiat deleniti quis unde quas enim, recusandae illo maxime, reprehenderit obcaecati. Hic debitis",

	// Header settings ----------------------------------------------------------------------------
	headerProps: {
		title: { text: "PixelChain", class: "title" },
		subtitle: { text: "Blockchain digital art marketplace", class: "subtitle" },

		buttons: [],

		carouselImages: [
			'https://images.unsplash.com/photo-1495954222046-2c427ecb546d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
			'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
			'https://images.unsplash.com/photo-1555397430-57791c75748a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
			'https://images.unsplash.com/photo-1534076355207-1717511180ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
		]				
	},


	// Common functions ---------------------------------------------------------------------------
	timestampToDate(timestamp){
		return moment(timestamp).format("LLLL");
	},	
}