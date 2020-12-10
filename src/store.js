export default{
    imageList: null,
    artistList: null,

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
}