# MarketHive Website

Welcome to the MarketHive Website repository! This project is a fully functional e-commerce platform that allows users to browse, search, and purchase products online. It includes a variety of features such as user authentication, product listings, shopping cart functionality, and a checkout process.
## currently this backend in development mode 
## Code Term 
-- user is buyer #foreign key uid user for user.id
-- seller is vendor or shop owner that sell products ... #foreign key use for seller is sid for seller.id  
-- 3rd is admin that build category and subcategory and manage seller and users 
--  seller crete product and manager stocks in different warehouse 
  
## Features
- **Stateless**
- **User Authentication**: Secure user registration and login.
- **Product Listings**: Browse and search for products with detailed descriptions and images.
- **Shopping Cart**: Add, update, or remove products in the shopping cart.
- **Checkout Process**: Complete purchases with order summary .
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB  , Mysql 
- **Authentication**: JWT (JSON Web Tokens)  
- **Payment Gateway**: 
Stripe API  
## Packages 

- node v20  
- package.json copy 

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js
- MongoDB
- Git
- Mysql 
### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/manishankarrai/MarketHive.git
   cd MarketHive

2. **npm install**
3. **set .env , public/gallery/products and database**
