use master;
go
drop database if exists fishingApp;
go
create database fishingApp;
go

use fishingApp;

create table "user"(
	id int not null primary key identity(1,1),
	email varchar(255) not null,
	password char(255) not null,
	first_name varchar(255) not null,
	last_name varchar(255) not null,
	role varchar(255) not null,
	oib char(11),
	license_number char(6)
);

create table fish(
	id int not null primary key identity(1,1),
	name varchar(255) not null,
	hunt_start date not null,
	hunt_end date not null,
	description text
);

create table river(
	id int not null primary key identity(1,1),
	name varchar(255) not null,
	length varchar(255) not null
);

create table fishing(
	id int not null primary key identity(1,1),
	date date not null,
	"user" int not null,
	fish int not null,
	quantity int,
	weight decimal(18,3),
	river int not null
);

alter table fishing add foreign key (river) references river(id);
alter table fishing add foreign key ("user") references "user"(id);
alter table fishing add foreign key (fish) references fish(id);

insert into "user"(email ,password, first_name, last_name ,role, oib, license_number) values
('admin@edunova.hr','$2y$10$Nsg4inxHgYub/2pGFSN8Mepfjp1e5m7nXBurTF97e9mn50TD3.Dra','Admin','Admin','Admin','68764300996','032546'),
('mirko.eres1@gmail.com','$2y$10$RYiO37mfXGodsKPfHdF4bOPAfnkav.XAXxEC89kABZZheyGcqBs9K','Mirko','Ereš','Član','58462135789','324568');

insert into fish(name, hunt_start, hunt_end, description) values
('Šaran','2024-05-01','2020-05-31','Krupna ljuska,brkovi,žut trbuh'),
('Smuđ','2024-05-01','2020-05-31','Sitna ljuska,oštri zubi,žut trbuh'),
('Štuka','2024-05-01','2020-05-31','Sitna ljuska,oštri zubi,žut trbuh'),
('Som','2024-05-01','2020-05-31','Sitna ljuska,oštri zubi,žut trbuh');

insert into river(name, length) values
('Biđ','37km'),
('Bosut','186km');

insert into fishing(date, "user", fish, quantity, weight, river) values
('2024-06-01',(1),(1),'3',2.55+3.00+3.40,(1)),
('2024-06-05',(2),(3),'2',2.30+3.22,(2));

select * from "user"; 
select * from fish;
select * from river;
select * from fishing;

select fi.id, FORMAT(fi.date, 'dd.MM.yyyy.') as Date, CONCAT(u.first_name,' ', u.last_name) as "User",f.name as Fish, r.name as River,fi.quantity as Quantity, fi.weight as Weight from fishing fi
inner join fish f on fi.fish = f.id
inner join "user" u on fi."user" = u.id
inner join river r on fi.river = r.id;