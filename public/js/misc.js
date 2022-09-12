
// ########################### side navigation bar for mobile view ############################

function openNavbar() {
    document.getElementById("hamburger-sidemenu").style.width = "230px";
  }
  
/* Set the width of the side navigation to 0 */

function closeNavbar() {
    console.log("closebtn is clicked");
    document.getElementById("hamburger-sidemenu").style.width = "0";
  }


async function userList() {
  try {
    let res = await fetch('http://localhost:8080/api/users')
    let list = await res.json();
    console.log(list);
    console.log(list.length);
  }
  catch {
    // console.log('failed to fetch the data from api');
  }
}
//  userList();