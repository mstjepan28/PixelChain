import moment from 'moment';
import testData from "./TestData.js"; // TEST

export default{
    // Data 
    images: [],
    users: testData.users,
    reports: testData.reports,



    placeholderText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quisquam tempora provident magnam, repellendus aperiam iure sit praesentium eligendi ad excepturi qui blanditiis totam quos non, voluptate inventore quam dolores molestiae labore perspiciatis repellat, nesciunt laborum? Saepe dicta consequuntur iste magnam voluptatibus provident quod quia eligendi fugiat deleniti quis unde quas enim, recusandae illo maxime, reprehenderit obcaecati. Hic debitis",

    // Settings
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

    // Sorter je objekt za sortiranje lista
    // Liste se sortiraju na temelju predanih parametara
    //
    // U sorter postavi atribut za sortiranje te listu iz trenutnog objekta za sortiranje
    //  Iz sortera se poziva getter funkcija koja vrača sortiranu list(poziva se preko imena funkcije)
    sort_items(sort_values, sort_order, list){
      let sorter = {
        items: false, // Polje elemenata koje sortiramo
        atr: false, // Atribut po kojem sortiramo polje

        get asc_number(){
          return this.number_sort()
        },
        get desc_number(){
          return this.number_sort().reverse();
        },
        get asc_string(){
          return this.string_sort()
        },
        get desc_string(){
          return this.string_sort().reverse()
        },
        get asc_bool(){
          return this.bool_sort()
        },
        get desc_bool(){
          return this.bool_sort().reverse()
        },
        // Funkcije za sortiranje su izdvojene da se ne ponavljaju
        string_sort(){
          return this.items.sort((a, b) => {
            const first_item = a[this.atr].toUpperCase(); 
            const second_item = b[this.atr].toUpperCase(); 
            
            if (first_item < second_item) return -1;
            if (first_item > second_item) return 1;

            return 0;
          })
        },
        number_sort(){
          return this.items.sort((a, b) => { return a[this.atr] - b[this.atr] })
        },
        bool_sort(){
          return this.items.sort((a, b) => { return (a[this.atr] ===  b[this.atr])? 0 : a[this.atr]? -1 : 1 })
        }
      }

      sorter.atr = sort_values.atr;
			sorter.items = this[list];
      
      this[list] = sorter[sort_order + "_" + sort_values.type]
    },

    timestampToDate(timestamp){
      return moment(timestamp).format("LLLL");
    },
}