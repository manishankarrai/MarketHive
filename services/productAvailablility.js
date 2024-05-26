const { Product } =  require('../models/product');
const { Order }  =  require('../models/order');

//  run a job that check product available status  and 
//  time gap is between checkout and payment 
//  run a job to change order status 