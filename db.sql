CREATE DATABASE yelp;

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL, 
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (22, 'joanna', 'good', 3 );

SELECT Avg(rating) FROM reviews WHERE id = 2;

SELECT restaurant_id, Avg(rating), count(rating) FROM reviews GROUP BY restaurant_id;

SELECT * FROM restaurants İNNER JOIN reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants RIGHT JOIN reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = 1;

//---------------


CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henry123@gmail.com', 'qweasdzxc123');
