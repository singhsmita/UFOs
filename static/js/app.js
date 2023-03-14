// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
        cell.text(val);
      }
    );
  });
}

// 1. Create an empty variable to keep track of all the elements that change when a search is entered.
var filters = {};

// function to update the filters variable created above.
function updateFilters() {

  // 4a. variable to save the element that was changed
  let changedElement =  d3.select(this);

  // 4b. variable to save the value of the changed element’s property.
  let elementValue = changedElement.property("value");
  console.log(elementValue);

  // 4c. variable to save the attribute of the changed element’s id.
  let filterId = changedElement.attr("id");
  console.log(filterId);

  // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterId] = elementValue;
    } else {
      delete filters[filterId];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  
  // 8. Set the filtered data to the tableData.
  let filterData = tableData

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  filterData = filterData.filter(row => {
    for (let filterId in filters) {
      if (row[filterId] !== filters[filterId]) {
        return false;
      }
    }
    return true;
  });

  //  Rebuild the table using the filtered data
  buildTable(filterData);
}
 // Event to listen for changes to each filter
 d3.selectAll("input").on("change", updateFilters);
  
 // Build the table when the page loads
 buildTable(tableData);