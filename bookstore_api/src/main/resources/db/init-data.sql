INSERT INTO BOOKS(id, title, author, category, year, quantity, price)
VALUES
('48a95af7-8b83-4a08-8001-0f865db8ea26', 'Krikštatėvis', 'Mario Puzo', 'Trileris', '2021', 500, 7.99),
('15a95af7-8b83-4a08-8001-0f865db8ea27', 'Ponia Delovėj', 'Virginia Woolf', 'Psichologinis romanas', '2020', 200, 11.89),
('ebdee4f9-5763-4afc-85ed-98b2fdefb35f', 'Permainų svaigulys', 'Stefan Zweig', 'Romanas', '2021', 150, 13.99),
('abdee4f9-5763-4afc-85ed-98b2fdefb35d', 'Įtikinėjimas', 'Jane Austen', 'Romanas', '2020', 130, 11.89),
('45a95af7-8b83-4a08-8001-0f865db8ea27', 'Martinas Idenas', 'Jack London', 'Autobiografija', '1999', 25, 9.99),
('cbdee4f9-5763-4afc-85ed-98b2fdefb35d', 'Kolekcionierius', 'John Fowles', 'Detektyvas', '2014', 330, 17.89),
('58a95af7-8b83-4a08-8001-0f865db8ea23', 'Didieji lūkesčiai', 'Charles Dickens', 'Detektyvas', '2014', 170, 4.99),
('45a95af7-8b83-4a08-8001-0f865db8ea22', 'Pusryčiai pas Tifanį', 'Truman Capote', 'Apysaka', '2015', 300, 9.99),
('bbdee4f9-5763-4afc-85ed-98b2fdefb35e', 'Džeinė Eir', 'Charlotte Bronte', 'Romanas', '2016', 550, 14.99),
('cbdee4f9-5763-4afc-85ed-98b2fdefb31d', 'Tiltas per amžinybę', 'Richard Bach', 'Romanas', '2014', 50, 11.89),
('58a95af7-8b83-4a08-8001-0f865db8ea26', 'Tesė iš dErbervilių giminės', 'Thomas Hardy', 'Drama', '2007', 40, 15.99),
('abdee4f9-5763-4afc-85ed-98b2fdefb35f', 'Kvepalai. Vieno žudiko istorija', 'Patrick Suskind', 'Detektyvas', '2015', 110, 11.89);

INSERT INTO USERS(id, username, name, surname, email, password)
VALUES ('c2aa5f20-2441-40f8-8cce-d31dbd17bc84', 'user', 'Serbentautas', 'Bordiuras', 'user@bookstore.lt',
        '{bcrypt}$2a$10$jYIbAef1H7S.womsk7MRtOCSEx/DgM7CZ1nNeLLzoZ/OPs0a25DV2'), /*pass->user*/
       ('bd8968db-ad2a-4dd0-a0ab-7eebcc05427e', 'admin', 'Violeta', 'Rugiagele', 'admin@bookstore.lt',
        '{bcrypt}$2a$10$VylYhXDaKC7W28tQTvYYkOdZIj2pnPVIobXOConbXy3xeBcF6Xuni'); /*pass->admin*/

INSERT INTO ROLES(id, name)
VALUES ('60dbb7bb-99a0-42eb-a837-8be6b697c074', 'USER'),
       ('3906c549-44bf-494b-9537-5e1658a029a8', 'ADMIN');

INSERT INTO USERS_ROLES (user_id, roles_id)
VALUES ('c2aa5f20-2441-40f8-8cce-d31dbd17bc84', '60dbb7bb-99a0-42eb-a837-8be6b697c074'),
       ('bd8968db-ad2a-4dd0-a0ab-7eebcc05427e', '60dbb7bb-99a0-42eb-a837-8be6b697c074'),
       ('bd8968db-ad2a-4dd0-a0ab-7eebcc05427e', '3906c549-44bf-494b-9537-5e1658a029a8');


