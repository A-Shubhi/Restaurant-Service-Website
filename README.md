# Restaurant-Service-Website
It is a restaurant service website that allows users to order food items. 

# Steps to set up the project in your system : 

1.	Download all the files
2.	Open terminal in the folder where all files are saved and type npm install to install all the required packages.
3.	Type nodemon app in the terminal and enter to start listening to the port
4.	Go on the browser and type localhost:3010 to go to the HomePage. ( Here 3010 is the port the server is listening to)


# About the Project :
It is a restaurant service website to order food items. 
Pages in the website: 
  
  •	Home Page
	
  •	 Login Page
	
  •	Register Page
	
  •	 Menu
	
  •	MyCart
	
  •	Confirmation Page
	
  •	MyProfile
	

Utilized NodeJS for server-side logic, Express.js as the web framework, and MongoDB for data storage.
MongoDB user specifications :

## Page wise Specification

**1.	Home Page:**

_Preview:_
![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/e6ae6d59-3ca3-4ade-95a1-3570433b548e)


 
_Overview:_

a)	Gives overview about the restaurant and its offerings.

b)	Contains links to SignUp and Login pages

---

**2.	Register Page:**

Preview:
 ![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/d2523224-25d7-4a48-9118-495371741360)

Overview:

a)	New users can register to create an account after validation of the entries.

b)	Contains link to the Login and Home Page

---
**3.	Login Page**

_Preview:_
 ![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/f0398422-0209-437f-96f1-9303a5f7ef6c)

_Overview:_

a)	Existing users can login to their account after validation of the entries and would be able to access the menu page.

b)	Contains link to the Sign Up and Home Page. 


---

**4.	Menu**

_Preview:_
![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/0aeb1479-24c1-4876-a854-b1de1752789b)

 
_Overview:_

a)	One can choose the items to order, specify the amount they to buy and add the item to their cart. One can also use the search bar to search for specific menu items.

b)	After choosing all the items, one can go to his/her cart by going to MyCart page, one can see their profile by going to My Profile Page or go back to the HomePage by using LogOut. 

---


**5.	My Cart / Order Summary Page**

_Preview:_
![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/a7241df1-aa63-4ac0-8c65-6a288f1499be)

 
_Overview:_

a)	One can review their selected items that have been added in the cart and adjust the quantity of the items or delete items from the order list.

b)	One can see the lists of items, their quantity, price, individual amounts and the total order amount

c)	After reviewing all the items, one can place the order and move to the confirmation page, go back to the menu in case he/she wants to some other item , go to the profile page using My Profile or go back to the Home Page using LogOut.


---

**6.	Confirmation page**

_Preview:_
![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/d739a09c-85c6-4584-9717-e69cd112acfa)

 
_Overview:_

a)	It acknowledges the successful placement of order.


**7.	My Profile Page**

_Preview:_
 ![image](https://github.com/A-Shubhi/Restaurant-Service-Website/assets/95265187/7a9a91d7-41da-4738-badf-6f7a9ef91fa9)

_Overview:_

a)	Display the user's name and email which was stored during signup.

b)	Display the user's order history, including past orders with details such as order date, items, quantities, and total amounts.

---
