// inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let mood = "create";
let temp;

let inputs = document.querySelectorAll(".price input");

let getTotal = () => {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "#f10";
    total.innerHTML = "";
  }
};

inputs.forEach((Element) => {
  Element.onkeyup = getTotal;
});

// save data in products array
let products;
if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  products = [];
}
create.onclick = () => {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count
  if (title.value !== "" && price.value !== "" && category.value !== "") {
    if (mood === "create") {
// count more than o
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          products.push(product);
        }
      } else {
        products.push(product);
      }
   clearData();   
    } else {
      products[temp] = product;
      mood = "create";
      create.innerHTML = "create";
    }
  }

  // save products in localStorage
  localStorage.setItem("products", JSON.stringify(products));

  showData();
};

let clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

let showData = () => {
  getTotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
  <tr>
  <td>${i + 1}</td>
  <td>${products[i].title}</td>
  <td>${products[i].price}</td>
  <td>${products[i].taxes}</td>
  <td>${products[i].ads}</td>
  <td>${products[i].discount}</td>
  <td>${products[i].total}</td>
  <td>${products[i].category}</td>
  <td> <button onclick="update(${i})" id="update">update</button></td>
  <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
  `;
  }
  document.querySelector("#tbody").innerHTML = table;

  let deleteDiv = document.getElementById("deleteAll");
  if (products.length > 0) {
    deleteDiv.innerHTML = `<button onclick = "deleteAll()"> deleteAll (${products.length})</button>`;
  } else {
    deleteDiv.innerHTML = "";
  }
};
showData();

let deleteData = (i) => {
  // delete from array
  products.splice(i, 1);
  // update new array to localstorage
  localStorage.setItem("products", JSON.stringify(products));
  // show change in our table
  showData();
};

// delete All data

let deleteAll = () => {
  localStorage.clear();
  products.splice(0);
  showData();
};
// update
let update = (i) => {
  mood = "update";
  temp = i;
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  getTotal();
  category.value = products[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  scroll({ top: 0, behavior: "smooth" });
};

// search
let search = document.querySelectorAll("#btnsearch button");
let btnSearch = document.getElementById("search");
let searchMood = "title";
search.forEach((e) => {
  e.onclick = () => {
    if (e.id === "searchtitle") {
      searchMood = "title";
    } else {
      searchMood = "category";
    }
    btnSearch.focus();
    btnSearch.placeholder = `search by ${searchMood}`;
    btnSearch.value = "";
    showData();
  };
});
btnSearch.onkeyup = () => {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(btnSearch.value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td> <button onclick="update(${i})" id="update">update</button></td>
        <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
      document.querySelector("#tbody").innerHTML = table;
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(btnSearch.value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td> <button onclick="update(${i})" id="update">update</button></td>
        <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
      }
      document.querySelector("#tbody").innerHTML = table;
    }
  }
};
