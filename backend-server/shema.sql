CREATE DATABASE weatherforecast;
USE weatherforecast;



create table url_details( GUID varchar(20) not null,originalURL varchar(50) unique not null,shortURL unique varchar(20) not null,isdeleted boolean not null default 0,created_on date, modified_on date,FOREIGN KEY (GUID) REFERENCES user(GUID));